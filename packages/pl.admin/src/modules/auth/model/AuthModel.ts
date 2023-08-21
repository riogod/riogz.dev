import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';

@injectable()
export class AuthModel {
  private _auth: boolean = false;
  private _auth_complete: boolean = false;
  private _auth_inProgress: boolean = false;

  get auth() {
    return this._auth;
  }
  get authComplete() {
    return this._auth_complete;
  }

  get authInProgress() {
    return this._auth_inProgress;
  }
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(auth: boolean) {
    this._auth = auth;
  }

  setAuthComplete(authComplete: boolean) {
    this._auth_complete = authComplete;
  }

  setAuthInProgress(authInProgress: boolean) {
    this._auth_inProgress = authInProgress;
  }
}
