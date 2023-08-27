import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { IButtonProps } from "./interfaces.tsx";

export const MenuButtonStyled = styled((props: IButtonProps) => (
  <Button {...props} />
))(({ theme, active }) => ({
  textTransform: "none",
  paddingLeft: theme.spacing(4),
  backgroundColor: active
    ? theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .03)"
      : "rgba(0, 0, 0, .03)"
    : "transparent",
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  "&:before": {
    position: "absolute",
    content: '""',
    display: "block",
    height: "100%",
    backgroundColor: active
      ? theme.palette.primary.main
      : theme.palette.divider,
    width: "1px",
    left: "12px",
  },
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .05)",
  },
}));
