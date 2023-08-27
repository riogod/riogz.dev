import React, { FC } from "react";
import { IProps } from "./interfaces.tsx";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Typography from "@mui/material/Typography";
import { Observer } from "mobx-react-lite";
import { useVM } from "../../../../hooks/useVM.ts";
import { ThemeMode } from "../../../../../modules/core/model/interface.ts";
import { UISettingsViewModel } from "../../../../../modules/core/view_model/uiSettings.viewmodel.ts";

const ThemeModeToggle: FC<IProps> = ({}) => {
  const ui = useVM<UISettingsViewModel>(UISettingsViewModel);
  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    value: ThemeMode,
  ) => {
    ui.setThemeMode(value);
  };

  return (
    <Observer>
      {() => (
        <>
          <Typography variant="subtitle2">MODE</Typography>
          <Box>
            <ToggleButtonGroup
              value={ui.colorModeSettings}
              color="primary"
              exclusive
              size="small"
              onChange={handleAlignment}
              aria-label="Theme mode"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ToggleButton value="light" aria-label="light mode">
                <Box
                  sx={{ display: "flex", alignItems: "center", pr: 1, pl: 1 }}
                >
                  <LightModeOutlinedIcon sx={{ mr: 1 }} />
                  light
                </Box>
              </ToggleButton>
              <ToggleButton value="system" aria-label="system mode">
                <Box
                  sx={{ display: "flex", alignItems: "center", pr: 1, pl: 1 }}
                >
                  <SettingsBrightnessOutlinedIcon sx={{ mr: 1 }} />
                  system
                </Box>
              </ToggleButton>
              <ToggleButton value="dark" aria-label="dark mode">
                <Box
                  sx={{ display: "flex", alignItems: "center", pr: 1, pl: 1 }}
                >
                  <DarkModeOutlinedIcon sx={{ mr: 1 }} />
                  dark
                </Box>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </>
      )}
    </Observer>
  );
};

export default ThemeModeToggle;
