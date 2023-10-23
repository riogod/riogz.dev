import { Bootstrap } from "..";
import { AbstractInitHandler } from "./AbstractInitHandler";
import { AuthViewModel } from "../../modules/auth/view_model/AuthVM.ts";

export class AfterAppInitHandler extends AbstractInitHandler {
  async handle(bootstrap: Bootstrap): Promise<Bootstrap> {
    bootstrap.di
      .get(AuthViewModel)
      .setOnAuthInit(bootstrap.onAuthInitCb, bootstrap);
    return await super.handle(bootstrap);
  }
}
