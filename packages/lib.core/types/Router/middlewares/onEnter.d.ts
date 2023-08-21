import type { MiddlewareFactory, Route } from 'router5/dist/types/router';
import type { RouterDependencies } from '../interfaces';
import type { Router } from 'router5';
import type { Params } from 'router5/dist/types/base';
export interface IOnEnterMiddlewareConfig {
    onEnter?: (router: Router<RouterDependencies>, toStateParams: Params, fromStateParams: Params) => void;
}
export declare const onEnterMiddlewareFactory: (routes: Route<RouterDependencies>[]) => MiddlewareFactory<RouterDependencies>;
//# sourceMappingURL=onEnter.d.ts.map