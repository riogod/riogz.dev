import { FC } from "react";
import { IProps } from "./interfaces.tsx";
import { MenuButtonStyled } from "./MenuButtonStyled.tsx";

const MenuButton: FC<IProps> = ({ text, ...props }) => {
  return (
    <MenuButtonStyled
      {...props}
      fullWidth={true}
      disableRipple={true}
      sx={{ justifyContent: "flex-start" }}
    >
      {text}
    </MenuButtonStyled>
  );
};

export default MenuButton;
