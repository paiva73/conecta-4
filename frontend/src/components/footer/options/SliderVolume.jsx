import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import styles from "../Footer.module.css";

const SliderVolume = ({ onChange, value }) => {
  return (
    <Box className={styles.handleVolume}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider
          aria-label="Volume"
          value={value}
          onChange={onChange}
          min={0}
          max={1}
          step={0.001}
        />
        <VolumeUp />
      </Stack>
    </Box>
  );
};

export default SliderVolume;
