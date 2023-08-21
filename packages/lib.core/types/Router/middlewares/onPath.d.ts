import type { MiddlewareFactory, Route } from 'router5/dist/types/router';
import type { RouterDependencies } from '../interfaces';
import type { Params } from 'router5/dist/types/base';
import type { Router } from 'router5';
export interface IOnPathMiddlewareConfig {
    onPath?: (toStateParams: Params, router: Router) => void;
}
/**
 *  Router middleware которая вызывается в случае, если onPath находиться
 *  на отрезке root -> ... -> this.child .
 *
 *  Пример:
 *   Мы находимся на роуте "clients.assignment.tasks"
 *   в случае, если у родительских роутов "clients", "clients.assignment"
 *   или "clients.assignment.tasks" имеется onPath
 *   то он, вызовется.
 *
 *
 * @param routes
 */
export declare const onPathMiddlewareFactory: (routes: Route<RouterDependencies>[]) => MiddlewareFactory<RouterDependencies>;
//# sourceMappingURL=onPath.d.ts.map