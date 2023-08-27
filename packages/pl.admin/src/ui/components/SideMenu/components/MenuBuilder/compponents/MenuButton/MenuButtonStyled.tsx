import { styled } from "@mui/material/styles";
import { ButtonProps } from "@mui/material";
import Button from "@mui/material/Button";

export const MenuButtonStyled = styled((props: ButtonProps) => (
  <Button {...props} />
))(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`,
  textTransform: "none",
  paddingLeft: theme.spacing(4),
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
  },
  "&::before": {
    position: "absolute",
    content: '""',
    display: "block",
    height: "100%",
    backgroundColor: theme.palette.divider,
    width: "1px",
    left: "12px",
  },
}));
