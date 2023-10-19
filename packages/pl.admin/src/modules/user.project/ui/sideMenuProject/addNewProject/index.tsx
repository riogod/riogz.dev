import { FC, useState } from "react";
import { IProps } from "./interfaces.tsx";
import { Input, InputAdornment } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import InputIconButton from "../../../../../ui/components/InputIconButton";

const AddNewProject: FC<IProps> = ({ onCancel, onSave }) => {
  const [text, setText] = useState("");
  const onSaveHandler = () => {
    if (text.length > 0) {
      onSave(text);
    }
  };

  return (
    <Input
      id="standard-basic"
      placeholder="Project name"
      value={text}
      onChange={(e) => {
        setText(e.target.value);
      }}
      endAdornment={
        <InputAdornment position="end">
          <InputIconButton
            icon={<CheckCircleOutlineRoundedIcon />}
            disabled={text.length === 0}
            color="success"
            onClick={onSaveHandler}
          />
          <InputIconButton
            icon={<HighlightOffRoundedIcon />}
            color="error"
            onClick={onCancel}
          />
        </InputAdornment>
      }
      autoFocus={true}
      fullWidth={true}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onCancel();
        }
        if (e.key === "Enter") {
          onSaveHandler();
        }
      }}
    />
  );
};

export default AddNewProject;
