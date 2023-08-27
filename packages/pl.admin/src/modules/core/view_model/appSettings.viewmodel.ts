import { makeAutoObservable } from "mobx";
import { inject, injectable } from "inversify";
import { AuthModel } from "../../auth/model/auth.model.ts";
import { AppModel } from "../model/app.model.ts";
import { ThemeMode } from "../model/interface.ts";

@injectable()
export class AppSettingsViewmodel {
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

  get themeMode() {
    return this.appModel.appThemeMode;
  }

  get colorModeSettings() {
    return this.appModel.colorModeSettings;
  }

  set serviceAvable(serviceAvable: boolean) {
    this._serviceAvable = serviceAvable;
  }

  constructor(
    @inject(AuthModel)
    private authModel: AuthModel,
    @inject(AppModel)
    private appModel: AppModel,
  ) {
    makeAutoObservable(this);
  }

  setThemeMode(themeMode: ThemeMode) {
    this.appModel.appThemeMode = themeMode === "system" ? undefined : themeMode;
  }
}
