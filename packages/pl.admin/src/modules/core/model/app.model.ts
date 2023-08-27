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
  private _colorMode: Omit<ThemeMode, "system">;
  private _colorModeSettings: ThemeMode;
  get appThemeMode(): Omit<ThemeMode, "system"> {
    return this._colorMode;
  }

  get colorModeSettings(): ThemeMode {
    return this._colorModeSettings;
  }

  set appThemeMode(themeMode: ThemeMode | undefined) {
    if (!themeMode) {
      this.localStorageRepository.removeKey("themeMode");
      this._colorMode = this._defaultColorMode;
      this._colorModeSettings = "system";
      return;
    }
    this.localStorageRepository.setKey<ThemeMode>("themeMode", themeMode);
    this._colorMode = themeMode;
    this._colorModeSettings = themeMode;
  }
  constructor(
    @inject(LocalStorageRepository)
    private localStorageRepository: LocalStorageRepository,
  ) {
    makeAutoObservable(this);

    const getThemeMode =
      this.localStorageRepository.getKey<ThemeMode>("themeMode");
    this._colorMode = getThemeMode || this._defaultColorMode;
    this._colorModeSettings = getThemeMode || "system";
  }
}
