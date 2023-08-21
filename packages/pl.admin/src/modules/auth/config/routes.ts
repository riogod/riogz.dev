import { IRoutes } from '@riogz/lib.core';

export const AUTH_ROUTES = {
  LOGIN: 'login',
};

export const routes: IRoutes = [
  {
    name: AUTH_ROUTES.LOGIN,
    path: '/login',
    onEnter: async (_router): Promise<void> => {},
  },
];
