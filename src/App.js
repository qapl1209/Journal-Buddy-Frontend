import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EntriesList from './components/Entries/EntriesList';
import EntriesEdit from './components/Entries/EntriesEdit'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/entries" element={<EntriesList />} />
        <Route path="/entries/edit" element={<EntriesEdit />}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;