import { FC } from "react";
import { observer } from "mobx-react-lite";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { IProps } from "./interfaces.tsx";
import { AppBarStyled } from "./AppBarStyled.tsx";
import { Divider } from "@mui/material";
import { useVM } from "../../hooks/useVM.ts";
import { AppSettingsViewmodel } from "../../../modules/core/view_model/appSettings.viewmodel.ts";
import { AuthViewModel } from "../../../modules/auth/view_model/AuthVM.ts";
import { useRouter } from "react-router5";

const Header: FC<IProps> = ({ open }) => {
  const app = useVM<AppSettingsViewmodel>(AppSettingsViewmodel);
  const auth = useVM<AuthViewModel>(AuthViewModel);
  const router = useRouter();

  const themeHandeler = () => {
    app.setThemeMode(app.themeMode === "dark" ? "light" : "dark");
  };

  const logoutHandler = async () => {
    await auth.logout();
    router.navigate("login");
  };
  return (
    <AppBarStyled open={open} color="transparent">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={themeHandeler}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Persistent drawer
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={logoutHandler}
          edge="start"
          sx={{ mr: 2 }}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
      <Divider />
    </AppBarStyled>
  );
};

export default observer(Header);
