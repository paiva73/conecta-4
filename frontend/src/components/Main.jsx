import React from 'react';
import styles from '../App.module.css';
import { Route, Routes } from 'react-router-dom';
import { Tablero } from './tablero/Tablero';
import { Inicio } from './inicio/Inicio';
import { funciones } from './tablero/funciones';
import { RutaProtegida } from './RutaProtegida';

export const Main = () => {
  const {
    isFormValid,
    isNameValid,
  } = funciones();
  
    const nameUno = localStorage.getItem('nombreUno');
    const nameDos = localStorage.getItem('nombreDos');
    const colorUno = localStorage.getItem('colorUno');
    const colorDos = localStorage.getItem('colorDos');

  const esPermitida = nameUno && nameDos && colorUno && colorDos;

  return (
    <div className={styles.container}>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route 
          path='/tablero'
          element={
            <RutaProtegida esPermitida={esPermitida}>
              <Tablero />
            </RutaProtegida>
          } 
        />
      </Routes>
    </div>
  )
}
