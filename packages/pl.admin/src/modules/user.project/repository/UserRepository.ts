import { inject, injectable } from "inversify";
import { APIClient, HttpMethod } from "@riogz/lib.core";

import {
  IRequestUserProjectsDto,
  IResponseUserProjectsDto,
} from "./interface.ts";
import { PROJECT_ENDPOINTS } from "../config/endpoints.ts";

@injectable()
class UserProjectsRepository {
  constructor(@inject(APIClient) private api: APIClient) {}

  async getAllUserProject(): Promise<IResponseUserProjectsDto[]> {
    return await this.api.request<{}, IResponseUserProjectsDto[]>({
      method: HttpMethod.GET,
      route: PROJECT_ENDPOINTS.PROJECT,
    });
  }

  async createNewProject(requestObj: IRequestUserProjectsDto) {
    return await this.api.request<
      IRequestUserProjectsDto,
      IResponseUserProjectsDto
    >({
      method: HttpMethod.POST,
      route: PROJECT_ENDPOINTS.PROJECT,
      requestObj,
    });
  }
}

export { UserProjectsRepository };
