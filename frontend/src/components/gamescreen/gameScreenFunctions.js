import { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import Swal from 'sweetalert2';
import styles from './GameScreen.module.css';
import boardFunctions from './board/boardFunctions';
import useCreateSound from '../useCreateSound';

export const gameScreenFunctions = () => {
  // Traigo todas las variables a utilizar desde el context.
  const {
    namePlayerOne,
    namePlayerTwo,
    selectedColorOne,
    selectedColorTwo,
    board,
    currentPlayer,
    winner,
    victoriesPlayerOne,
    setVictoriesPlayerOne,
    victoriesPlayerTwo,
    setVictoriesPlayerTwo,
    setWinningBoard
  } = useContext(Context);

  const { handleEffectClick } = useCreateSound({src: './victory.mp3'})
  const {
    resetBoard
  } = boardFunctions();
  // useEffect para actualizar la cantidad de victorias en el storage
  useEffect(() => {
    try {
      sessionStorage.setItem('victoriesPlayerOne', victoriesPlayerOne);
      sessionStorage.setItem('victoriesPlayerTwo', victoriesPlayerTwo);
      sessionStorage.setItem('currentPlayer', currentPlayer);
    } catch (error) {
      console.error(error);
    }
  }, [victoriesPlayerOne, victoriesPlayerTwo, currentPlayer]);
  // Función para resetear el contador de victorias.
  const resetCounter = () => {
    setVictoriesPlayerOne(0);
    setVictoriesPlayerTwo(0);
  };
  // useEffect para mostrar mensaje de ganador y resetear el juego.
  useEffect(() => {
    if (winner) {
      const colorClase = winner === namePlayerOne ? selectedColorOne : selectedColorTwo;
      handleEffectClick()
      Swal.fire({
        title: `${winner} ha ganado la ronda`,
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: {
          popup: `${styles.alert_container} ${styles[`alert_container_${colorClase}`]}`,
          title: styles.alerta_title,
        },
      })
      setTimeout(() => {    
        setWinningBoard(board);
        sessionStorage.setItem('winningBoard' ,JSON.stringify(board));
        resetBoard();
      }, 1500);
      // Aumento el contador de victorias del jugador que gana la ronda.
      if (winner === namePlayerOne) {
        setVictoriesPlayerOne(victoriesPlayerOne + 1);
      } else if (winner === namePlayerTwo) {
        setVictoriesPlayerTwo(victoriesPlayerTwo + 1);
      }
    }
  }, [winner]);
  // Retorno las funciones.
  return ({
    resetCounter,
  });
};
