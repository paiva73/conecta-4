import React, { useContext, useEffect } from 'react';
import styles from './Tablero.module.css';
import { Celda } from './celda/Celda';
import Context from '../../context/Context';
import { funciones } from './funciones';
import { NavLink } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";


export const Tablero = () => {
  const {
    tablero,
    jugadorActual,
    victoriasJugadorUno,
    victoriasJugadorDos,
    jugadorUnoName,
    setJugadorUnoName,
    jugadorDosName,
    setJugadorDosName,
    setColorSeleccionadoUno,
    setColorSeleccionadoDos,
  } = useContext(Context);
    
  const {
    resetearContador,
    resetearJuego,
    handleClick,
    handleEnterHover,
  } = funciones();

  return (
    <div className={styles.game_container}>
      <img src="/wave2.svg" alt="" className={styles.svg}/>
      <div className={styles.controles_container}>
        <h1 className={styles.titulo}>Juega {jugadorActual}</h1>
        <h2 className={styles.rondas}>Rondas ganadas</h2>
        <h4 >{jugadorUnoName} {victoriasJugadorUno}</h4>
        <h4 >{jugadorDosName} {victoriasJugadorDos}</h4>
      </div>
      <div className={styles.tablero_container}>
        <div className={styles.tablero}>
          {tablero.map((fila, indexFila) => {
            return (
              <div className={styles.columna} key={indexFila}>
                {fila.map((valor, indexColumna) => {
                  return <Celda
                    handleClick={handleClick}
                    columna={indexColumna}
                    fila={indexFila}
                    key={indexColumna}
                    valor={valor}
                    handleEnterHover={handleEnterHover}
                  />
                })}
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.controles_container}>
        <button onClick={resetearContador}>Resetear victorias</button>
        <button onClick={resetearJuego}>Resetear juego</button>
      </div>
      <NavLink to={'/'} className={styles.btn_volver} onClick={() => {
        resetearJuego();
        resetearContador();
        setJugadorUnoName('');
        setJugadorDosName('');
        setColorSeleccionadoUno('');
        setColorSeleccionadoDos('');
        localStorage.clear();
      }}><IoArrowBackCircleSharp size={'48px'}/> Volver al inicio</NavLink>
    </div>
  )
}
