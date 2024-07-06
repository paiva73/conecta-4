import React, { useContext } from 'react';
import styles from '../GameScreen.module.css';
import Context from '../../../context/Context';
import { Celda } from '../celda/Celda';

export const TableroGanador = ({ isOpen }) => {
    const {
        tableroGanador
    } = useContext(Context);

    if (!isOpen) {
        return null;
    } else {
        return (
            <div className={styles.modal}>
                <div className={styles.tablero_container}>
                    <div className={styles.tablero}>
                        {tableroGanador.map((fila, indexFila) => {
                            return (
                                <div className={styles.columna} key={indexFila}>
                                    {fila.map((valor, indexColumna) => {
                                        return <Celda
                                            columna={indexColumna}
                                            fila={indexFila}
                                            key={indexColumna}
                                            valor={valor}
                                            handleEnterHover={() => { }}
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
