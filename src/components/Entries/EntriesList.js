import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../utils/token'

const EntriesList = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axiosInstance.get('/entries/');
        setEntries(response.data);
      } catch (error) {
        // alert('Error fetching entries');
        console.log('Error fetching entries');
        navigate('/login');
      }
    };
    fetchEntries();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/entries/edit?id=${id}`);
  }

  const deleteEntry = async (id) => {
    try {
      await axiosInstance.delete(`/entries/${id}`);
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (error) {
      alert('Error deleting entry');
    }
  }

  const logoutAccount = async () => {
    try {
      await axiosInstance.delete('/auth/logout');
      clearToken();
      navigate('/login/');
    } catch (error) {
      alert('Error logging out');
    }
  }

  return (
    <div>
      <h2>Your Entries</h2>
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            <h3>{entry.title}</h3>
            <p>{entry.body}</p>
            <button onClick={() => handleEditClick(entry.id)}>Edit</button>
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/entries/create')}>Create Entry</button>
      <button onClick = {() => logoutAccount()}>Logout</button>
    </div>
  );
};

export default EntriesList;
