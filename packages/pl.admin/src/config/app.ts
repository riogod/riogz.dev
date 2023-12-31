import { Router } from 'router5';

export const appConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
  appPrefix: import.meta.env.VITE_APP_PREFIX || '',

  routes: [],

  routerPostInit: (
    router: Router<Record<string, any>>,
  ): Router<Record<string, any>> => router,
};
