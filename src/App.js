import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Home } from './pages/home';
import { NotFound } from './pages/NotFound';
import { HRDashboard } from './dashboard/HRDashboard';
import { EmployeeDash } from './dashboard/EmployeeDash';
import EmployeeList from './dashboard/employee/EmployeeList'; 
import EmployeeForm from './dashboard/employee/EmployeeForm';
import LeaveList from './dashboard/employee/LeaveList';
import PerformanceEvaluationForm from './dashboard/employee/CreateEvaluation'; // Add this import
import PerformanceEvaluationList from './dashboard/employee/PerformanceEvaluationList'; // Add this import
import ReportList from './dashboard/employee/Reports'; // Add this import
import LogTime from './dashboard/employee/LogTime'; // Add this import

import AuthGuard from './components/AuthGuard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TimeTrackingList from './dashboard/employee/TimeTrackingList';

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
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <Router>
      <InnerApp user={user} onLogout={handleLogout} onLogin={handleLogin} />
      <ToastContainer />
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
        
        <Route
          path="/hr-dashboard"
          element={
            <AuthGuard>
              <HRDashboard />
            </AuthGuard>
          }
        >
          <Route path="employees" element={<EmployeeList />} />
          <Route path="create-employee" element={<EmployeeForm />} />
          <Route path="leaves" element={<LeaveList />} />
          <Route path="performance-evaluations" element={<PerformanceEvaluationList />} /> {/* List of evaluations */}
          <Route path="create-performance-evaluation" element={<PerformanceEvaluationForm />} /> {/* Create evaluation */}
          <Route path="reports" element={<ReportList />} /> {/* Reports */}
          <Route path="log-time" element={<LogTime />} />
          <Route path="time-tracking" element={<TimeTrackingList />} /> 
          /</Route>{/* Log time */}
        
        <Route
          path="/employee-dashboard"
          element={
            <AuthGuard>
              <EmployeeDash />
            </AuthGuard>
          }
        />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
