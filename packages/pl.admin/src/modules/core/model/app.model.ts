import { makeAutoObservable } from "mobx";
import { inject, injectable } from "inversify";

import { LocalStorageRepository } from "../repository/LocalStorageRepository.ts";
import { ThemeMode } from "./interface.ts";

@injectable()
export class AppModel {
  private _defaultColorMode: ThemeMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme:dark)").matches
      ? "dark"
      : "light";
  private _colorMode: ThemeMode;
  get appThemeMode(): ThemeMode {
    return this._colorMode;
  }

  set appThemeMode(themeMode: ThemeMode | undefined) {
    if (!themeMode) {
      this.localStorageRepository.removeKey("themeMode");
      this._colorMode = this._defaultColorMode;
      return;
    }
    this.localStorageRepository.setKey<ThemeMode>("themeMode", themeMode);
    this._colorMode = themeMode;
  }
  constructor(
    @inject(LocalStorageRepository)
    private localStorageRepository: LocalStorageRepository,
  ) {
    makeAutoObservable(this);

    this._colorMode =
      this.localStorageRepository.getKey<ThemeMode>("themeMode") ||
      this._defaultColorMode;
  }
}
