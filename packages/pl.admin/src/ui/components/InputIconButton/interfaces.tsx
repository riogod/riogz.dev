import { ReactNode } from "react";
import { OverridableStringUnion } from "@mui/types";
import { IconButtonPropsColorOverrides } from "@mui/material/IconButton/IconButton";

type IconColor = OverridableStringUnion<
  "primary" | "secondary" | "error" | "info" | "success" | "warning",
  IconButtonPropsColorOverrides
>;

export interface IProps {
  icon: ReactNode;
  disabled?: boolean;
  color: IconColor;
  onClick?: () => void;
}
