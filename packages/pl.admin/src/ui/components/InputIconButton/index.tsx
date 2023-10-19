import { FC } from "react";
import { IProps } from "./interfaces.tsx";
import IconButton from "@mui/material/IconButton";

const InputIconButton: FC<IProps> = ({
  icon,
  disabled = false,
  color,
  onClick,
}) => {
  return (
    <IconButton
      children={icon}
      onClick={onClick}
      disabled={disabled}
      disableRipple={true}
      disableFocusRipple={true}
      sx={(theme) => ({
        p: 0,
        m: 0,
        color: theme.palette[color].dark,
        "&:hover": {
          color: theme.palette[color].light,
        },
      })}
    />
  );
};

export default InputIconButton;
