  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axiosInstance from '../../services/axiosInstance';
  import styles from './EntriesForm.module.css'; // Importing external CSS

  import BackArrow from '../Common/BackArrow.js';

  const EntriesCreate = () => {
    useEffect(() => {
      // Add a class to the body when the component mounts
      document.body.classList.add(styles["body-style"]);

      // Clean up by removing the class when the component unmounts
      return () => {
        document.body.classList.remove(styles["body-style"]);
      };
    }, []);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await axiosInstance.post('/entries/', { title, body });
        navigate('/entries');
      } catch (error) {
        setError('Failed to create entry. Please try again.');
      }
    };

    return (
      <div className={styles["form-container"]}>
        <BackArrow />
        <h2 className={styles["form-header"]}>New Entry</h2>
        {error && <p className={styles["error-message"]}>{error}</p>}
        
        <form className={styles["entry-form"]} onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="title">Title</label>
            <input
              className = {styles["form-title"]}
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="body">Content</label>
            <textarea
              className = {styles["form-body"]}
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles["submit-button"]}>Create</button>
        </form>
      </div>
    );
  };

  export default EntriesCreate;
