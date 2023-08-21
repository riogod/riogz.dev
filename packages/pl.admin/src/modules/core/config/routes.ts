import { IRoutes } from '@riogz/lib.core';

export const CORE_ROUTES = {
  HOME: 'home',
  DASHBOARD: 'dashboard',
  DASHBOARD2: 'dashboard2',
  404: '404',
};

export const routes: IRoutes = [
  {
    name: CORE_ROUTES.HOME,
    path: '/',
    private: true,
  },
  {
    name: CORE_ROUTES.DASHBOARD,
    path: '/dashboard',
    private: true,
    children: [
      {
        name: CORE_ROUTES.DASHBOARD2,
        path: '/dashboard2',
        private: true,
      },
    ],
  },
  {
    name: CORE_ROUTES[404],
    path: '/404',
  },
];
