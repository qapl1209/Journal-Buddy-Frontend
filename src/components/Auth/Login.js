import React, { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { saveToken, saveRefreshToken } from '../../utils/token';
import { useNavigate, Link} from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login/', formData);
      // console.log(response);
      saveToken(response.data.access_token);
      saveRefreshToken(response.data.refresh_token);
      // console.log(response.data.access_token);
      navigate('/entries');
      console.log("successs");
    } catch (error) {
      alert('Login failed: ' + error.response.data.description);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
      <Link to="/register">Don't have an account yet?</Link>
    </form>
  );
};

export default Login;
