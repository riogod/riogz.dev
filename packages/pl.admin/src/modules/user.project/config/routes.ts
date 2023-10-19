import { IRoutes } from "@riogz/lib.core";
import SideMenuProject from "../ui/sideMenuProject";

export const PROJECT_ROUTES = {
  PROJECTS: "project",
  SETTINGS: "settings",
};

export const routes: IRoutes = [
  {
    name: PROJECT_ROUTES.PROJECTS,
    path: "/project/:id",
    menu: {
      text: "Projects",
      sortOrder: 1000,
      menuAlwaysExpand: true,
    },
    menuComponent: SideMenuProject,
    onEnter: async (_router): Promise<void> => {},
    // children: [
    //   {
    //     name: PROJECT_ROUTES.SETTINGS,
    //     path: "/settings",
    //     menu: {
    //       text: "Settings",
    //       sortOrder: 1000,
    //     },
    //   },
    // ],
  },
];
