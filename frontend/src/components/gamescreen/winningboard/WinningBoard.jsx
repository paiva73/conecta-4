import React, { useContext } from 'react';
import styles from '../GameScreen.module.css';
import Context from '../../../context/Context';
import { Cell } from '../cell/Cell';
import useCreateSound from '../../useCreateSound';

export const WinningBoard = ({ isOpen, setIsOpen }) => {
    const {
        winningBoard
    } = useContext(Context);

    const { handleEffectClick } = useCreateSound({src: './click.mp3'})

    if (!isOpen) {
        return null;
    } else {
        return (
            <div className={styles.modal}
                onClick={() => {
                    handleEffectClick();
                    setIsOpen(false);
                }}
            >
                <div className={styles.board_container}>
                    <div className={styles.board} onClick={(e) => e.stopPropagation()}>
                        {winningBoard.map((row, indexRow) => {
                            return (
                                <div className={styles.column} key={indexRow}>
                                    {row.map((valueCell, indexColumn) => {
                                        return <Cell
                                            column={indexColumn}
                                            row={indexRow}
                                            key={indexColumn}
                                            valueCell={valueCell}
                                            handleClick={() => {}}
                                            handleEnterHover={() => {}}
                                            handleEffectClick={() => {}}
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
