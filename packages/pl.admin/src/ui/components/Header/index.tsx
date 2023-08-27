import { FC } from "react";
import { observer } from "mobx-react-lite";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";
import { IProps } from "./interfaces.tsx";
import { AppBarStyled } from "./AppBarStyled.tsx";
import { Box, Divider } from "@mui/material";
import { useVM } from "../../hooks/useVM.ts";
import { AppSettingsViewmodel } from "../../../modules/core/view_model/appSettings.viewmodel.ts";
import { AuthViewModel } from "../../../modules/auth/view_model/AuthVM.ts";
import { useRouter } from "react-router5";
import Button from "@mui/material/Button";

const Header: FC<IProps> = ({ open, handleAppSettingsOpen }) => {
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
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
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
        </Box>
        <Box>
          <Button
            color="primary"
            variant="outlined"
            aria-label="open drawer"
            onClick={logoutHandler}
            sx={{ ml: 1, padding: "5px 5px", minWidth: "unset" }}
          >
            <LogoutIcon fontSize="small" />
          </Button>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            aria-label="open drawer"
            onClick={handleAppSettingsOpen}
            sx={{ ml: 1, padding: "5px 5px", minWidth: "unset" }}
          >
            <SettingsIcon fontSize="small" />
          </Button>
        </Box>
      </Toolbar>
      <Divider />
    </AppBarStyled>
  );
};

export default observer(Header);
