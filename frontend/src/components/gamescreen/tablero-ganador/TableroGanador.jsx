import React, { useContext } from 'react';
import styles from '../GameScreen.module.css';
import Context from '../../../context/Context';
import { Celda } from '../celda/Celda';

export const TableroGanador = ({ isOpen }) => {
    const {
        winningBoard
    } = useContext(Context);

    if (!isOpen) {
        return null;
    } else {
        return (
            <div className={styles.modal}>
                <div className={styles.tablero_container}>
                    <div className={styles.tablero}>
                        {winningBoard.map((row, indexRow) => {
                            return (
                                <div className={styles.columna} key={indexRow}>
                                    {row.map((valueCell, indexColumn) => {
                                        return <Celda
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
