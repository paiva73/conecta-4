import React, { useContext } from "react";
import styles from "../Inicio.module.css";
import Context from "../../../context/Context";
import useCreateSound from "../../useCreateSound";

const Player = ({
  numberPlayer,
  name,
  nameOnChange,
  colorOnClick,
  selectedColor,
}) => {
  const { colors } = useContext(Context);

  const { handleEffectClick } = useCreateSound({ src: "./click.mp3" });

  return (
    <div className={styles.player}>
      <h3 className={styles.player_title}>{`Jugador ${numberPlayer}`}</h3>
      <input
        type="text"
        placeholder="Ingresa nombre"
        value={name}
        onClick={handleEffectClick}
        onChange={(event) => nameOnChange(event.target.value)}
      />
      <div className={styles.container_colors}>
        {colors.map((color) => (
          <div
            key={color}
            className={`${styles.colors} ${
              selectedColor === color ? styles.selected : ""
            }`}
            onClick={() => {
              handleEffectClick();
              colorOnClick(color);
            }}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Player;
