import React, { useContext } from "react";
import { Cell } from "../cell/Cell";
import Context from "../../../context/Context";
import styles from '../GameScreen.module.css';
import boardFunctions from "./boardFunctions";
import useCreateSound from "../../useCreateSound";

const Board = () => {
  const  { gameScreenState } = useContext(Context);

  const { handleClick, handleEnterHover } = boardFunctions();

  const { handleEffectClick } = useCreateSound({src: './ficha.wav'})

  return (
    <div className={styles.board}>
      {gameScreenState.board.map((row, indexRow) => {
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
                  handleEffectClick={handleEffectClick}
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
