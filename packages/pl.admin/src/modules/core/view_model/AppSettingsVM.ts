import { makeAutoObservable } from 'mobx';
import { inject, injectable } from 'inversify';
import { AuthModel } from '../../auth/model/AuthModel';

@injectable()
export class AppSettingsVM {
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

  get serviceAvable() {
    return this._serviceAvable;
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
