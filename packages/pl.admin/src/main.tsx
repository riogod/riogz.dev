import 'reflect-metadata';
import ReactDOM from 'react-dom/client';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './config/theme';
import Box from '@mui/material/Box';
import './main.css';
import { Bootstrap, initBootstrap } from './bootstrap';
import { appConfig } from './config/app';
import { APIClientProvider } from './ui/providers/APIClientProvider';
import { app_modules } from './modules/modules';
import PagesSelector from './ui/components/PageSelector';
import { RouterProvider } from 'react-router5';
import { DIProvider } from './ui/providers/DIProvider';
import { configure } from 'mobx';

configure({ enforceActions: 'observed', useProxies: 'never' });

initBootstrap(new Bootstrap(app_modules), appConfig)
  .then(async (bootstrap) => {
    bootstrap.router.start(() => {
      ReactDOM.createRoot(document.getElementById('root')!).render(
        // <React.StrictMode>
        <RouterProvider router={bootstrap.router}>
          <ThemeProvider theme={theme}>
            <APIClientProvider api={bootstrap.getAPIClient}>
              <DIProvider container={bootstrap.di}>
                <Box sx={{ display: 'flex' }}>
                  <CssBaseline />
                  <PagesSelector />
                </Box>
              </DIProvider>
            </APIClientProvider>
          </ThemeProvider>
        </RouterProvider>,
        //  </React.StrictMode>,
      );
    });
  })
  .catch((error: any) => {
    console.error(error);
  });
