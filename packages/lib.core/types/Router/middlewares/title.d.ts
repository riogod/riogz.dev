import type { MiddlewareFactory, Route } from 'router5/dist/types/router';
import type { RouterDependencies } from '../interfaces';
export interface ITitleMiddlewareConfig {
    /**
     * Заголовок вкадки браузера
     */
    title?: string;
}
export declare const titleMiddlewareFactory: (routes: Route<RouterDependencies>[]) => MiddlewareFactory<RouterDependencies>;
//# sourceMappingURL=title.d.ts.map