import React, { useState } from 'react';
import styles from './Footer.module.css';
import MenuIcon from "@mui/icons-material/Menu";
import OpcionesModal from './opciones/OpcionesModal';
import useCreateSound from '../useCreateSound';

const Footer = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { handleEffectClick } = useCreateSound({src: './click.mp3'})

  return (
    <footer className={styles.footer}>
      <button 
        className={styles.btn_opciones}
        onClick={() => {
          handleEffectClick()
          setIsOpen(!isOpen)
        }}
      >
        <MenuIcon />
        Opciones
      </button>
      <OpcionesModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </footer>
  )
}

export default Footer
