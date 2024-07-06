import React from 'react';
import styles from './Ficha.module.css';

export const Cell = ({color}) => {
  return (
    <div className={`${styles.ficha} ${styles[color]}`}></div>
  );
};