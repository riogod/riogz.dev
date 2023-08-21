import { ModuleConfig } from '../../../bootstrap/interface';
import { routes } from './routes';

export const config: ModuleConfig = {
  ROUTES: () => routes,
  onModuleInit: async (_bootstrap) => {},
};
