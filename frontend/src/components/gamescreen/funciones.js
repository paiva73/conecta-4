import { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import Swal from 'sweetalert2';
import styles from './GameScreen.module.css';

export const funciones = () => {
  // Traigo todas las variables a utilizar desde el context.
  const {
    namePlayerOne,
    namePlayerTwo,
    selectedColorOne,
    setSelectedColorOne,
    selectedColorTwo,
    setSelectedColorTwo,
    errorColor,
    setErrorColor,
    setFormError,
    setNameError,
    initialBoard,
    board,
    setBoard,
    setIsHover,
    hoverColumn,
    setHoverColumn,
    currentPlayer,
    setCurrentPlayer,
    winner,
    setWinner,
    gameOver,
    setGameOver,
    victoriesPlayerOne,
    setVictoriesPlayerOne,
    victoriesPlayerTwo,
    setVictoriesPlayerTwo,
    setWinningBoard
  } = useContext(Context);
  // Función para manejar el color seleccionado uno y el error.
  const handleColorOne = (color) => {
    if (selectedColorTwo === color) {
      setSelectedColorOne(color);
      setErrorColor('¡Este color ya fue elegido por el jugador dos!');
      return;
    }
    setSelectedColorOne(color);
    setErrorColor('');
  };
  // Función para manejar el color seleccionado dos y el error.
  const handleColorTwo = (color) => {
    if (selectedColorOne === color) {
      setSelectedColorTwo(color);
      setErrorColor('¡Este color ya fue elegido por el jugador uno!');
      return;
    }
    setSelectedColorTwo(color);
    setErrorColor('');
  };
  // Ver que todos los campos estén completados y que los nombres sean distintos.
  const isFormValid = selectedColorOne && selectedColorTwo && namePlayerOne && namePlayerTwo;
  const isNameValid = ((!namePlayerOne || !namePlayerTwo) || (namePlayerOne !== namePlayerTwo));
  // Manejar los errores de nombres y campos.
  const handlePlayClick = (e) => {
    if (errorColor || !isNameValid) {
      e.preventDefault();
    }
    if (!isFormValid) {
      e.preventDefault();
      setFormError('¡Debes completar todos los campos!');
    } else {
      try {
        sessionStorage.setItem('namePlayerOne', namePlayerOne);
        sessionStorage.setItem('namePlayerTwo', namePlayerTwo);
        sessionStorage.setItem('selectedColorOne', selectedColorOne);
        sessionStorage.setItem('selectedColorTwo', selectedColorTwo);

      } catch (error) {
        console.log(error);
      }
      setFormError('');
      setCurrentPlayer(namePlayerOne);
    }
  };
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
  // useEffect para vaciar el error de campos dinamicamente
  useEffect(() => {
    if (isFormValid) {
      setFormError('');
    }
  }, [selectedColorOne, selectedColorTwo, namePlayerOne, namePlayerTwo, errorColor]);
  // useEffect mostrar el error de nombres dinamicamente
  useEffect(() => {
    if (((namePlayerOne && namePlayerTwo) && namePlayerOne === namePlayerTwo)) {
      setNameError('¡Los nombres deben ser distintos!');
    } else {
      setNameError('')
    }
  }, [namePlayerOne, namePlayerTwo])
  // Función para resetear el contador de victorias.
  const resetCounter = () => {
    setVictoriesPlayerOne(0);
    setVictoriesPlayerTwo(0);
  };
  // Función para resetear el tablero.
  const resetBoard = () => {
    setCurrentPlayer(namePlayerOne);
    setBoard(initialBoard);
    setWinner(null);
    setGameOver(false);
    try {
      sessionStorage.removeItem('currentBoard');
    } catch (error) {
      console.error(error);
    }
  };
  // Función para manejar el hover en la celda.
  const handleEnterHover = (column) => {
    // Copia profunda del tablero, se copia la referencia a las celdas, no a las filas.
    // 'const copyBoard = [...board]'.
    const copyBoard = board.map((row) => [...row]);
    // Recorro la copia del tablero.
    // Cambio el valor de isHover por el índice de fila de la última celda vacía.
    // Cambio el valor hoverColumn, por el índice de la columna en la que me encuentro.
    for (let i = copyBoard.length - 1; i >= 0; i--) {
      if (copyBoard[i][column] === null) {
        setIsHover(i);
        setHoverColumn(column);
        return;
      }
    }
    setIsHover(null);
    setHoverColumn(null);
  };
  // Función para manejar el click en las celdas.
  const handleClick = (column) => {
    if (winner || gameOver) return; 
    // Copia profunda del tablero, se copia la referencia a las celdas, no a las filas.
    // 'const copyBoard = [...tablero]'.
    const copyBoard = board.map((row) => [...row]);
    // Recorro la copia del tablero y cambio el valor de la última celda disponible por 1 o 2, dependiendo del jugador actual.
    for (let i = copyBoard.length - 1; i >= 0; i--) {
      if (copyBoard[i][column] === null) {
        copyBoard[i][column] = currentPlayer === namePlayerOne ? 1 : 2;
        setBoard(copyBoard);
        handleEnterHover(column);
        // Verifico si se cumple alguna condición de victoria.
        if (
          checkWinnerInRow(copyBoard) ||
          checkWinnerInColumn(copyBoard) ||
          checkWinnerInDiagonalDown(copyBoard) ||
          checkWinnerInDiagonalUp(copyBoard)
        ) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(currentPlayer === namePlayerOne ? namePlayerTwo : namePlayerOne);
          try {
            sessionStorage.setItem('currentBoard' ,JSON.stringify(copyBoard));
          } catch (error) {
            console.log(error);
          }
        }
        //  Verifico si el juego termina en empate.
        if (isGameOver(copyBoard)) {
          setGameOver(true);
        }
        return;
      }
    }
  };
  // Función para verificar si todas las celdas del tablero tienen un valor distinto a null.
  const isGameOver = (board) => {
    return board.flat().every((valueCell) => valueCell !== null);
  }
  // Función para verificar si hay 4 fichas del mismo jugador consecutivas en una fila.
  const checkWinnerInRow = (board) => {
    const rows = board.length;
    const columns = board[0].length;

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column <= columns - 4; column++) {
        const celda = board[row][column];
        if (
          celda
          &&
          celda === board[row][column + 1]
          &&
          celda === board[row][column + 2]
          &&
          celda === board[row][column + 3]
        ) {
          setWinner(currentPlayer);
          return;
        }
      }
    }
  }
  // Función para verificar si hay 4 fichas del mismo jugador consecutivas en una column.
  const checkWinnerInColumn = (board) => {
    const rows = board.length;
    const columns = board[0].length;

    for (let row = 0; row <= rows - 4; row++) {
      for (let column = 0; column <= columns; column++) {
        const celda = board[row][column];
        if (
          celda
          &&
          celda === board[row + 1][column]
          &&
          celda === board[row + 2][column]
          &&
          celda === board[row + 3][column]
        ) {
          setWinner(currentPlayer);
        }
      }
    }
  }
  // Función para verificar si hay 4 fichas del mismo jugador consecutivas en diagonal, de izquiera arriba a dercha abajo.
  const checkWinnerInDiagonalDown = (board) => {
    const rows = board.length;
    const columns = board[0].length;

    for (let row = 0; row <= rows - 4; row++) {
      for (let column = 0; column <= columns - 4; column++) {
        const celda = board[row][column];
        if (
          celda
          &&
          celda === board[row + 1][column + 1]
          &&
          celda === board[row + 2][column + 2]
          &&
          celda === board[row + 3][column + 3]
        ) {
          setWinner(currentPlayer);
          return;
        }
      }
    }
  }
  // Función para verificar si hay 4 fichas del mismo jugador consecutivas en diagonal, de izquiera abajo a derecha arriba.
  const checkWinnerInDiagonalUp = (board) => {
    const rows = board.length;
    const columns = board[0].length;

    for (let row = 3; row < rows; row++) {
      for (let column = 0; column <= columns - 4; column++) {
        const celda = board[row][column];
        if (
          celda
          &&
          celda === board[row - 1][column + 1]
          &&
          celda === board[row - 2][column + 2]
          &&
          celda === board[row - 3][column + 3]
        ) {
          setWinner(currentPlayer);
          return;
        }
      }
    }
  }
  // useEffect para actualizar inmediatamente la ficha que se muestra luego de colocar una ficha.
  useEffect(() => {
    if (hoverColumn !== null) {
      handleEnterHover(hoverColumn);
    }
  }, [board, currentPlayer]);
  // useEffect para mostrar mensaje de empate y resetear el juego.
  useEffect(() => {
    if (gameOver) {
      Swal.fire({
        title: `La ronda ha quedado en empate`,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: {
          popup: `${styles.alerta_container} ${styles.alerta_empate}`,
          title: styles.alerta_title
        },
      })
      setTimeout(() => {
        resetBoard();
      }, 1500);
    }
  }, [gameOver]);
  // useEffect para mostrar mensaje de ganador y resetear el juego.
  useEffect(() => {
    if (winner) {
      const colorClase = winner === namePlayerOne ? selectedColorOne : selectedColorTwo;

      Swal.fire({
        title: `${winner} ha ganado la ronda`,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: {
          popup: `${styles.alerta_container} ${styles[`alerta_container_${colorClase}`]}`,
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
    resetBoard,
    handleClick,
    isGameOver,
    handleEnterHover,
    handleColorOne,
    handleColorTwo,
    handlePlayClick,
    isFormValid,
    isNameValid,
  });
};
