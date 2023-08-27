import { FC } from "react";
import { IProps } from "./interfaces.tsx";
import { Box, Divider, Drawer } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ThemeModeToggle from "./components/ThemeModeToggle";

const AppSettingsDrawer: FC<IProps> = ({ drawerWidth, open, closeHandler }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      elevation={0}
      onClose={closeHandler}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: (theme) => theme.palette.background.paper,
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          width: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Settings</Typography>
        <IconButton
          color="primary"
          aria-label="close app settings"
          onClick={closeHandler}
          edge="start"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          p: 2,
          width: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ThemeModeToggle />
      </Box>
    </Drawer>
  );
};

export default AppSettingsDrawer;
