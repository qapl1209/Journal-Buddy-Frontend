import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import CustomAlert from '../Common/CustomAlert'; // Adjust the path as needed
import styles from './UserForm.module.css'; // Import css modules stylesheet as styles

const Register = () => {
  useEffect(() => {
    // Add a class to the body when the component mounts
    document.body.classList.add(styles["body-style"]);

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove(styles["body-style"]);
    };
  }, []);

  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/auth/register/', formData);
      setError('Registration successful');
      setShowAlert(true);
      setTimeout(() => {
        navigate('/login/');
      }, 2000); // Navigate after 2 seconds
    } catch (error) {
      setError(error.response.data.msg);
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className={styles["form-container"]}>
      {showAlert && <CustomAlert message={error} onClose={closeAlert} />}
      <form onSubmit={handleSubmit}>
        <h2 className={styles["form-header"]}>Register</h2>
        <div className={styles["form-group"]}>
          <input className={styles["form-input"]} name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        </div>
        <div className={styles["form-group"]}>
          <input className={styles["form-input"]} name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        </div>
        <div className={styles["form-group"]}>
          <input className={styles["form-input"]} name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        </div>
        <div className={styles["form-group"]}>
          <button type="submit" className={styles["submit-button"]}>Register</button>
        </div>
        <Link to="/login" className={styles["redirect-link"]}>Already have an account?</Link>
      </form>
    </div>
  );
};

export default Register;
