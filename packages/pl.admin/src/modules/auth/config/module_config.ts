import { ModuleConfig } from "../../../bootstrap/interface";
import { routes } from "./routes";
import { HttpErrorHandler } from "./http_auth_error";
import { AuthViewModel } from "../view_model/AuthVM";

export const config: ModuleConfig = {
  ROUTES: () => routes,
  onModuleInit: async (bootstrap) => HttpErrorHandler(bootstrap),
  onAppInit: async (bootstrap) => {
    await bootstrap.di.get(AuthViewModel).checkStatusApionInit();
  },
};
