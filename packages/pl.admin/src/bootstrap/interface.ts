import { IRoute } from "@riogz/lib.core";
import { Bootstrap } from ".";

export interface ModuleConfig {
  ROUTES: () => IRoute[];
  // I18N: (i18n: i18n) => void;
  onModuleInit?: (bootstrap: Bootstrap) => Promise<void>;
  onAppInit?: (bootstrap: Bootstrap) => Promise<void>;
  onAuth?: (bootstrap: Bootstrap) => Promise<void>;
  onLogout?: (bootstrap: Bootstrap) => Promise<void>;
}
