import React, { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
    // Tablero inicial
    const initialBoard = Array.from({ length: 6 }, () => new Array(7).fill(null));
    // Estado para la pantalla de inicio
    const [homeState, setHomeState] = useState({
        colors: ['red', 'blue', 'green', 'yellow', 'orange', 'purple'],
        namePlayerOne: sessionStorage.getItem('namePlayerOne') || '',
        namePlayerTwo: sessionStorage.getItem('namePlayerTwo') || '',
        selectedColorOne: sessionStorage.getItem('selectedColorOne') || '',
        selectedColorTwo: sessionStorage.getItem('selectedColorTwo') || '',
        errorColor: '',
        nameError: '',
        formError: '',
        isFirstStart: sessionStorage.getItem('isFirstStart') ? false : true,
    });
    // Estado para la pantalla de juego
    const [gameScreenState, setGameScreenState] = useState({
        board: JSON.parse(sessionStorage.getItem('currentBoard')) || Array.from({ length: 6 }, () => new Array(7).fill(null)),
        currentPlayer: sessionStorage.getItem('currentPlayer') || sessionStorage.getItem('namePlayerOne') || '',
        isHover: null,
        hoverColumn: null,
        winner: null,
        gameOver: false,
        victoriesPlayerOne: parseInt(sessionStorage.getItem('victoriesPlayerOne'), 10) || 0,
        victoriesPlayerTwo: parseInt(sessionStorage.getItem('victoriesPlayerTwo'), 10) || 0,
        winningBoard: JSON.parse(sessionStorage.getItem('winningBoard')) || null,
        isModalOpen: '',
    });

    // Estado para el footer / opciones
    const [footerState, setFooterState] = useState({
        musicIsActive: false,
        effectsIsActive: false,
        volumeMusic: 0.25,
        volumeEffects: 0,
        musicIsHovered: null,
        effectsIsHovered: null,
    });

    // Retorno los estados/setters agrupados
    return (
        <Context.Provider
            value={{
                // Estado de la pantalla de inicio
                homeState,
                setHomeState,
                // Estado de la pantalla de juego
                gameScreenState,
                setGameScreenState,
                // Tablero inicial
                initialBoard,
                // Estado del footer / opciones
                footerState,
                setFooterState,
            }}  
        >
            {children}
        </Context.Provider>
    );
};

export default Context;

