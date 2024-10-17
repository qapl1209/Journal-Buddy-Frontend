import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { saveToken, saveRefreshToken } from '../../utils/token';
import { useNavigate, Link } from 'react-router-dom';
import CustomAlert from '../Common/CustomAlert'; // Adjust the path as needed
import styles from './UserForm.module.css'; // Import css modules stylesheet as styles

const Login = () => {
  useEffect(() => {
    // Add a class to the body when the component mounts
    document.body.classList.add(styles["body-style"]);

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove(styles["body-style"]);
    };
  }, []);
  
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [fade, setFade] = useState(false); // New fade state
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login/', formData);
      saveToken(response.data.access_token);
      saveRefreshToken(response.data.refresh_token);
      navigate('/entries');
      console.log("success");
    } catch (error) {
      setError('Login failed: ' + error.response.data.description);
      setShowAlert(true);
      setFade(false); // Reset fade state
     
      // Automatically hide the alert after 5 seconds with fade out
      setTimeout(() => {
        setFade(true); // Trigger fade out
        setTimeout(() => {
          setShowAlert(false); // Finally hide alert after fade out
        }, 500); // Match the duration of the fade-out transition
      }, 5000);
    }
  };

  return (
    <div className={styles["form-container"]}>
      {showAlert && <CustomAlert message={error} onClose={() => setShowAlert(false)} fade={fade} />}
      <form onSubmit={handleSubmit}>
        <h2 className={styles["form-header"]}>Login</h2>
        <div className={styles["form-group"]}>
          <input className={styles["form-input"]} name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        </div>
        <div className={styles["form-group"]}>
          <input className={styles["form-input"]} name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        </div>
        <div className={styles["form-group"]}>
          <button type="submit" className={styles["submit-button"]}>Login</button>
        </div>
        <Link to="/register" className={styles["redirect-link"]}>Don't have an account yet?</Link>
      </form>
    </div>
  );
};

export default Login;
