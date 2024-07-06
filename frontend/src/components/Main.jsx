import React, { useContext } from 'react';
import styles from '../App.module.css';
import { Route, Routes } from 'react-router-dom';
import { GameScreen } from './gamescreen/GameScreen';
import { Inicio } from './inicio/Inicio';
import { RutaProtegida } from './RutaProtegida';
import Context from '../context/Context';

export const Main = () => {
  const {
    isModalOpen,
  } = useContext(Context);
  
    const nameUno = sessionStorage.getItem('nombreUno');
    const nameDos = sessionStorage.getItem('nombreDos');
    const colorUno = sessionStorage.getItem('colorUno');
    const colorDos = sessionStorage.getItem('colorDos');

  const esPermitida = nameUno && nameDos && colorUno && colorDos;

  return (
    <div className={`${styles.container} ${isModalOpen ? styles.modal_open : ''}`}>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route 
          path='/gamescreen'
          element={
            <RutaProtegida esPermitida={esPermitida}>
              <GameScreen />
            </RutaProtegida>
          } 
        />
      </Routes>
    </div>
  )
}
