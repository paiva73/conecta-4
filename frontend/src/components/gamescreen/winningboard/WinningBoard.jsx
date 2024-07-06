import React, { useContext } from 'react';
import styles from '../GameScreen.module.css';
import Context from '../../../context/Context';
import { Cell } from '../cell/Cell';

export const WinningBoard = ({ isOpen }) => {
    const {
        winningBoard
    } = useContext(Context);

    if (!isOpen) {
        return null;
    } else {
        return (
            <div className={styles.modal}>
                <div className={styles.board_container}>
                    <div className={styles.board}>
                        {winningBoard.map((row, indexRow) => {
                            return (
                                <div className={styles.column} key={indexRow}>
                                    {row.map((valueCell, indexColumn) => {
                                        return <Cell
                                            column={indexColumn}
                                            row={indexRow}
                                            key={indexColumn}
                                            valueCell={valueCell}
                                            handleEnterHover={() => {}}
                                        />
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );

    }
};
