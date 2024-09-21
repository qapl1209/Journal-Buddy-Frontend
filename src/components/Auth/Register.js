import React, { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });

  const handleChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/auth/register/', formData);
      alert('Registration successful');
    } catch (error) {
      alert('Error: ' + error.response.data.description);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;