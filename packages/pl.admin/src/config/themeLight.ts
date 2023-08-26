import { createTheme, ThemeOptions } from "@mui/material";
import { theme } from "./theme.ts";

export const themeLight: ThemeOptions = createTheme({
  ...theme,
  palette: {
    mode: "light",
  },
});
