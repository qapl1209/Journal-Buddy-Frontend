import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EntriesList from './components/Entries/EntriesList';
import EntriesEdit from './components/Entries/EntriesEdit'
import EntriesCreate from './components/Entries/EntriesCreate'
import LogoutListener from './components/Listeners/LogOutListener';

const App = () => {
  return (
    <Router>
      <LogoutListener />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/entries" element={<EntriesList />} />
        <Route path="/entries/edit" element={<EntriesEdit />}/>
        <Route path="/entries/create" element={<EntriesCreate />}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;