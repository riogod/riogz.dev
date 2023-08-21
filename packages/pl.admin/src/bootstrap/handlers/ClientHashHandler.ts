import { AbstractInitHandler } from './AbstractInitHandler';
import { Bootstrap } from '..';
import Cookies from 'js-cookie';

export class ClientHashHandler extends AbstractInitHandler {
  async handle(bootstrap: Bootstrap): Promise<Bootstrap> {
    const apiClient = bootstrap.getAPIClient;
    const checkCookie = localStorage.getItem('D_UUID');
    if (!checkCookie) {
      const deviceID = await apiClient.genearateDeviceId();
      localStorage.setItem('D_UUID', deviceID);
    }

    return await super.handle(bootstrap);
  }
}
