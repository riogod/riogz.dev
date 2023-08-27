import { FC, ReactNode } from "react";
import { Observer } from "mobx-react-lite";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { themeDark } from "../../../config/themeDark.ts";
import { themeLight } from "../../../config/themeLight.ts";
import { useVM } from "../../hooks/useVM.ts";
import { UISettingsViewModel } from "../../../modules/core/view_model/uiSettings.viewmodel.ts";

interface IProps {
  children?: ReactNode;
}

const ThemeSchema: FC<IProps> = ({ children }) => {
  const ui = useVM<UISettingsViewModel>(UISettingsViewModel);
  return (
    <Observer>
      {() => (
        <ThemeProvider theme={ui.themeMode === "dark" ? themeDark : themeLight}>
          {children}
        </ThemeProvider>
      )}
    </Observer>
  );
};

export default ThemeSchema;
