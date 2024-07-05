import React, { useContext, useEffect, useState } from 'react';
import styles from './Tablero.module.css';
import { Celda } from './celda/Celda';
import Context from '../../context/Context';
import { funciones } from './funciones';
import { NavLink } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { TableroGanador } from './tablero-ganador/TableroGanador';
import { IoMdCloseCircleOutline } from "react-icons/io";

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
    isModalOpen,
    setIsModalOpen,
    tableroGanador,
    setTableroGanador,
  } = useContext(Context);

  const {
    resetearContador,
    resetearJuego,
    handleClick,
    handleEnterHover,
  } = funciones();

  return (
    <div className={styles.game_container}>
      <img src="/wave2.svg" alt="" className={styles.svg} />
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
        <button className={styles.btn_control} onClick={resetearContador}>Resetear victorias</button>
        <button className={styles.btn_control} onClick={resetearJuego}>Resetear juego</button>
        <button className={styles.btn_control} onClick={() => {
          if (tableroGanador) {
            setIsModalOpen(true);
          } else {
            return null;
          }
        }}>Último tablero ganador</button>
        <TableroGanador isOpen={isModalOpen} />
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
          resetearJuego();
          resetearContador();
          setJugadorUnoName('');
          setJugadorDosName('');
          setColorSeleccionadoUno('');
          setColorSeleccionadoDos('');
          setTableroGanador(null);
          sessionStorage.clear();
        }
      }}><IoArrowBackCircleSharp size={'48px'} /> 
      Volver al inicio
      </NavLink>
      }
    </div>
  )
}
