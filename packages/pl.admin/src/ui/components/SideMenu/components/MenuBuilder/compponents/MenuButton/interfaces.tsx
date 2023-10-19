import { ButtonProps } from "@mui/material";
import { IMenuItemNavigate } from "@riogz/lib.core/src/Router/interfaces.ts";

export interface IProps extends ButtonProps {
  text: string;
  navigate?: IMenuItemNavigate;
}

export interface IButtonProps extends ButtonProps {
  active?: string;
}
