import React, { useContext } from 'react';
import styles from '../App.module.css';
import { Route, Routes } from 'react-router-dom';
import { GameScreen } from './gamescreen/GameScreen';
import { ProtectedRoute } from './ProtectedRoute';
import Context from '../context/Context';
import { Home } from './home/Home';

export const Main = () => {
  const {
    isModalOpen,
  } = useContext(Context);
  
    const nameUno = sessionStorage.getItem('namePlayerOne');
    const nameDos = sessionStorage.getItem('namePlayerTwo');
    const colorOne = sessionStorage.getItem('selectedColorOne');
    const colorTwo = sessionStorage.getItem('selectedColorTwo');

  const isAllowed = nameUno && nameDos && colorOne && colorTwo;

  return (
    <div className={`${styles.container} ${isModalOpen ? styles.modal_open : ''}`}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route 
          path='/gamescreen'
          element={
            <ProtectedRoute isAllowed={isAllowed}>
              <GameScreen />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}
