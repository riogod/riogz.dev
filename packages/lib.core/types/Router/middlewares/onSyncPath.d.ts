import type { MiddlewareFactory, Route } from 'router5/dist/types/router';
import type { RouterDependencies } from '../interfaces';
import type { Params } from 'router5/dist/types/base';
import type { Router } from 'router5';
export interface IOnSyncPathMiddlewareConfig {
    onSyncPath?: (router: Router, toStateParams: Params, fromStateParams?: Params) => Promise<void>;
}
export declare const onSyncPathMiddlewareFactory: (routes: Route<RouterDependencies>[]) => MiddlewareFactory<RouterDependencies>;
//# sourceMappingURL=onSyncPath.d.ts.map