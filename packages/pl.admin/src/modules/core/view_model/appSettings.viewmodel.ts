import { makeAutoObservable } from "mobx";
import { inject, injectable } from "inversify";
import { AuthModel } from "../../auth/model/auth.model.ts";

@injectable()
export class AppSettingsViewModel {
  _serviceAvable: boolean = true;
  get auth() {
    return this.authModel.auth;
  }
  get authComplete() {
    return this.authModel.authComplete;
  }

  get authInProgress() {
    return this.authModel.authInProgress;
  }

  set serviceAvable(serviceAvable: boolean) {
    this._serviceAvable = serviceAvable;
  }

  constructor(
    @inject(AuthModel)
    private authModel: AuthModel,
  ) {
    makeAutoObservable(this);
  }
}
