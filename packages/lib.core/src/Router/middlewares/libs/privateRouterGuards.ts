import { Router } from 'router5';
import {
  ActivationFnFactory,
  DefaultDependencies,
} from 'router5/dist/types/router';
import { IRoute, IRoutes } from '../../interfaces';

export const privateRouteGuard = (
  router: Router<DefaultDependencies>,
  routes: IRoutes,
  guardFn: ActivationFnFactory<DefaultDependencies>,
) => {
  let queue: { node: IRoute; name: string }[] = [...routes].map((node) => ({
    node,
    name: '',
  }));

  while (queue.length > 0) {
    let { node, name } = queue.shift()!;
    let nodeName = name ? name + '.' + node.name : node.name;

    if (!!node.private) {
      router.canActivate(nodeName, guardFn);
    }

    if (node.children) {
      for (let child of node.children) {
        queue.push({ node: child, name: nodeName });
      }
    }
  }
};
