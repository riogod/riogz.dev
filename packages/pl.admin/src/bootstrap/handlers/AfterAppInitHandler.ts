import { Bootstrap } from '..';
import { AbstractInitHandler } from './AbstractInitHandler';

export class AfterAppInitHandler extends AbstractInitHandler {
  async handle(bootstrap: Bootstrap): Promise<Bootstrap> {
    await bootstrap.runAfterAppInit();

    return await super.handle(bootstrap);
  }
}
