import { FC } from "react";
import { IProps } from "./interfaces.tsx";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";

const IconButton: FC<IProps> = ({ icon, title, ...props }) => {
  return (
    <Tooltip title={title}>
      <Button {...props} sx={{ ml: 1, padding: "5px 5px", minWidth: "unset" }}>
        {icon}
      </Button>
    </Tooltip>
  );
};

export default IconButton;
