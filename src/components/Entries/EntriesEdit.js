import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance'; // Assuming axiosInstance is properly set up

const EntriesEdit = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get('id');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [lock, setLocked] = React.useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = () => {
    setLocked(!lock);
  };

  // Fetch the entry data when the component mounts
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axiosInstance.get(`/entries/${id}`);
        console.log(response.data);
        setTitle(response.data.title);
        setBody(response.data.body);
      } catch (error) {
        // console.error('Error fetching entry:', error);
        setError('Failed to load the entry. Please try again.');
      }
    };

    fetchEntry();
  }, [id]);

  // Handle form submission for updating the entry
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send PUT request to update the entry
      await axiosInstance.put(`/entries/${id}`, {
        title,
        body,
        lock,
      });

      // Redirect to entries list after successful update
      navigate('/entries');
    } catch (error) {
      console.error('Error updating entry:', error);
      setError('Failed to update the entry. Please try again.');
    }
  };

  return (
    <div>
      <h1>Edit Entry</h1>
      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Edit entry form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="body">Content</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <div>
          <label> Lock?
            <input
              type="checkbox"
              lock={lock}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Update Entry</button>
      </form>
    </div>
  );
};

export default EntriesEdit;
