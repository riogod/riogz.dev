import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import Header from "../Header";
import Toolbar from "@mui/material/Toolbar";
import SideMenu from "../SideMenu";
import AppSettingsDrawer from "../AppSettingsDrawer";
import ContentContainer from "../ContentContainer";
// import { useMediaQuery } from "@mui/material";

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
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // const isDesktopOrLaptop = useMediaQuery("(min-width: 1224px)");
  // const isBigScreen = useMediaQuery("(min-width: 1824px)");
  // const isTabletOrMobile = useMediaQuery("(max-width: 1224px)");
  // const isPortrait = useMediaQuery("(orientation: portrait)");
  // const isRetina = useMediaQuery("(min-resolution: 2dppx)");
  //
  // console.log(prefersDarkMode);
  // console.log("isDesktopOrLaptop", isDesktopOrLaptop);
  // console.log("isBigScreen", isBigScreen);
  // console.log("isTabletOrMobile", isTabletOrMobile);
  // console.log("isPortrait", isPortrait);
  // console.log("isRetina", isRetina);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  // console.log(appBarRef.current);
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
        {/*        {[...new Array(62)]*/}
        {/*          .map(*/}
        {/*            () => `Cras mattis consectetur purus sit amet fermentum.*/}
        {/*Cras justo odio, dapibus ac facilisis in, egestas eget quam.*/}
        {/*Morbi leo risus, porta ac consectetur ac, vestibulum at eros.*/}
        {/*Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,*/}
        {/*          )*/}
        {/*          .join("\n")}*/}
      </Box>
      {/*</Container>*/}
    </>
  );
};

export default observer(Layout);
