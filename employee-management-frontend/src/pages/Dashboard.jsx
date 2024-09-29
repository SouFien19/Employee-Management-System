// src/pages/Dashboard.js
import React from 'react';

export const Dashboard = () => {
  // Retrieve user data from localStorage
  const userData = localStorage.getItem('user');
  let user;

  // Attempt to parse the user data
  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Failed to parse user data from localStorage:', error);
    user = null;
  }

  console.log("Current user data in Dashboard:", user); // Debugging output

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
      {user ? (
        <h2 className="text-xl">Hello, {user.name}!</h2> 
      ) : (
        <h2 className="text-xl">User not found.</h2>
      )}
    </div>
  );
};