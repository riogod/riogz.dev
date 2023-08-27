import { FC } from "react";
import { IProps } from "./interfaces.tsx";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";

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
          <List>
            {[
              "Inbox",
              "Starred",
              "Send email",
              "Drafts",
              "Inbox",
              "Starred",
              "Send email",
              "Drafts",
              "Inbox",
              "Starred",
              "Send email",
              "Drafts",
              "Inbox",
              "Starred",
              "Send email",
              "Drafts",
              "Inbox",
              "Starred",
              "Send email",
              "Drafts",
              "Inbox",
              "Starred",
              "Send email",
              "Drafts",
              "Inbox",
              "Starred",
              "Send email",
              "Drafts",
              "Inbox",
              "Starred",
              "Send email",
              "Drafts",
              "Inbox",
              "Starred",
              "Send email",
              "Drafts",
              "Inbox",
              "Starred",
              "Send email",
              "Drafts",
            ].map((text, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SideMenu;
