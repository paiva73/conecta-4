import React, { useContext } from 'react';
import styles from '../Tablero.module.css';
import { Ficha } from '../ficha/Ficha';
import Context from '../../../context/Context';

export const Celda = ({ valor, columna, fila, handleClick, handleEnterHover}) => {

  const { 
    isHover,
    hoverColumn, 
    jugadorActual,
    jugadorUnoName,
    colorSeleccionadoUno,
    colorSeleccionadoDos,
    isModalOpen,
    } = useContext(Context);
  // Verifico.
  // Que la fila actual sea la fila que tiene el hover.
  // Que la columna actual sea la columna que tiene el hover.
  const isHovered = isHover === fila && hoverColumn === columna;

  return (
    <div
    className={`${styles.celda}`}
      onClick={() => handleClick(columna)}
      onMouseEnter={() => {handleEnterHover(columna)}}
    >
      {isHovered && !isModalOpen &&  (valor === null) ? (
        <Ficha color={jugadorActual === jugadorUnoName ? `${colorSeleccionadoUno}_hover` : `${colorSeleccionadoDos}_hover`}/>
      ) : valor === 1 ? (
        <Ficha color={colorSeleccionadoUno} valor={valor} />
      ) : valor === 2 ? (
        <Ficha color={colorSeleccionadoDos} valor={valor} />
      ) : (
        valor
      )}
    </div>
  );
};