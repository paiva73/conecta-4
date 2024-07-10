import React, { useContext } from "react";
import styles from "../Footer.module.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import HeadsetIcon from "@mui/icons-material/Headset";
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff";
import SliderVolume from "./SliderVolume";
import ReactPlayer from "react-player";
import Context from "../../../context/Context";
import useCreateSound from "../../useCreateSound";
import optionsFunctions from "./optionsFunctions";

const OptionsModal = ({ isOpen, setIsOpen }) => {
  const {
    musicIsActive,
    effectsIsActive,
    volumeMusic,
    volumeEffects,
    setVolumeEffects,
    musicIsHovered,
    setMusicIsHovered,
    effectsIsHovered,
    setEffectsIsHovered,
  } = useContext(Context);

  const {
    handleMusicClick,
    handleEffectsClick,
    handleMusicVolumeChange,
    handleEffectsVolumeChange,
  } = optionsFunctions();

  const { handleEffectClick } = useCreateSound({ src: "./click.mp3" });

  return (
    <div
      className={`${styles.container_modal} ${
        isOpen ? styles.active : styles.disabled
      }`}
      onClick={() => {
        setIsOpen(false);
        handleEffectClick();
      }}
    >
      <div className={styles.modal_center}>
        <div style={{ display: "none" }}>
          <ReactPlayer
            url={"./bgMusic.mp3"}
            playing={musicIsActive}
            volume={volumeMusic}
            loop={true}
          />
        </div>
        <div
          className={styles.content_modal}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.reglas}>
            <h3 className={styles.h3}>Objetivo</h3>
            <p>
              El objetivo del juego es ser el primer jugador en conectar 4
              fichas de tu color en línea recta (horizontal, vertical o
              diagonal).
            </p>
          </div>
          <div>
            <h3 className={styles.h3}>Reglas</h3>
            <ul>
              <li>
                Los jugadores se turnan para dejar caer una ficha en una de las
                columnas del tablero. La ficha caerá por la columna hasta la
                última fila disponible.
              </li>
              <li>Una vez colocada la ficha, no se puede mover.</li>
              <li>
                El primer jugador en conectar 4 fichas de su color en línea
                recta (horizontal, vertical o diagonal) gana la partida.
              </li>
              <li>
                Si se utilizan todas las fichas y ningún jugador ha conseguido
                conectar 4, la partida termina en empate.
              </li>
            </ul>
          </div>
          <div className={styles.container_sounds}>
            <div
              className={styles.btn_bgMusic}
              onMouseEnter={() => setMusicIsHovered(true)}
              onMouseLeave={() => setMusicIsHovered(false)}
            >
              Música
              {musicIsActive ? (
                <MusicNoteIcon
                  onClick={() => {
                    handleMusicClick();
                    handleEffectClick();
                  }}
                  fontSize="large"
                />
              ) : (
                <MusicOffIcon
                  onClick={() => {
                    handleMusicClick();
                    handleEffectClick();
                  }}
                  fontSize="large"
                />
              )}
              {musicIsActive && musicIsHovered && (
                <SliderVolume
                  onChange={handleMusicVolumeChange}
                  value={volumeMusic}
                  onMouseEnter={() => setMusicIsHovered(true)}
                />
              )}
            </div>

            <div
              className={styles.btn_bgMusic}
              onMouseEnter={() => setEffectsIsHovered(true)}
              onMouseLeave={() => setEffectsIsHovered(false)}
            >
              Efectos
              {effectsIsActive ? (
                <HeadsetIcon
                  onClick={() => {
                    handleEffectsClick();
                    handleEffectClick();
                    setVolumeEffects(0);
                  }}
                  fontSize="large"
                />
              ) : (
                <HeadsetOffIcon
                  onClick={() => {
                    setVolumeEffects(0.25);
                    handleEffectsClick();
                    handleEffectClick();
                  }}
                  fontSize="large"
                />
              )}
              {effectsIsActive && effectsIsHovered && (
                <SliderVolume
                  onChange={handleEffectsVolumeChange}
                  value={volumeEffects}
                  onMouseEnter={() => setEffectsIsHovered(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsModal;
