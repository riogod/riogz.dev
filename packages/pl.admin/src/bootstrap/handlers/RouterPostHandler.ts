import { AbstractInitHandler } from './AbstractInitHandler';
import { Bootstrap } from '..';

export class RouterPostHandler extends AbstractInitHandler {
  async handle(bootstrap: Bootstrap): Promise<Bootstrap> {
    const { routerPostInit } = this.params;

    bootstrap.routerPostInit(routerPostInit);

    return await super.handle(bootstrap);
  }
}
