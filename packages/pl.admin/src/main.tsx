import "reflect-metadata";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import "./main.css";
import { Bootstrap, initBootstrap } from "./bootstrap";
import { appConfig } from "./config/app";
import { APIClientProvider } from "./ui/providers/APIClientProvider";
import { app_modules } from "./modules/modules";
import PagesSelector from "./ui/components/PageSelector";
import { RouterProvider } from "react-router5";
import { DIProvider } from "./ui/providers/DIProvider";
import { configure } from "mobx";
import ThemeSchema from "./ui/components/ThemeSchema";

configure({ enforceActions: "observed", useProxies: "ifavailable" });

initBootstrap(new Bootstrap(app_modules), appConfig)
  .then(async (bootstrap) => {
    bootstrap.router.start(() => {
      ReactDOM.createRoot(document.getElementById("root")!).render(
        <RouterProvider router={bootstrap.router}>
          <DIProvider container={bootstrap.di}>
            <APIClientProvider api={bootstrap.getAPIClient}>
              <ThemeSchema>
                <Box sx={{ display: "flex" }}>
                  <CssBaseline />
                  <PagesSelector />
                </Box>
              </ThemeSchema>
            </APIClientProvider>
          </DIProvider>
        </RouterProvider>,
      );
    });
  })
  .catch((error: any) => {
    console.error(error);
  });
