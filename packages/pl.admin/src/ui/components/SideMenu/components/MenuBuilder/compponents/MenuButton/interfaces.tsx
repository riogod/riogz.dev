import { ButtonProps } from "@mui/material";

export interface IProps extends ButtonProps {
  text: string;
  navigate: string;
}

export interface IButtonProps extends ButtonProps {
  active?: boolean;
}
