import { config as CoreConfig } from "./core/config/module_config";
import { config as AuthConfig } from "./auth/config/module_config";
import { config as UsersConfig } from "./user/config/module_config";
import { Module } from "./interface";

export const app_modules: Module[] = [
  {
    name: "core",
    path: "core",
    config: CoreConfig,
  },
  {
    name: "auth",
    path: "auth",
    config: AuthConfig,
  },
  {
    name: "user",
    path: "user",
    config: UsersConfig,
  },
];
