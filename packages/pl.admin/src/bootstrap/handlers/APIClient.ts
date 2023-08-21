import { AbstractInitHandler } from './AbstractInitHandler';
import { Bootstrap } from '..';

export class APIClientHandler extends AbstractInitHandler {
  async handle(bootstrap: Bootstrap): Promise<Bootstrap> {
    const { apiUrl } = this.params;

    if (!apiUrl) {
      throw new Error('apiUrl in application config is not defined');
    }
    await bootstrap.initAPIClient(apiUrl);

    return await super.handle(bootstrap);
  }
}
