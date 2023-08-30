import { APIClient, IMenuItem, onExitSearch } from "@riogz/lib.core";
import { APIClientHandler } from "./handlers/APIClient";
import { RouterHandler } from "./handlers/RouterHandler";
import { RouterPostHandler } from "./handlers/RouterPostHandler";
import { IRoutes } from "@riogz/lib.core";
import { titleMiddlewareFactory } from "@riogz/lib.core";
import { onEnterMiddlewareFactory } from "@riogz/lib.core";
import { onPathMiddlewareFactory } from "@riogz/lib.core";
import { onSyncPathMiddlewareFactory } from "@riogz/lib.core";
import { Router } from "router5";
import { DefaultDependencies } from "router5/dist/types/router";
import browserPlugin from "router5-plugin-browser";
import createRouter from "router5";
import { Module } from "../modules/interface";
import { ModulesHandler } from "./handlers/ModulesHandler";
import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { DIHandler } from "./handlers/DIHandler";
import { HTTPErrorHandler } from "./handlers/HTTPErrorHandler";
import { privateRouteGuard } from "@riogz/lib.core";
import { AUTH_ROUTES } from "../modules/auth/config/routes";
import { routeAuthActivator } from "../modules/auth/config/routeAuthActivator";
import { ClientHashHandler } from "./handlers/ClientHashHandler";

export const initBootstrap = async (
  bootstrap: Bootstrap,
  config: Record<string, any>,
): Promise<Bootstrap> => {
  const handler = new APIClientHandler(config);
  handler
    .setNext(new ClientHashHandler(config))
    .setNext(new RouterHandler(config))
    .setNext(new ModulesHandler(config))
    .setNext(new DIHandler(config))
    .setNext(new RouterPostHandler(config))
    .setNext(new HTTPErrorHandler(config));

  return await handler.handle(bootstrap);
};

export class Bootstrap {
  private _APIClient: APIClient | null = null;
  private _router: Router<DefaultDependencies> = createRouter();
  private routes: IRoutes = [];
  private modulesAppInitCb = new Array<
    (bootstrap: Bootstrap) => Promise<void>
  >();

  private _di: Container = new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton",
  });

  get getAPIClient(): APIClient {
    if (!this._APIClient) {
      throw new Error("APIClient not initialized");
    }
    return this._APIClient;
  }

  get router(): Router<DefaultDependencies> {
    return this._router;
  }

  get di(): Container {
    return this._di;
  }

  constructor(private modules: Module[] = []) {
    this.initAPIClient = this.initAPIClient.bind(this);
    this.initRouter = this.initRouter.bind(this);
    this.routerPostInit = this.routerPostInit.bind(this);
    this.initDI = this.initDI.bind(this);
  }

  initAPIClient(baseURL: string): void {
    this._APIClient = new APIClient(baseURL);
  }

  initDI(): void {
    this._di.load(buildProviderModule());

    if (this._APIClient) {
      this._di.bind<APIClient>(APIClient).toConstantValue(this._APIClient);
    }
  }

  initRouter(routes: IRoutes, appPrefix: string): void {
    this.addRoutes(routes);

    this._router = createRouter(this.routes, {
      allowNotFound: false,
      autoCleanUp: false,
      defaultRoute: "404",
      defaultParams: {
        fallbackAuthUrl: AUTH_ROUTES.LOGIN,
      },
    });
    if (!this._router) {
      throw new Error("Router not initialized");
    }

    this._router.usePlugin(
      () => ({
        onStart: async () => {
          await this.runAfterAppInit();
        },
      }),
      browserPlugin({
        base: appPrefix,
        forceDeactivate: false,
      }),
    );
  }

  routerPostInit(
    cb: (router: Router<Record<string, any>>) => Router<Record<string, any>>,
  ): void {
    if (!this._router) {
      throw new Error("Router not initialized");
    }

    const appMenu = this.buildRoutesMenu(this.routes);

    this._router.setDependencies({ di: this._di, menu: appMenu });
    this._router = cb(this._router);

    onExitSearch(this.routes, this.router);
    this._router.useMiddleware(
      titleMiddlewareFactory(this.routes),
      onEnterMiddlewareFactory(this.routes),
      onPathMiddlewareFactory(this.routes),
      onSyncPathMiddlewareFactory(this.routes),
    );
    privateRouteGuard(this.router, this.routes, routeAuthActivator(this._di));
  }

  async initModules(): Promise<void> {
    const loadedModules = [];

    for (const module of this.modules) {
      if (module.config.ROUTES) {
        const routes = module.config.ROUTES();
        this._router.add(routes);
        this.addRoutes(routes);
      }

      if (module.config.onModuleInit) {
        await module.config.onModuleInit(this);
      }
      if (module.config.onAppInit) {
        this.modulesAppInitCb.push(module.config.onAppInit);
      }
      loadedModules.push(module.name);
    }
  }

  async runAfterAppInit(): Promise<void> {
    for (const cb of this.modulesAppInitCb) await cb(this);
  }

  private addRoutes(nodes: IRoutes): void {
    this.routes.push(...nodes);
  }

  private buildRoutesMenu(routesConfig: IRoutes): IMenuItem[] {
    const menuConfig: IMenuItem[] = [];

    for (const route of routesConfig) {
      if (!route.menu) {
        continue;
      }

      const routePath = route.name.split(".");
      routePath.pop();

      if (routePath.length > 0) {
        const path = findSegment(menuConfig, routePath);
        let current = menuConfig;

        for (const key of path) {
          if (!current[parseInt(key)].children) {
            current[parseInt(key)].children = [];
          }
          current = current[parseInt(key)].children || [];
        }
        current.push({
          path: route.name,
          text: route.menu.text,
          icon: route.menu.icon,
          sortOrder: route.menu.sortOrder,
          navigate: route.menu.navigate,
          pageComponent: route.pageComponent,
        });
      } else {
        menuConfig.push({
          path: route.name,
          text: route.menu.text,
          icon: route.menu.icon,
          sortOrder: route.menu.sortOrder,
          navigate: route.menu.navigate,
          pageComponent: route.pageComponent,
          children: route.children && this.buildRoutesMenu(route.children),
        });
      }
    }

    return menuConfig;
  }
}

function findSegment(
  obj: Array<IMenuItem>,
  item: Array<string>,
  result: Array<string> = [],
) {
  for (const key in obj) {
    const route = obj[key].path.split(".");
    const routeLast = route[route.length - 1];

    if (routeLast === item[0]) {
      if (obj[key].children && obj[key].children?.length && item.length > 1) {
        result.push(key);
        return findSegment(obj[key].children || [], item.slice(1), result);
      } else {
        result.push(key);
        return result;
      }
    }
  }
  return [];
}
