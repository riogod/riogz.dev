import { FC } from "react";
import { IProps } from "./interfaces.tsx";
import Box from "@mui/material/Box";
import MenuBuilder from "./components/MenuBuilder";
import Drawer from "@mui/material/Drawer";

const SideMenu: FC<IProps> = ({ drawerWidth, topbarHeight }) => {
  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={true}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: `${topbarHeight}px`,
            zIndex: (theme) => theme.zIndex.appBar - 1,
          },
        }}
      >
        <Box>
          <MenuBuilder />
        </Box>
      </Drawer>
    </>
  );
};

export default SideMenu;
