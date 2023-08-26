import { AxiosError } from "@riogz/lib.core";
import { Bootstrap } from "../../../bootstrap";
import { AUTH_ROUTES } from "./routes";
import { AppSettingsViewmodel } from "../../core/view_model/appSettings.viewmodel.ts";

type TCallbacks = (error: AxiosError) => void;

export const HttpErrorHandler = (bootstrap: Bootstrap) => {
  const errorMap: Record<string, TCallbacks> = {
    ERR_NETWORK: (_err) => {
      const settings = bootstrap.di.get(AppSettingsViewmodel);
      settings.serviceAvable = false;
      if (!settings.auth) {
        bootstrap.router.navigate(AUTH_ROUTES.LOGIN);
      }
    },
    ERR_BAD_REQUEST: (err) => {
      if (err.response && err.response.status === 401) {
        bootstrap.router.navigate(AUTH_ROUTES.LOGIN);
      }
    },
  };

  for (const [errorNum, callback] of Object.entries(errorMap)) {
    bootstrap.getAPIClient.addErrorCb(errorNum, callback);
  }
};
