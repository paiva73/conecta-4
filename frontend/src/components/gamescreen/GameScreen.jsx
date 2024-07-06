import React, { useContext, useEffect, useState } from 'react';
import styles from './GameScreen.module.css';
import Context from '../../context/Context';
import { gameScreenFunctions } from './gameScreenFunctions';
import { NavLink } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { WinningBoard } from './winningboard/WinningBoard';
import { IoMdCloseCircleOutline } from "react-icons/io";
import Board from './board/Board';
import boardFunctions from './board/boardFunctions';

export const GameScreen = () => {
  const {
    currentPlayer,
    victoriesPlayerOne,
    victoriesPlayerTwo,
    namePlayerOne,
    setNamePlayerOne,
    namePlayerTwo,
    setNamePlayerTwo,
    setSelectedColorOne,
    setSelectedColorTwo,
    isModalOpen,
    setIsModalOpen,
    winningBoard,
    setWinningBoard,
  } = useContext(Context);

  const {
    resetCounter,
  } = gameScreenFunctions();

  const {
    resetBoard,
  } = boardFunctions();

  return (
    <div className={styles.game_container}>
      <img src="/wave2.svg" alt="" className={styles.svg} />
      <div className={styles.controles_container}>
        <h1 className={styles.titulo}>Juega {currentPlayer}</h1>
        <h2 className={styles.rondas}>Rondas ganadas</h2>
        <h4 >{namePlayerOne} {victoriesPlayerOne}</h4>
        <h4 >{namePlayerTwo} {victoriesPlayerTwo}</h4>
      </div>
      
      <div className={styles.tablero_container}>
        <Board />
      </div>

      <div className={styles.controles_container}>
        <button className={styles.btn_control} onClick={resetCounter}>Resetear victorias</button>
        <button className={styles.btn_control} onClick={resetBoard}>Resetear tablero</button>
        <button className={styles.btn_control} onClick={() => {
          if (winningBoard) {
            setIsModalOpen(true);
          } else {
            return null;
          }
        }}>Último tablero ganador</button>
        <WinningBoard isOpen={isModalOpen} />
      </div>
      {isModalOpen 
      ?
      <button onClick={() => setIsModalOpen(false)} className={`${styles.btn_volver} ${styles.btn_closeModal}`}>
        <IoMdCloseCircleOutline size={48}/>
        Cerrar tablero
      </button>
      :
      <NavLink to={'/'} className={styles.btn_volver} onClick={() => {
        if (isModalOpen) {
          setIsModalOpen(false);
        } else {
          resetBoard();
          resetCounter();
          setNamePlayerOne('');
          setNamePlayerTwo('');
          setSelectedColorOne('');
          setSelectedColorTwo('');
          setWinningBoard(null);
          sessionStorage.clear();
        }
      }}><IoArrowBackCircleSharp size={'48px'} /> 
      Volver al inicio
      </NavLink>
      }
    </div>
  )
}
