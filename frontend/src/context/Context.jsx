import { createContext, useState, useEffect } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
    const tableroInicial = Array.from({ length: 6 }, () => new Array(7).fill(null));
    // Tablero
    const [tablero, setTablero] = useState(JSON.parse(sessionStorage.getItem('tableroActual')) || tableroInicial);
    const [jugadorActual, setJugadorActual] = useState(
        sessionStorage.getItem('jugadorActual')
        ||
        sessionStorage.getItem('nombreUno')
        ||
        '');
    const [isHover, setIsHover] = useState(null);
    const [hoverColumn, setHoverColumn] = useState(null);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [victoriasJugadorUno, setVictoriasJugadorUno] = useState(parseInt(sessionStorage.getItem('victoriasUno'), 10) || 0);
    const [victoriasJugadorDos, setVictoriasJugadorDos] = useState(parseInt(sessionStorage.getItem('victoriasDos'), 10) || 0);
    const [tableroGanador, setTableroGanador] = useState(JSON.parse(sessionStorage.getItem('tableroGanador')) || null);
    // Inicio
    const [jugadorUnoName, setJugadorUnoName] = useState(sessionStorage.getItem('nombreUno') || '');
    const [jugadorDosName, setJugadorDosName] = useState(sessionStorage.getItem('nombreDos') || '');
    const [colorSeleccionadoUno, setColorSeleccionadoUno] = useState(sessionStorage.getItem('colorUno') || '');
    const [colorSeleccionadoDos, setColorSeleccionadoDos] = useState(sessionStorage.getItem('colorDos') || '');
    const [errorColor, setErrorColor] = useState('');
    const [formError, setFormError] = useState('');
    const [nameError, setNameError] = useState('');
    const colores = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
    const[isModalOpen, setIsModalOpen] = useState('');
    // Retorno los estados/setters
    return (
        <Context.Provider
            value={{
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
                isHover,
                setIsHover,
                hoverColumn,
                setHoverColumn,
                jugadorUnoName,
                setJugadorUnoName,
                jugadorDosName,
                setJugadorDosName,
                colorSeleccionadoUno,
                setColorSeleccionadoUno,
                colorSeleccionadoDos,
                setColorSeleccionadoDos,
                errorColor,
                setErrorColor,
                formError,
                setFormError,
                nameError,
                setNameError,
                colores,
                tableroGanador,
                setTableroGanador,
                isModalOpen,
                setIsModalOpen,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default Context;
