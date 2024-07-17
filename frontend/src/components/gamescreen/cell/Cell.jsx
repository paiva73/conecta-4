import React, { useContext, useRef, useEffect } from 'react';
import styles from '../GameScreen.module.css';
import { Piece } from '../piece/Piece';
import Context from '../../../context/Context';

export const Cell = ({ valueCell, column, row, handleClick, handleEnterHover, handleEffectClick}) => {

  // const { 
  //   isHover,
  //   hoverColumn, 
  //   currentPlayer,
  //   namePlayerOne,
  //   selectedColorOne,
  //   selectedColorTwo,
  //   isModalOpen,
  //   } = useContext(Context);

  const { gameScreenState, homeState } = useContext(Context);

  // Verifico:
  // Que la fila actual sea la fila que tiene el hover.
  // Que la columna actual sea la columna que tiene el hover.
  const isHovered = gameScreenState.isHover === row && gameScreenState.hoverColumn === column;
  // sonido de ficha

  return (
    <div
      className={`${styles.cell}`}
      onClick={() => {
        handleEffectClick();
        handleClick(column);
      }}
      onMouseEnter={() => {handleEnterHover(column)}}
    >
      {isHovered && !gameScreenState.isModalOpen &&  (valueCell === null) ? (
        <Piece color={gameScreenState.currentPlayer === homeState.namePlayerOne ? `${homeState.selectedColorOne}_hover` : `${homeState.selectedColorTwo}_hover`}/>
      ) : valueCell === 1 ? (
        <Piece color={homeState.selectedColorOne} valueCell={valueCell} />
      ) : valueCell === 2 ? (
        <Piece color={homeState.selectedColorTwo} valueCell={valueCell} />
      ) : (
        valueCell
      )}
    </div>
  );
};