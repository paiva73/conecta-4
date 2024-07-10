import React, { useContext, useEffect } from "react";
import styles from "./Inicio.module.css";
import Context from "../../context/Context";
import { NavLink } from "react-router-dom";
import Player from "./player/Player";
import homeFunctions from "./homeFunctions";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
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
    isFirstStart,
    setIsFirstStart,
  } = useContext(Context);

  const {
    handleColorOne,
    handleColorTwo,
    handlePlayClick,
    isFormValid,
    isNameValid,
  } = homeFunctions();

  useEffect(() => {
    toast.info('¡Puedes activar el sonido desde el apartado de Opciones! ✨', {
      position: "top-right",
      autoClose: 4000,
      closeOnClick: true,
      draggable: true,
      theme: "dark",
      onClose: () => setIsFirstStart(false),
      });
  }, []);

  useEffect(() => {
    sessionStorage.setItem('isFirstStart', JSON.stringify(isFirstStart));
  }, [isFirstStart]);

  return (
    <div className={styles.home_container}>
      {isFirstStart && (
        <div>
          <ToastContainer />
        </div>
      )}
      <img src="/wave3.svg" alt="" className={styles.home_svg} />
      <h1 className={styles.title}>Conecta cuatro</h1>
      <div className={styles.container_info}>
        <div className={styles.players_container}>
          <Player
            numberPlayer={"uno"}
            name={namePlayerOne}
            nameOnChange={setNamePlayerOne}
            colorOnClick={handleColorOne}
            selectedColor={selectedColorOne}
          />

          <Player
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
            className={`${styles.btn_playGame} ${
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
      <Footer />
    </div>
  );
};
