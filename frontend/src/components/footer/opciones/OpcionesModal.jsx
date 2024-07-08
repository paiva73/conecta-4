import React, { useState } from "react";
import styles from "../Footer.module.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import HeadsetIcon from '@mui/icons-material/Headset';
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff";
// Slider
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

const OpcionesModal = ({ setIsOpen }) => {
  const [musicIsHovered, setMusicIsHovered] = useState(null);
  const [effectsIsHovered, setEffectsIsHovered] = useState(null);
  const [musicIsActive, setMusicIsActive] = useState(false);
  const [effectsIsActive, setEffectsIsActive] = useState(false);
  const [volumeMusic, setVolumeMusic] = useState(0.3);
  const [volumeEffects, setVolumeEffects] = useState(0.3);
  
  const handleMusicClick = () => {
    setMusicIsActive(!musicIsActive);
  };

  const handleEffectsClick = () => {
    setEffectsIsActive(!effectsIsActive);
  };

  const handleMusicVolumeChange = (e, newValue) => {
    setVolumeMusic(newValue);
  };

  const handleEffectsVolumeChange = (e, newValue) => {
    setVolumeMusic(newValue);
  };

  return (
    <div className={styles.container_modal} onClick={() => setIsOpen(false)}>
      <div
        className={styles.content_modal}
        onClick={(e) => e.stopPropagation()}
      >
        {musicIsActive ? <MusicNoteIcon onClick={handleMusicClick}/> : <MusicOffIcon onClick={handleMusicClick}/> }
        {effectsIsActive ? <HeadsetIcon onClick={handleEffectsClick}/> : <HeadsetOffIcon onClick={handleEffectsClick}/> }
      </div>
    </div>
  );
};

export default OpcionesModal;
