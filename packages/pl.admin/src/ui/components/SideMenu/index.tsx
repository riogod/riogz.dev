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
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

const SideMenu: FC<IProps> = ({ drawerWidth }) => {
  return (
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
          zIndex: (theme) => theme.zIndex.appBar - 1,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
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
  );
};

export default SideMenu;
