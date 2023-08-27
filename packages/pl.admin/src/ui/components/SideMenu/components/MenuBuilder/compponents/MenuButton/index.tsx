import { FC } from "react";
import { IProps } from "./interfaces.tsx";
import { MenuButtonStyled } from "./MenuButtonStyled.tsx";
import { useRoute, useRouter } from "react-router5";

const MenuButton: FC<IProps> = ({ text, navigate, ...props }) => {
  const router = useRouter();
  const route = useRoute();

  console.log();
  return (
    <MenuButtonStyled
      {...props}
      fullWidth={true}
      disableRipple={true}
      size="small"
      active={route.route.name === navigate}
      sx={{ justifyContent: "flex-start" }}
      onClick={() => {
        router.navigate(navigate);
      }}
    >
      {text}
    </MenuButtonStyled>
  );
};

export default MenuButton;
