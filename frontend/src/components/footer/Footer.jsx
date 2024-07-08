import React, { useState } from 'react';
import styles from './Footer.module.css';
import MenuIcon from "@mui/icons-material/Menu";
import OpcionesModal from './opciones/OpcionesModal';

const Footer = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <button 
        className={styles.btn_opciones}
        onClick={() => {setIsOpen(!isOpen)}}
      >
        <MenuIcon />
        Opciones
      </button>
      <OpcionesModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </footer>
  )
}

export default Footer
