import { AxiosError } from '@riogz/lib.core';
import { Bootstrap } from '../../../bootstrap';
import { AUTH_ROUTES } from './routes';
import { AppSettingsVM } from '../../core/view_model/AppSettingsVM';

type TCallbacks = (error: AxiosError) => void;

export const HttpErrorHandler = (bootstrap: Bootstrap) => {
  const errorMap: Record<string, TCallbacks> = {
    ERR_NETWORK: (err) => {
      const settings = bootstrap.di.get(AppSettingsVM);
      settings.serviceAvable = false;
      if (!settings.auth) {
        bootstrap.router.navigate(AUTH_ROUTES.LOGIN);
      }
    },
    ERR_BAD_REQUEST: (err) => {
      if (err.response.status === 401) {
        bootstrap.router.navigate(AUTH_ROUTES.LOGIN);
      }
    },
  };

  for (const [errorNum, callback] of Object.entries(errorMap)) {
    bootstrap.getAPIClient.addErrorCb(errorNum, callback);
  }
};
