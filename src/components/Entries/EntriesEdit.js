import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance'; // Assuming axiosInstance is properly set up

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const EntriesEdit = () => {
  const query = useQuery();
  const { id } = query.get('id'); // Get the entry ID from the URL params
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch the entry data when the component mounts
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        console.log(id);
        const response = await axiosInstance.get(`/entries/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching entry:', error);
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
        content,
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
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button type="submit">Update Entry</button>
      </form>
    </div>
  );
};

export default EntriesEdit;
