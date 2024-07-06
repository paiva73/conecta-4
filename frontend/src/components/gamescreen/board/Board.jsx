import React, { useContext } from "react";
import { Celda } from "../celda/Celda";
import { funciones } from "../funciones";
import Context from "../../../context/Context";
import styles from '../GameScreen.module.css';

const Board = () => {
  const { board } = useContext(Context);

  const { handleClick, handleEnterHover } = funciones();

  return (
    <div className={styles.tablero}>
      {board.map((row, indexRow) => {
        return (
          <div className={styles.columna} key={indexRow}>
            {row.map((valueCell, indexColumn) => {
              return (
                <Celda
                  handleClick={handleClick}
                  column={indexColumn}
                  row={indexRow}
                  key={indexColumn}
                  valueCell={valueCell}
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
