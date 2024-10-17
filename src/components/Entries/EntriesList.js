import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../utils/token';
import styles from './EntriesList.module.css'; // Importing external CSS

const EntriesList = () => {
  useEffect(() => {
    // Add a class to the body when the component mounts
    document.body.classList.add(styles["body-style"]);

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove(styles["body-style"]);
    };
  }, []);

  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axiosInstance.get('/entries/');
        setEntries(response.data);
      } catch (error) {
        console.log('Error fetching entries');
        navigate('/login');
      }
    };
    fetchEntries();
  });

  const handleEditClick = (id) => {
    navigate(`/entries/edit?id=${id}`);
  };

  const deleteEntry = async (id) => {
    try {
      await axiosInstance.delete(`/entries/${id}`);
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (error) {
      alert('Error deleting entry');
    }
  };

  const logoutAccount = async () => {
    try {
      await axiosInstance.delete('/auth/logout');
      clearToken();
      navigate('/login/');
    } catch (error) {
      alert('Error logging out');
    }
  };

  return (
    <div className={styles["entries-container"]}>
      <h2>Your Entries</h2>
      <div className={styles["actions"]}>
        <button className={`${styles["btn"]} ${styles["create-btn"]}`} onClick={() => navigate('/entries/create')}>Create Entry</button>
        <button className={`${styles["btn"]} ${styles["logout-btn"]}`} onClick={() => logoutAccount()}>Logout</button>
      </div>
      <ul className={styles["entries-list"]}>
        {entries.map((entry) => (
          <li key={entry.id} className={styles["entry-item"]}>
            <h3>{entry.title}</h3>
            <p>{entry.body}</p>
            <div className={styles["entry-actions"]}>
              <button className={`${styles["btn"]} ${styles["edit-btn"]}`} onClick={() => handleEditClick(entry.id)}>Edit</button>
              <button className={`${styles["btn"]} ${styles["delete-btn"]}`} onClick={() => deleteEntry(entry.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntriesList;
