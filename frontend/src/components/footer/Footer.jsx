import React, { useState } from 'react';
import styles from './Footer.module.css';
import MenuIcon from "@mui/icons-material/Menu";

const Footer = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.footer}>
      <button 
        className={styles.btn_opciones}
        onClick={() => {setIsOpen(!isOpen)}}
      >
        <MenuIcon />
        Opciones
      </button>
    </div>
  )
}

export default Footer
