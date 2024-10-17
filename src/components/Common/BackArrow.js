import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './BackArrow.module.css'; // Create a CSS file for styling

const BackArrow = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className={styles.backArrow} onClick={goBack}>
      <FontAwesomeIcon icon={faArrowLeft} size="2x" />
    </div>
  );
};

export default BackArrow;
