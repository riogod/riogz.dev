import { IRoutes } from "@riogz/lib.core";

export const USER_ROUTES = {
  USERS: "users",
  USERS_LIST: "users.list",
  USERS_ROLES: "users.roles",
};

export const routes: IRoutes = [
  {
    name: USER_ROUTES.USERS,
    path: "/users",
    menu: {
      text: "Users",
      sortOrder: 1000,
    },
    onEnter: async (_router): Promise<void> => {},
  },
  {
    name: USER_ROUTES.USERS_LIST,
    path: "/list",
    onEnter: async (_router): Promise<void> => {},
    menu: {
      text: "All users",
      sortOrder: 1000,
      navigate: USER_ROUTES.USERS_LIST,
    },
  },
  {
    name: USER_ROUTES.USERS_ROLES,
    path: "/roles",
    onEnter: async (_router): Promise<void> => {},
    menu: {
      text: "Roles",
      sortOrder: 2000,
      navigate: USER_ROUTES.USERS_ROLES,
    },
  },
];
