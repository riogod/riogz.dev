import { inject, injectable } from "inversify";
import { APIClient, HttpMethod } from "@riogz/lib.core";
import { RequestAuthDTO, ResponseLoginServiceDTO } from "../model/interface";
import { AUTH_ENDPOINTS } from "../config/endpoints";
import { ResponseAuthServiceDTO } from "./interface.ts";

@injectable()
class AuthRepository {
  constructor(@inject(APIClient) private api: APIClient) {}

  async getAppAuthStatus(): Promise<boolean> {
    try {
      await this.api.request<null, ResponseAuthServiceDTO>({
        method: HttpMethod.POST,
        route: AUTH_ENDPOINTS.REFRESH,
      });
    } catch (error) {
      return false;
    }

    return true;
  }

  async authenticate(param: RequestAuthDTO): Promise<ResponseLoginServiceDTO> {
    return await this.api.request<RequestAuthDTO, ResponseLoginServiceDTO>({
      method: HttpMethod.POST,
      route: AUTH_ENDPOINTS.LOGIN,
      requestObj: param,
    });
  }

  async logout(): Promise<void> {
    await this.api.request<{}, {}>({
      method: HttpMethod.POST,
      route: AUTH_ENDPOINTS.LOGOUT,
    });
  }
}

export { AuthRepository };
