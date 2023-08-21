import type { MiddlewareFactory, Route } from 'router5/dist/types/router';
import type { RouterDependencies } from '../interfaces';
export interface IPrivateRouteMiddlewareConfig {
    private?: boolean;
}
export declare const PrivateRouteMiddlewareFactory: (routes: Route<RouterDependencies>[]) => MiddlewareFactory<RouterDependencies>;
//# sourceMappingURL=PrivateRoute.d.ts.map