import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { useEffect } from 'react';
import { EmployeeDash } from '../dashboard/EmployeeDash';
import {HRDashboard }from '../dashboard/HRDashboard';
const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('access_token'); 
  const user = JSON.parse(localStorage.getItem('user')); 
  console.log('User:', user);




  useEffect(() => {
  }, [token]);
 
  if (!token) {
    return <Navigate to="/" replace />; 
  }

  if (user?.role === 'employee') {
    return <EmployeeDash />; 
  } else if (user?.role === 'HR') {
    return <HRDashboard />; 
  } else {
    return <Navigate to="/"  />; 
  }

};

export default AuthGuard;
