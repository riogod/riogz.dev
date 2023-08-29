import { IRoutes } from "@riogz/lib.core";
import { lazy } from "react";
import { UsersViewModel } from "../view_model/users.viewmodel.ts";
import { Container } from "inversify";

const UserList = lazy(() => import("../ui/user.list"));
const UserRoles = lazy(() => import("../ui/user.roles"));

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
    pageComponent: UserList,
    onEnter: async (router): Promise<void> => {
      const container = router.getDependencies().di as Container;

      await container.get(UsersViewModel).loadAllUsers({});
    },
    menu: {
      text: "All users",
      sortOrder: 1000,
      navigate: USER_ROUTES.USERS_LIST,
    },
  },
  {
    name: USER_ROUTES.USERS_ROLES,
    path: "/roles",
    pageComponent: UserRoles,
    onEnter: async (_router): Promise<void> => {},
    menu: {
      text: "Roles",
      sortOrder: 2000,
      navigate: USER_ROUTES.USERS_ROLES,
    },
  },
];
