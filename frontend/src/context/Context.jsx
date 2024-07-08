import { createContext, useState, useEffect } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
    // Inicio
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
    const [namePlayerOne, setNamePlayerOne] = useState(sessionStorage.getItem('namePlayerOne') || '');
    const [namePlayerTwo, setNamePlayerTwo] = useState(sessionStorage.getItem('namePlayerTwo') || '');
    const [selectedColorOne, setSelectedColorOne] = useState(sessionStorage.getItem('selectedColorOne') || '');
    const [selectedColorTwo, setSelectedColorTwo] = useState(sessionStorage.getItem('selectedColorTwo') || '');
    const [errorColor, setErrorColor] = useState('');
    const [nameError, setNameError] = useState('');
    const [formError, setFormError] = useState('');
    // GameScreen
    const initialBoard = Array.from({ length: 6 }, () => new Array(7).fill(null));
    const [board, setBoard] = useState(JSON.parse(sessionStorage.getItem('currentBoard')) || initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState(
        sessionStorage.getItem('currentPlayer')
        ||
        sessionStorage.getItem('namePlayerOne')
        ||
        '');
    const [isHover, setIsHover] = useState(null);
    const [hoverColumn, setHoverColumn] = useState(null);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [victoriesPlayerOne, setVictoriesPlayerOne] = useState(parseInt(sessionStorage.getItem('victoriesPlayerOne'), 10) || 0);
    const [victoriesPlayerTwo, setVictoriesPlayerTwo] = useState(parseInt(sessionStorage.getItem('victoriesPlayerTwo'), 10) || 0);
    const [winningBoard, setWinningBoard] = useState(JSON.parse(sessionStorage.getItem('winningBoard')) || null);
    const [isModalOpen, setIsModalOpen] = useState('');
    // Footer / Opciones
    const [musicIsActive, setMusicIsActive] = useState(false);
    const [effectsIsActive, setEffectsIsActive] = useState(false);
    const [volumeMusic, setVolumeMusic] = useState(0.25);
    const [volumeEffects, setVolumeEffects] = useState(0.25);

    const [musicIsHovered, setMusicIsHovered] = useState(null);
    const [effectsIsHovered, setEffectsIsHovered] = useState(null);

    // Retorno los estados/setters
    return (
        <Context.Provider
            value={{
                // Inicio
                colors,
                namePlayerOne,
                setNamePlayerOne,
                namePlayerTwo,
                setNamePlayerTwo,
                selectedColorOne,
                setSelectedColorOne,
                selectedColorTwo,
                setSelectedColorTwo,
                errorColor,
                setErrorColor,
                formError,
                setFormError,
                nameError,
                setNameError,
                // GameScreen
                initialBoard,
                board,
                setBoard,
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
                isHover,
                setIsHover,
                hoverColumn,
                setHoverColumn,
                isModalOpen,
                setIsModalOpen,
                winningBoard,
                setWinningBoard,
                musicIsActive, setMusicIsActive,
                effectsIsActive, setEffectsIsActive,
                volumeMusic, setVolumeMusic,
                volumeEffects, setVolumeEffects,
                musicIsHovered, setMusicIsHovered,
                effectsIsHovered, setEffectsIsHovered
            }}  
        >
            {children}
        </Context.Provider>
    );
};

export default Context;
