import type { Route } from "router5/dist/types/router";
import type { Router } from "router5";
import type { IOnEnterMiddlewareConfig } from "./middlewares/onEnter";
import type { IOnPathMiddlewareConfig } from "./middlewares/onPath";
import type { IOnSyncPathMiddlewareConfig } from "./middlewares/onSyncPath";
import type { ITitleMiddlewareConfig } from "./middlewares/title";
import type { FunctionComponent, ReactNode } from "react";
import type { IPrivateRouteMiddlewareConfig } from "./middlewares/PrivateRoute";
export type RouterDependencies = Record<string, any>;
export interface IRoute extends Route, IMiddlewareConfig {
    /**
     * Переопределение интерфейса дочерних роутов
     */
    children?: IRoute[];
    /**
     * Объект конфигурации отображения роута в меню, ключ - тег меню, значение - объект конфигурации
     */
    menu?: IMenuConfig;
    /**
     * Компонент отображаемой страницы
     */
    pageComponent?: FunctionComponent;
    /**
     * Компонент отображаемый внутри pageComponent (например это может быть контент вкладки на странице карточки клиента)
     */
    component?: FunctionComponent;
}
export interface IMiddlewareConfig extends IOnEnterMiddlewareConfig, IOnPathMiddlewareConfig, IOnSyncPathMiddlewareConfig, IPrivateRouteMiddlewareConfig, ITitleMiddlewareConfig {
}
export interface IMenuConfig {
    /**
     * Наименование кнопки перехода в табе или меню
     */
    text: string;
    /**
     * Условие отображения пункта в меню, помимо featureToggle и accessPermission
     * @param router - инстанс роутера
     * @param container - инстанс DI
     */
    viewCondition?: (router: Router<Record<string, any>>) => boolean;
    /**
     * Навигация роута
     */
    navigate?: string;
    /**
     * Иконка для отображения роута в сайдбаре
     */
    icon?: ReactNode;
    /**
     * Порядок отображения и активации пункта в меню (указывать в диапазоне от 1 до 1000, значение по умолчанию 1000)
     */
    sortOrder?: number;
}
export interface IMenuItem {
    /**
     * Путь роута
     */
    path: string;
    /**
     * Название роута
     */
    text: string;
    /**
     * Иконка для отображения роута в сайдбаре
     */
    icon?: ReactNode;
    /**
     * Порядок отображения и активации пункта в меню (указывать в диапазоне от 1 до 1000, значение по умолчанию 1000)
     */
    sortOrder?: number;
    /**
     * Навигация роута
     */
    navigate?: string;
    /**
     * Дочерние элементы меню
     */
    children?: IMenuItem[];
    /**
     * Компонент отображаемой страницы
     */
    pageComponent?: FunctionComponent;
}
export type IRoutes = IRoute[];
//# sourceMappingURL=interfaces.d.ts.map