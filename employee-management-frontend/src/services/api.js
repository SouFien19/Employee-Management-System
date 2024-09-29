// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:4000'; 

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data; 
  } catch (error) {
    throw new Error(error.response.data.message || 'Login failed');
  }
};

export const registerUser = async (name, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
    localStorage.removeItem('access_token'); // Clear token from localStorage
    localStorage.removeItem('user'); // Clear user data from localStorage
  } catch (error) {
    console.error('Logout Error:', error);
  }
};