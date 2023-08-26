import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar";

export interface IProps extends AppBarProps {
  handleDrawerOpen: () => void;
}

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
