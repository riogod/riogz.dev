import { ThemeOptions } from "@mui/material";

export const theme: ThemeOptions = {
  palette: {
    primary: {
      main: "#673ab7",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            backgroundClip: "text",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            transitionDelay: "9999s",
            transitionProperty: "background-color, color",
          },
        },
      },
    },
  },
};
