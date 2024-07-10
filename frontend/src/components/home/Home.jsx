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
    // selectedColorOne,
    // selectedColorTwo,
    // namePlayerOne,
    // setNamePlayerOne,
    // namePlayerTwo,
    // setNamePlayerTwo,
    // errorColor,
    // formError,
    // nameError,
    // isFirstStart,
    // setIsFirstStart,
    homeState,
    setHomeState,
    gameScreenState,
    setGameScreenState,
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
      onClose: () => {
        setHomeState((prevState) => ({
          ...prevState,
          isFirstStart: false
        }));
      },
      });
  }, []);

  useEffect(() => {
    sessionStorage.setItem('isFirstStart', JSON.stringify(homeState.isFirstStart));
  }, [homeState.isFirstStart]);

  return (
    <div className={styles.home_container}>
      {homeState.isFirstStart && (
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
            name={homeState.namePlayerOne}
            setName={(value) => {setHomeState((prevState) => ({
              ...prevState,
              namePlayerOne: value
            }))}}
            colorOnClick={handleColorOne}
            selectedColor={homeState.selectedColorOne}
          />

          <Player
            numberPlayer={"dos"}
            name={homeState.namePlayerTwo}
            setName={(value) => {setHomeState((prevState) => ({
              ...prevState,
              namePlayerTwo: value
            }))}}
            colorOnClick={handleColorTwo}
            selectedColor={homeState.selectedColorTwo}
          />
        </div>

        {homeState.errorColor && (
          <div className={styles.div_center}>
            <p className={styles.error}>{homeState.errorColor}</p>
          </div>
        )}
        {homeState.formError && (
          <div className={styles.div_center}>
            <p className={styles.error}>{homeState.formError}</p>
          </div>
        )}
        {homeState.nameError && (
          <div className={styles.div_center}>
            <p className={styles.error}>{homeState.nameError}</p>
          </div>
        )}

        <div className={styles.div_center}>
          <NavLink
            className={`${styles.btn_playGame} ${
              !isFormValid || !isNameValid || homeState.errorColor
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
