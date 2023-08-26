import { createTheme, ThemeOptions } from "@mui/material";
import { theme } from "./theme.ts";

export const themeDark: ThemeOptions = createTheme({
  ...theme,
  palette: {
    mode: "dark",
    background: {
      default: "rgba(16, 20, 24, 1)",
      paper: "rgba(16, 20, 24,1)",
    },
  },
});
