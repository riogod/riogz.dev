import { FC, ReactNode } from "react";
import { Observer } from "mobx-react-lite";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { themeDark } from "../../../config/themeDark.ts";
import { themeLight } from "../../../config/themeLight.ts";
import { useVM } from "../../hooks/useVM.ts";
import { AppSettingsViewmodel } from "../../../modules/core/view_model/appSettings.viewmodel.ts";

interface IProps {
  children?: ReactNode;
}

const ThemeSchema: FC<IProps> = ({ children }) => {
  const app = useVM<AppSettingsViewmodel>(AppSettingsViewmodel);
  return (
    <Observer>
      {() => (
        <ThemeProvider
          theme={app.themeMode === "dark" ? themeDark : themeLight}
        >
          {children}
        </ThemeProvider>
      )}
    </Observer>
  );
};

export default ThemeSchema;
