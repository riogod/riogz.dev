import type {
  Middleware,
  MiddlewareFactory,
  Route,
} from 'router5/dist/types/router';
import { findSegment } from './libs/findSegment';
import type { RouterDependencies } from '../interfaces';

export interface IPrivateRouteMiddlewareConfig {
  private?: boolean;
}

export const PrivateRouteMiddlewareFactory =
  (
    routes: Route<RouterDependencies>[],
  ): MiddlewareFactory<RouterDependencies> =>
  (): Middleware =>
  (toState, _fromState, done): void => {
    const segment = findSegment(toState.name, routes);

    if (segment && (segment as any).private) {
      console.log('PrivateRouteMiddlewareFactory', (segment as any).private);
    }

    done();
  };
