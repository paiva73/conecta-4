import React, { useContext } from "react";
import styles from "./Inicio.module.css";
import Context from "../../context/Context";
import { NavLink } from "react-router-dom";
import { funciones } from "../gamescreen/funciones";
import Jugador from "./jugador/Jugador";

export const Inicio = () => {
  const {
    handleColorOne,
    handleColorTwo,
    handlePlayClick,
    isFormValid,
    isNameValid,
  } = funciones();

  const {
    selectedColorOne,
    selectedColorTwo,
    namePlayerOne,
    setNamePlayerOne,
    namePlayerTwo,
    setNamePlayerTwo,
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
          <Jugador
            numberPlayer={"uno"}
            name={namePlayerOne}
            nameOnChange={setNamePlayerOne}
            colorOnClick={handleColorOne}
            selectedColor={selectedColorOne}
          />

          <Jugador
            numberPlayer={"dos"}
            name={namePlayerTwo}
            nameOnChange={setNamePlayerTwo}
            colorOnClick={handleColorTwo}
            selectedColor={selectedColorTwo}
          />
        </div>

        {errorColor && (
          <div className={styles.div_center}>
            <p className={styles.error}>{errorColor}</p>
          </div>
        )}
        {formError && (
          <div className={styles.div_center}>
            <p className={styles.error}>{formError}</p>
          </div>
        )}
        {nameError && (
          <div className={styles.div_center}>
            <p className={styles.error}>{nameError}</p>
          </div>
        )}

        <div className={styles.div_center}>
          <NavLink
            className={`${styles.btn_jugar} ${
              !isFormValid || !isNameValid || errorColor
                ? styles.btn_disabled
                : styles.btn_active
            }`}
            onClick={handlePlayClick}
            to={"/gamescreen"}
          >
            <span>¡A jugar!</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
