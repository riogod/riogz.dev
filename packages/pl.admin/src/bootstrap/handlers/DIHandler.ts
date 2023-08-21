import { Bootstrap } from '..';
import { AbstractInitHandler } from './AbstractInitHandler';

export class DIHandler extends AbstractInitHandler {
  async handle(bootstrap: Bootstrap): Promise<Bootstrap> {
    await bootstrap.initDI();

    return await super.handle(bootstrap);
  }
}
