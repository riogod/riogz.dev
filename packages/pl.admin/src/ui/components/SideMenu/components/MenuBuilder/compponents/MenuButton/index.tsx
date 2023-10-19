import { FC } from "react";
import { IProps } from "./interfaces.tsx";
import { MenuButtonStyled } from "./MenuButtonStyled.tsx";
import { useRoute, useRouter } from "react-router5";

const MenuButton: FC<IProps> = ({ text, navigate, ...props }) => {
  const router = useRouter();
  const route = useRoute();

  return (
    <MenuButtonStyled
      {...props}
      fullWidth={true}
      disableRipple={true}
      size="small"
      active={String(route.route.name === navigate?.path)}
      sx={{ justifyContent: "flex-start" }}
      onClick={() => {
        if (navigate) {
          router.navigate(navigate.path, { id: navigate?.id });
        }
      }}
    >
      {text}
    </MenuButtonStyled>
  );
};

export default MenuButton;
