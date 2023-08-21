import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            backgroundClip: 'text',
          },
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        inputProps: {
          style: {},

          // paddingBottom: 0,
        },
      },
    },
  },
});
