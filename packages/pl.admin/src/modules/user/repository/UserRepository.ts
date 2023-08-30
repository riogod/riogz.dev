import { inject, injectable } from "inversify";
import { APIClient, HttpMethod } from "@riogz/lib.core";
import { USER_ENDPOINTS } from "../config/endpoints.ts";
import { IRequestUserListDto, IResponseUserListDto } from "./interface.ts";

@injectable()
class UsersRepository {
  constructor(@inject(APIClient) private api: APIClient) {}

  async getAllUsers(
    params: IRequestUserListDto,
  ): Promise<IResponseUserListDto> {
    return await this.api.request<IRequestUserListDto, IResponseUserListDto>({
      method: HttpMethod.GET,
      route: USER_ENDPOINTS.LIST + "?page=1&limit=25",
      requestObj: {
        page: params.page || 1,
        limit: params.limit || 10,
      },
    });
  }
}

export { UsersRepository };
