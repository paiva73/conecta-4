import React, { useContext } from 'react';
import styles from '../GameScreen.module.css';
import { Ficha } from '../ficha/Ficha';
import Context from '../../../context/Context';

export const Celda = ({ valueCell, column, row, handleClick, handleEnterHover}) => {

  const { 
    isHover,
    hoverColumn, 
    currentPlayer,
    namePlayerOne,
    selectedColorOne,
    selectedColorTwo,
    isModalOpen,
    } = useContext(Context);
  // Verifico:
  // Que la fila actual sea la fila que tiene el hover.
  // Que la columna actual sea la columna que tiene el hover.
  const isHovered = isHover === row && hoverColumn === column;

  return (
    <div
      className={`${styles.celda}`}
      onClick={() => handleClick(column)}
      onMouseEnter={() => {handleEnterHover(column)}}
    >
      {isHovered && !isModalOpen &&  (valueCell === null) ? (
        <Ficha color={currentPlayer === namePlayerOne ? `${selectedColorOne}_hover` : `${selectedColorTwo}_hover`}/>
      ) : valueCell === 1 ? (
        <Ficha color={selectedColorOne} valueCell={valueCell} />
      ) : valueCell === 2 ? (
        <Ficha color={selectedColorTwo} valueCell={valueCell} />
      ) : (
        valueCell
      )}
    </div>
  );
};