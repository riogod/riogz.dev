import type { Route } from 'router5/dist/types/router';
import type { Router } from 'router5';
import type { IOnEnterMiddlewareConfig } from './middlewares/onEnter';
import type { IOnPathMiddlewareConfig } from './middlewares/onPath';
import type { IOnSyncPathMiddlewareConfig } from './middlewares/onSyncPath';
import type { ITitleMiddlewareConfig } from './middlewares/title';
import type { FunctionComponent, ReactNode } from 'react';
import type { IPrivateRouteMiddlewareConfig } from './middlewares/PrivateRoute';

export type RouterDependencies = Record<string, any>;

export interface IRoute extends Route, IMiddlewareConfig {
  /**
   * Переопределение интерфейса дочерних роутов
   */
  children?: IRoute[];
  /**
   * Текст кнопки перехода в табе или меню, если не определяется в конфиге меню
   */
  text?: IMenuConfig['text'];
  /**
   * Объект конфигурации отображения роута в меню, ключ - тег меню, значение - объект конфигурации
   */
  menu?: Record<string, IMenuConfig>;
  /**
   * Компонент отображаемой страницы
   */
  pageComponent?: FunctionComponent;
  /**
   * Компонент отображаемый внутри pageComponent (например это может быть контент вкладки на странице карточки клиента)
   */
  component?: FunctionComponent;
}

export interface IMiddlewareConfig
  extends IOnEnterMiddlewareConfig,
    IOnPathMiddlewareConfig,
    IOnSyncPathMiddlewareConfig,
    IPrivateRouteMiddlewareConfig,
    ITitleMiddlewareConfig {}

export interface IMenuConfig {
  /**
   * Наименование кнопки перехода в табе или меню
   */
  text?: ReactNode;
  /**
   * Условие отображения пункта в меню, помимо featureToggle и accessPermission
   * @param router - инстанс роутера
   * @param container - инстанс DI
   */
  viewCondition?: (router: Router<Record<string, any>>) => boolean;
  /**
   * Иконка для отображения роута в сайдбаре
   */
  icon?: ReactNode;
  /**
   * Порядок отображения и активации пункта в меню (указывать в диапазоне от 1 до 1000, значение по умолчанию 1000)
   */
  sortOrder?: number;
}

export type IRoutes = IRoute[];
