import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Home } from './pages/home';  
import { NotFound } from './pages/NotFound';
import { HRDashboard } from './dashboard/HRDashboard';
import { EmployeeDash } from './dashboard/EmployeeDash';
import AuthGuard from './components/AuthGuard';
const App = () => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
      return null;
    }
  });

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token'); // Clear token on logout
    setUser(null);
  };

  return (
    <Router>
      <InnerApp user={user} onLogout={handleLogout} onLogin={handleLogin} />
    </Router>
  );
};

const InnerApp = ({ user, onLogout, onLogin }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <Navbar user={user} onLogout={onLogout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hr-dashboard" element={<AuthGuard><HRDashboard /></AuthGuard>} /> 
        <Route path="/employee-dashboard" element={<AuthGuard><EmployeeDash /></AuthGuard>} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
