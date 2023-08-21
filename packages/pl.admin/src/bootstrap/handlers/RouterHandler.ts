import { Bootstrap } from '..';
import { AbstractInitHandler } from './AbstractInitHandler';

export class RouterHandler extends AbstractInitHandler {
  async handle(bootstrap: Bootstrap): Promise<Bootstrap> {
    const { routes, appPrefix } = this.params;
    bootstrap.initRouter(routes, appPrefix);

    return await super.handle(bootstrap);
  }
}
