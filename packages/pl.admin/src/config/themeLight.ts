import { createTheme, ThemeOptions } from "@mui/material";
import { theme } from "./theme.ts";
import merge from "../utils/merge.ts";

const lightThemeSettings: ThemeOptions = {
  palette: {
    mode: "light",
  },
};
export const themeLight: ThemeOptions = createTheme(
  merge(theme, lightThemeSettings),
);
