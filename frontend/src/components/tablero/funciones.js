import { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import Swal from 'sweetalert2';
import styles from './Tablero.module.css';

export const funciones = () => {
  // Traigo todas las variables a utilizar desde el context.
  const {
    tableroInicial,
    tablero,
    setTablero,
    jugadorActual,
    setJugadorActual,
    winner,
    setWinner,
    gameOver,
    setGameOver,
    victoriasJugadorUno,
    setVictoriasJugadorUno,
    victoriasJugadorDos,
    setVictoriasJugadorDos,
    setIsHover,
    setHoverColumn,
    hoverColumn,
    jugadorUnoName,
    jugadorDosName,
    colorSeleccionadoUno,
    setColorSeleccionadoUno,
    colorSeleccionadoDos,
    setColorSeleccionadoDos,
    errorColor,
    setErrorColor,
    setFormError,
    setNameError,
    tableroGanador,
    setTableroGanador
  } = useContext(Context);
  // Función para manejar el color seleccionado uno y el error.
  const handleColorUno = (color) => {
    if (colorSeleccionadoDos === color) {
      setColorSeleccionadoUno(color);
      setErrorColor('¡Este color ya fue elegido por el jugador dos!');
      return;
    }
    setColorSeleccionadoUno(color);
    setErrorColor('');
  };
  // Función para manejar el color seleccionado dos y el error.
  const handleColorDos = (color) => {
    if (colorSeleccionadoUno === color) {
      setColorSeleccionadoDos(color);
      setErrorColor('¡Este color ya fue elegido por el jugador uno!');
      return;
    }
    setColorSeleccionadoDos(color);
    setErrorColor('');
  };
  // Ver que todos los campos estén completados y que los nombres sean distintos.
  const isFormValid = colorSeleccionadoUno && colorSeleccionadoDos && jugadorUnoName && jugadorDosName;
  const isNameValid = ((!jugadorUnoName || !jugadorDosName) || (jugadorUnoName !== jugadorDosName));
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
        sessionStorage.setItem('nombreUno', jugadorUnoName);
        sessionStorage.setItem('nombreDos', jugadorDosName);
        sessionStorage.setItem('colorUno', colorSeleccionadoUno);
        sessionStorage.setItem('colorDos', colorSeleccionadoDos);

      } catch (error) {
        console.log(error);
      }
      setFormError('');
      setJugadorActual(jugadorUnoName);
    }
  };
  // useEffect para actualizar la cantidad de victorias en el storage
  useEffect(() => {
    try {
      sessionStorage.setItem('victoriasUno', victoriasJugadorUno);
      sessionStorage.setItem('victoriasDos', victoriasJugadorDos);
      sessionStorage.setItem('jugadorActual', jugadorActual);
    } catch (error) {
      console.log(error);
    }
  }, [victoriasJugadorUno, victoriasJugadorDos, jugadorActual]);
  // useEffect para vaciar el error de campos dinamicamente
  useEffect(() => {
    if (isFormValid) {
      setFormError('');
    }
  }, [colorSeleccionadoUno, colorSeleccionadoDos, jugadorUnoName, jugadorDosName, errorColor]);
  // useEffect mostrar el error de nombres dinamicamente
  useEffect(() => {
    if (((jugadorUnoName && jugadorDosName) && jugadorUnoName === jugadorDosName)) {
      setNameError('¡Los nombres deben ser distintos!');
    } else {
      setNameError('')
    }
  }, [jugadorUnoName, jugadorDosName])
  // Función para resetear el contador de victorias.
  const resetearContador = () => {
    setVictoriasJugadorUno(0);
    setVictoriasJugadorDos(0);
  };
  // Función para resetear el tablero.
  const resetearJuego = () => {
    setJugadorActual(jugadorUnoName);
    setTablero(tableroInicial);
    setWinner(null);
    setGameOver(false);
    try {
      sessionStorage.removeItem('tableroActual');
    } catch (error) {
      console.error(error);
    }
  };
  // Función para manejar el hover en la celda.
  const handleEnterHover = (columna) => {
    // Copia profunda del tablero, se copia la referencia a las celdas, no a las filas.
    // 'const tableroCopia = [...tablero]'.
    const tableroCopia = tablero.map((fila) => [...fila]);
    // Recorro la copia del tablero.
    // Cambio el valor de isHover por el índice de fila de la última celda vacía.
    // Cambio el valor hoverColumn, por el índice de la columna en la que me encuentro.
    for (let i = tableroCopia.length - 1; i >= 0; i--) {
      if (tableroCopia[i][columna] === null) {
        setIsHover(i);
        setHoverColumn(columna);
        return;
      }
    }
    setIsHover(null);
    setHoverColumn(null);
  };
  // Función para manejar el click en las celdas.
  const handleClick = (columna) => {
    if (winner || gameOver) return; 
    // Copia profunda del tablero, se copia la referencia a las celdas, no a las filas.
    // 'const tableroCopia = [...tablero]'.
    const tableroCopia = tablero.map((fila) => [...fila]);
    // Recorro la copia del tablero y cambio el valor de la última celda disponible por 1 o 2, dependiendo del jugador actual.
    for (let i = tableroCopia.length - 1; i >= 0; i--) {
      if (tableroCopia[i][columna] === null) {
        tableroCopia[i][columna] = jugadorActual === jugadorUnoName ? 1 : 2;
        setTablero(tableroCopia);
        handleEnterHover(columna);
        // Verifico si se cumple alguna condición de victoria.
        if (
          cuatroEnFila(tableroCopia) ||
          cuatroEnColumna(tableroCopia) ||
          cuatroDiagonalIzq(tableroCopia) ||
          cuatroDiagonalDer(tableroCopia)
        ) {
          setWinner(jugadorActual);
        } else {
          setJugadorActual(jugadorActual === jugadorUnoName ? jugadorDosName : jugadorUnoName);
          try {
            sessionStorage.setItem('tableroActual' ,JSON.stringify(tableroCopia));
          } catch (error) {
            console.log(error);
          }
        }
        //  Verifico si el juego termina en empate.
        if (isGameOver(tableroCopia)) {
          setGameOver(true);
        }
        return;
      }
    }
  };
  // Función para verificar si todas las celdas del tablero tienen un valor distinto a null.
  const isGameOver = (tablero) => {
    return tablero.flat().every((valorCelda) => valorCelda !== null);
  }
  // Función para verificar si hay 4 fichas del mismo jugador consecutivas en una fila.
  const cuatroEnFila = (tablero) => {
    const filas = tablero.length;
    const columnas = tablero[0].length;

    for (let fila = 0; fila < filas; fila++) {
      for (let columna = 0; columna <= columnas - 4; columna++) {
        const celda = tablero[fila][columna];
        if (
          celda
          &&
          celda === tablero[fila][columna + 1]
          &&
          celda === tablero[fila][columna + 2]
          &&
          celda === tablero[fila][columna + 3]
        ) {
          setWinner(jugadorActual);
          return;
        }
      }
    }
  }
  // Función para verificar si hay 4 fichas del mismo jugador consecutivas en una columna.
  const cuatroEnColumna = (tablero) => {
    const filas = tablero.length;
    const columnas = tablero[0].length;

    for (let fila = 0; fila <= filas - 4; fila++) {
      for (let columna = 0; columna <= columnas; columna++) {
        const celda = tablero[fila][columna];
        if (
          celda
          &&
          celda === tablero[fila + 1][columna]
          &&
          celda === tablero[fila + 2][columna]
          &&
          celda === tablero[fila + 3][columna]
        ) {
          setWinner(jugadorActual);
        }
      }
    }
  }
  // Función para verificar si hay 4 fichas del mismo jugador consecutivas en diagonal, de izquiera arriba a dercha abajo.
  const cuatroDiagonalIzq = (tablero) => {
    const filas = tablero.length;
    const columnas = tablero[0].length;

    for (let fila = 0; fila <= filas - 4; fila++) {
      for (let columna = 0; columna <= columnas - 4; columna++) {
        const celda = tablero[fila][columna];
        if (
          celda
          &&
          celda === tablero[fila + 1][columna + 1]
          &&
          celda === tablero[fila + 2][columna + 2]
          &&
          celda === tablero[fila + 3][columna + 3]
        ) {
          setWinner(jugadorActual);
          return;
        }
      }
    }
  }
  // Función para verificar si hay 4 fichas del mismo jugador consecutivas en diagonal, de izquiera abajo a derecha arriba.
  const cuatroDiagonalDer = (tablero) => {
    const filas = tablero.length;
    const columnas = tablero[0].length;

    for (let fila = 3; fila < filas; fila++) {
      for (let columna = 0; columna <= columnas - 4; columna++) {
        const celda = tablero[fila][columna];
        if (
          celda
          &&
          celda === tablero[fila - 1][columna + 1]
          &&
          celda === tablero[fila - 2][columna + 2]
          &&
          celda === tablero[fila - 3][columna + 3]
        ) {
          setWinner(jugadorActual);
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
  }, [tablero, jugadorActual]);
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
        resetearJuego();
      }, 1500);
    }
  }, [gameOver]);
  // useEffect para mostrar mensaje de ganador y resetear el juego.
  useEffect(() => {
    if (winner) {
      const colorClase = winner === jugadorUnoName ? colorSeleccionadoUno : colorSeleccionadoDos;

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
        setTableroGanador(tablero);
        sessionStorage.setItem('tableroGanador' ,JSON.stringify(tablero));
        resetearJuego();
      }, 1500);
      // Aumento el contador de victorias del jugador que gana la ronda.
      if (winner === jugadorUnoName) {
        setVictoriasJugadorUno(victoriasJugadorUno + 1);
      } else if (winner === jugadorDosName) {
        setVictoriasJugadorDos(victoriasJugadorDos + 1);
      }
    }
  }, [winner]);
  // Retorno las funciones.
  return ({
    resetearContador,
    resetearJuego,
    handleClick,
    isGameOver,
    cuatroEnFila,
    cuatroEnColumna,
    cuatroDiagonalIzq,
    cuatroDiagonalDer,
    handleEnterHover,
    handleColorUno,
    handleColorDos,
    handlePlayClick,
    isFormValid,
    isNameValid,
  });
};
