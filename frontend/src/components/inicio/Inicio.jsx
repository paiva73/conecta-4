import React, { useContext } from 'react';
import styles from './Inicio.module.css';
import Context from '../../context/Context';
import { NavLink } from 'react-router-dom';
import { funciones } from '../tablero/funciones';

export const Inicio = () => {

  const {
    handleColorUno,
    handleColorDos,
    handlePlayClick,
    isFormValid,
    isNameValid,
  } = funciones();

  const {
    colores,
    colorSeleccionadoUno,
    colorSeleccionadoDos,
    jugadorUnoName,
    setJugadorUnoName,
    jugadorDosName,
    setJugadorDosName,
    errorColor,
    formError,
    nameError,
  } = useContext(Context);

  return (
    <div className={styles.container_inicio}>
      <img src="/wave3.svg" alt="" className={styles.svg} />
      <h1 className={styles.title}>Conecta cuatro</h1>
      <div className={styles.container_info}>
        <div className={styles.container_jugadores}>

          <div className={styles.jugador}>
            <h3>Jugador uno</h3>
            <input
              type="text"
              placeholder="Ingresa nombre"
              value={jugadorUnoName}
              onChange={(event) => setJugadorUnoName(event.target.value)}
            />
            <div className={styles.container_colors}>
              {colores.map((color) => (
                <div
                  key={color}
                  className={`${styles.colors} ${colorSeleccionadoUno === color ? styles.selected : ''}`}
                  onClick={() => handleColorUno(color)}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          <div className={styles.jugador}>
            <h3>Jugador dos</h3>
            <input
              type="text"
              placeholder="Ingresa nombre"
              value={jugadorDosName}
              onChange={(event) => setJugadorDosName(event.target.value)}
            />
            <div className={styles.container_colors}>
              {colores.map((color) => (
                <div
                  key={color}
                  className={`${styles.colors} ${colorSeleccionadoDos === color ? styles.selected : ''}`}
                  onClick={() => handleColorDos(color)}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {errorColor && <div className={styles.div_center}><p className={styles.error}>{errorColor}</p></div>}
        {formError && <div className={styles.div_center}><p className={styles.error}>{formError}</p></div>}
        {nameError && <div className={styles.div_center}><p className={styles.error}>{nameError}</p></div>}

        <div className={styles.div_center}>
          <NavLink
            className={`${styles.btn_jugar} ${!isFormValid || !isNameValid || errorColor
              ?
              styles.btn_disabled
              :
              styles.btn_active}`}
            onClick={handlePlayClick}
            to={'/tablero'}
          >
           <span>¡A jugar!</span>
          </NavLink>
        </div>

      </div>
    </div>
  );
};