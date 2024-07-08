import React, { useState } from "react";
import styles from "../Footer.module.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import HeadsetIcon from "@mui/icons-material/Headset";
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff";
import SliderVolume from "./SliderVolume";

const OpcionesModal = ({ setIsOpen }) => {
  const [musicIsActive, setMusicIsActive] = useState(false);
  const [effectsIsActive, setEffectsIsActive] = useState(false);
  const [volumeMusic, setVolumeMusic] = useState(0.5);
  const [volumeEffects, setVolumeEffects] = useState(0.5);

  const handleMusicClick = () => {
    setMusicIsActive(!musicIsActive);
  };

  const handleEffectsClick = () => {
    setEffectsIsActive(!effectsIsActive);
  };

  const handleMusicVolumeChange = (e, newValue) => {
    setVolumeMusic(newValue);
    console.log(volumeMusic);
  };

  const handleEffectsVolumeChange = (e, newValue) => {
    setVolumeEffects(newValue);
  };

  return (
    <div className={styles.container_modal} onClick={() => setIsOpen(false)}>
      <div
        className={styles.content_modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.btn_reglas}>Reglas</button>
        <div className={styles.btn_bgMusic}>
          Música
          {musicIsActive ? (
            <MusicNoteIcon
              onClick={handleMusicClick}   
            />
          ) : (
            <MusicOffIcon onClick={handleMusicClick} />
          )}
          {
            musicIsActive &&
            <SliderVolume
              onChange={handleMusicVolumeChange}
              value={volumeMusic}
            />
          }
        </div>

        <div className={styles.btn_bgMusic}>
          Efectos
          {effectsIsActive ? (
            <HeadsetIcon onClick={handleEffectsClick} />
          ) : (
            <HeadsetOffIcon onClick={handleEffectsClick} />
          )}
          {
            effectsIsActive &&
            <SliderVolume
              onChange={handleEffectsVolumeChange}
              value={volumeEffects}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default OpcionesModal;
