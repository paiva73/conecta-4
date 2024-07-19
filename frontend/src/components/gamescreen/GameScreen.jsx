import React, { useContext, useEffect, useState } from "react";
import styles from "./GameScreen.module.css";
import Context from "../../context/Context";
import { gameScreenFunctions } from "./gameScreenFunctions";
import { NavLink } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { WinningBoard } from "./winningboard/WinningBoard";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Board from "./board/Board";
import boardFunctions from "./board/boardFunctions";
import Footer from "../footer/Footer";
import useCreateSound from "../useCreateSound";

export const GameScreen = () => {
  const { gameScreenState, setGameScreenState, homeState, setHomeState } =
    useContext(Context);

  const { handleEffectClick } = useCreateSound({ src: "./click.mp3" });

  const { resetCounter } = gameScreenFunctions();

  const { resetBoard } = boardFunctions();

  return (
    <div className={styles.game_container}>
      <img src="/wave2.svg" alt="" className={styles.gameScreen_svg} />
      <div className={styles.controls_container}>
        <h1 className={styles.currentPlayer}>
          Juega {gameScreenState.currentPlayer}
        </h1>
        <h2 className={styles.rounds}>Rondas ganadas</h2>
        <h4>
          {homeState.namePlayerOne} {gameScreenState.victoriesPlayerOne}
        </h4>
        <h4>
          {homeState.namePlayerTwo} {gameScreenState.victoriesPlayerTwo}
        </h4>
      </div>

      <div className={styles.board_container}>
        <Board />
      </div>

      <div className={styles.controls_container}>
        <button
          className={styles.btn_control}
          onClick={() => {
            resetCounter();
            handleEffectClick();
          }}
        >
          Resetear victorias
        </button>
        <button
          className={styles.btn_control}
          onClick={() => {
            resetBoard();
            handleEffectClick();
          }}
        >
          Resetear tablero
        </button>
        <button
          className={styles.btn_control}
          onClick={() => {
            handleEffectClick();
            if (gameScreenState.winningBoard) {
              setGameScreenState((prevState) => ({
                ...prevState,
                isModalOpen: true,
              }));
            } else {
              return null;
            }
          }}
        >
          Último tablero ganador
        </button>
        <WinningBoard />
      </div>
      {gameScreenState.isModalOpen ? (
        <button
          onClick={() => {
            handleEffectClick();
            setGameScreenState((prevState) => ({
              ...prevState,
              isModalOpen: false,
            }));
          }}
          className={`${styles.btn_back} ${styles.btn_closeModal}`}
        >
          <IoMdCloseCircleOutline size={48} />
          Cerrar tablero
        </button>
      ) : (
        <NavLink
          to={"/"}
          className={styles.btn_back}
          onClick={() => {
            handleEffectClick();
            if (gameScreenState.isModalOpen) {
              setGameScreenState((prevState) => ({
                ...prevState,
                isModalOpen: false,
              }));
            } else {
              resetBoard();
              resetCounter();
              setHomeState((prevState) => ({
                ...prevState,
                namePlayerOne: "",
                namePlayerTwo: "",
                selectedColorOne: "",
                selectedColorTwo: "",
              }));
              setGameScreenState((prevState) => ({
                ...prevState,
                winningBoard: null,
              }));
              sessionStorage.clear();
            }
          }}
        >
          <IoArrowBackCircleSharp size={"48px"} />
          Volver al inicio
        </NavLink>
      )}
      <Footer />
    </div>
  );
};
