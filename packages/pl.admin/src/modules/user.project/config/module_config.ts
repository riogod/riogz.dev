import { ModuleConfig } from "../../../bootstrap/interface";
import { routes } from "./routes";
import { UserProjectsViewModel } from "../view_model/projects.viewmodel.ts";
// import { USER_ROUTES } from "../../user/config/routes.ts";

export const config: ModuleConfig = {
  ROUTES: () => routes,
  onModuleInit: async (_bootstrap) => {},
  // onAppInit: async (bootstrap) => {},
  onAuth: async (bootstrap) => {
    const vm = bootstrap.di.get(UserProjectsViewModel);
    try {
      await vm.loadAllProjects();
    } finally {
      vm.setLoaded(true);
    }
  },
};
