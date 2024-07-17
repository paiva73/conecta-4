import { useContext, useEffect } from "react";
import Context from "../../context/Context";
import Swal from "sweetalert2";
import styles from "./GameScreen.module.css";
import boardFunctions from "./board/boardFunctions";
import useCreateSound from "../useCreateSound";

export const gameScreenFunctions = () => {
  const { gameScreenState, setGameScreenState, homeState } =
    useContext(Context);

  const { handleEffectClick } = useCreateSound({ src: "./victory.mp3" });
  const { resetBoard } = boardFunctions();
  // useEffect para actualizar la cantidad de victorias en el storage
  useEffect(() => {
    try {
      sessionStorage.setItem(
        "victoriesPlayerOne",
        gameScreenState.victoriesPlayerOne
      );
      sessionStorage.setItem(
        "victoriesPlayerTwo",
        gameScreenState.victoriesPlayerTwo
      );
      sessionStorage.setItem("currentPlayer", gameScreenState.currentPlayer);
    } catch (error) {
      console.error(error);
    }
  }, [
    gameScreenState.victoriesPlayerOne,
    gameScreenState.victoriesPlayerTwo,
    gameScreenState.currentPlayer,
  ]);
  // Función para resetear el contador de victorias.
  const resetCounter = () => {
    setGameScreenState((prevState) => ({
      ...prevState,
      victoriesPlayerOne: 0,
      victoriesPlayerTwo: 0,
    }));
  };
  // useEffect para mostrar mensaje de ganador y resetear el juego.
  useEffect(() => {
    if (gameScreenState.winner) {
      const colorClase =
        gameScreenState.winner === homeState.namePlayerOne
          ? homeState.selectedColorOne
          : homeState.selectedColorTwo;
      handleEffectClick();
      Swal.fire({
        title: `${gameScreenState.winner} ha ganado la ronda`,
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: {
          popup: `${styles.alert_container} ${
            styles[`alert_container_${colorClase}`]
          }`,
          title: styles.alerta_title,
        },
      });
      setTimeout(() => {
        setGameScreenState((prevState) => ({
          ...prevState,
          winningBoard: gameScreenState.board,
        }));
        sessionStorage.setItem(
          "winningBoard",
          JSON.stringify(gameScreenState.board)
        );
        resetBoard();
      }, 1500);
      // Aumento el contador de victorias del jugador que gana la ronda.
      if (gameScreenState.winner === homeState.namePlayerOne) {
        setGameScreenState((prevState) => ({
          ...prevState,
          victoriesPlayerOne: gameScreenState.victoriesPlayerOne + 1,
        }));
      } else if (gameScreenState.winner === homeState.namePlayerTwo) {
        setGameScreenState((prevState) => ({
          ...prevState,
          victoriesPlayerTwo: gameScreenState.victoriesPlayerTwo + 1,
        }));
      }
    }
  }, [gameScreenState.winner]);
  // Retorno las funciones.
  return {
    resetCounter,
  };
};
