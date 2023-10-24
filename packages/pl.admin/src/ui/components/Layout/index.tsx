import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import Header from "../Header";
import Toolbar from "@mui/material/Toolbar";
import SideMenu from "../SideMenu";
import AppSettingsDrawer from "../AppSettingsDrawer";
import ContentContainer from "../ContentContainer";

interface IProps {}

const drawerWidth = 250;

const Layout: FC<IProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [openAppSettings, setOpenAppSettings] = useState(false);
  // const appBarRef = useRef(null);

  const openAppSettingsHandler = () => {
    setOpenAppSettings(true);
  };

  const closeAppSettingsHandler = () => {
    setOpenAppSettings(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleAppSettingsOpen={openAppSettingsHandler}
      />
      {/*<Container content="main">*/}
      <SideMenu drawerWidth={drawerWidth} topbarHeight={65} />
      <AppSettingsDrawer
        drawerWidth={350}
        open={openAppSettings}
        closeHandler={closeAppSettingsHandler}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <ContentContainer />
      </Box>
      {/*</Container>*/}
    </>
  );
};

export default observer(Layout);
