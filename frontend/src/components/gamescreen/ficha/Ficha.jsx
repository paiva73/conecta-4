import React from 'react';
import styles from './Ficha.module.css';

export const Ficha = ({color}) => {
  return (
    <div className={`${styles.ficha} ${styles[color]}`}></div>
  );
};