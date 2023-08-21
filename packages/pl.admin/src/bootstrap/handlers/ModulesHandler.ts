import { Bootstrap } from '..';
import { AbstractInitHandler } from './AbstractInitHandler';

export class ModulesHandler extends AbstractInitHandler {
  async handle(bootstrap: Bootstrap): Promise<Bootstrap> {
    await bootstrap.initModules();

    return await super.handle(bootstrap);
  }
}
