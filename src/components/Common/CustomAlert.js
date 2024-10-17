// CustomAlert.js
import React, { useEffect } from 'react';
import styles from './CustomAlert.module.css'; // Import your CSS module

const CustomAlert = ({ message, onClose, fade }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Close alert after 5 seconds

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [onClose]);

  return (
    <div className={`${styles.alert} ${fade ? styles.fadeOut : ''}`}>
      {message}
      <button onClick={onClose} className={styles.closeButton}>X</button>
    </div>
  );
};

export default CustomAlert;
