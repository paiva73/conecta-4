import React, { useContext } from "react";
import { Celda } from "../celda/Celda";
import { funciones } from "../funciones";
import Context from "../../../context/Context";
import styles from '../GameScreen.module.css';

const Board = () => {
  const { tablero } = useContext(Context);

  const { handleClick, handleEnterHover } = funciones();

  return (
    <div className={styles.tablero}>
      {tablero.map((fila, indexFila) => {
        return (
          <div className={styles.columna} key={indexFila}>
            {fila.map((valor, indexColumna) => {
              return (
                <Celda
                  handleClick={handleClick}
                  columna={indexColumna}
                  fila={indexFila}
                  key={indexColumna}
                  valor={valor}
                  handleEnterHover={handleEnterHover}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
