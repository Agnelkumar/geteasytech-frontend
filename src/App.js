// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import AdminPortal from './pages/AdminPortal';
import UserPortal from './pages/UserPortal';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<AdminPortal />} />
      <Route path="/user" element={<UserPortal />} />
    </Routes>
  </Router>
);

export default App;