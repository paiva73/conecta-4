import React, { useContext } from 'react';
import styles from '../Inicio.module.css';
import Context from '../../../context/Context';

const Player = ({numberPlayer, name, nameOnChange, colorOnClick, selectedColor}) => {

    const {
        colors,
      } = useContext(Context);

  return (
    <div className={styles.player}>
            <h3 className={styles.player_title}>{`Jugador ${numberPlayer}`}</h3>
            <input
              type="text"
              placeholder="Ingresa nombre"
              value={name}
              onChange={(event) => nameOnChange(event.target.value)}
            />
            <div className={styles.container_colors}>
              {colors.map((color) => (
                <div
                  key={color}
                  className={`${styles.colors} ${selectedColor === color ? styles.selected : ''}`}
                  onClick={() => colorOnClick(color)}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
  )
}

export default Player;



