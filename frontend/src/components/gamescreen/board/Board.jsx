import React, { useContext } from "react";
import { Cell } from "../cell/Cell";
import Context from "../../../context/Context";
import styles from '../GameScreen.module.css';
import boardFunctions from "./boardFunctions";

const Board = () => {
  const { board } = useContext(Context);

  const { handleClick, handleEnterHover } = boardFunctions();

  return (
    <div className={styles.board}>
      {board.map((row, indexRow) => {
        return (
          <div className={styles.column} key={indexRow}>
            {row.map((valueCell, indexColumn) => {
              return (
                <Cell
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
