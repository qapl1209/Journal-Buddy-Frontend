import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

const EntriesList = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axiosInstance.get('/entries/');
        setEntries(response.data);
      } catch (error) {
        alert('Error fetching entries');
      }
    };
    fetchEntries();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/entries/edit?id=${id}`);
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
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/entries/create')}>Create Entry</button>
    </div>
  );
};

export default EntriesList;
