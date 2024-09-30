import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

const App = () => {
  const [user, setUser] = useState(() => {
    // Initialize user state with localStorage, safely handle JSON parsing
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
      return null; // Return null if parsing fails
    }
  });

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <InnerApp user={user} onLogout={handleLogout} onLogin={handleLogin} />
    </Router>
  );
};

const InnerApp = ({ user, onLogout, onLogin }) => {
  const location = useLocation(); // Get current location

  // Check if the current path is either '/login' or '/register'
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {/* Conditionally render the Navbar */}
      {!isAuthPage && <Navbar user={user} onLogout={onLogout} />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
