import { FC } from "react";
import { observer } from "mobx-react-lite";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";
import { IProps } from "./interfaces.tsx";
import { AppBarStyled } from "./AppBarStyled.tsx";
import { Box, Divider } from "@mui/material";
import { useVM } from "../../hooks/useVM.ts";
import { AuthViewModel } from "../../../modules/auth/view_model/AuthVM.ts";
import { useRouter } from "react-router5";
import IconButton from "../IconButton";
import { AUTH_ROUTES } from "../../../modules/auth/config/routes.ts";

const Header: FC<IProps> = ({ open, handleAppSettingsOpen }) => {
  const auth = useVM<AuthViewModel>(AuthViewModel);
  const router = useRouter();

  const logoutHandler = async () => {
    await auth.logout();
    router.navigate(AUTH_ROUTES.LOGIN);
  };
  return (
    <AppBarStyled open={open} color="transparent">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Box>
        <Box>
          <IconButton
            icon={<LogoutIcon fontSize="small" />}
            color="primary"
            size="small"
            variant="outlined"
            aria-label="logout"
            title="Logout"
            onClick={logoutHandler}
          />
          <IconButton
            icon={<SettingsIcon fontSize="small" />}
            color="primary"
            size="small"
            variant="outlined"
            aria-label="open drawer"
            title="Open app settings"
            onClick={handleAppSettingsOpen}
          />
        </Box>
      </Toolbar>
      <Divider />
    </AppBarStyled>
  );
};

export default observer(Header);
