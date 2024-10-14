// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:4000'; 

// Auth API functions
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerUser = async (name, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password, role });
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
    localStorage.removeItem('access_token'); 
    localStorage.removeItem('user'); 
  } catch (error) {
    console.error('Logout Error:', error);
  }
};

// User API functions
export const createUser = async (name, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/users`, { name, email, password, role });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error(error.response?.data || 'Failed to create user');
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(error.response?.data || 'Failed to fetch users');
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error(error.response?.data || 'Failed to fetch user');
  }
};

export const updateUser = async (id, updateData) => {
  try {
    const response = await axios.patch(`${API_URL}/users/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error(error.response?.data || 'Failed to update user');
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error(error.response?.data || 'Failed to delete user');
  }
};

// Leave API functions
export const createLeave = async ({ employeeId, startDate, endDate }) => {
  try {
      const response = await axios.post(`${API_URL}/leaves`, { employeeId, startDate, endDate });
      return response.data;
  } catch (error) {
      console.error('Error creating leave:', error);
      throw new Error(error.response?.data || 'Failed to create leave');
  }
};

export const getLeaves = async () => {
  try {
      const response = await axios.get(`${API_URL}/leaves`);
      return response.data;
  } catch (error) {
      console.error('Error fetching leaves:', error);
      throw new Error(error.response?.data || 'Failed to fetch leaves');
  }
};

export const getNotifications = async (employeeId) => {
  try {
      const response = await axios.get(`${API_URL}/leaves/notifications/${employeeId}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching notifications:', error);
      throw new Error(error.response?.data || 'Failed to fetch notifications');
  }
};

export const updateLeave = async (id, updateData) => {
   try {
       const response = await axios.patch(`${API_URL}/leaves/${id}`, updateData);
       return response.data;
   } catch (error) {
       console.error('Error updating leave:', error);
       throw new Error(error.response?.data || 'Failed to update leave');
   }
};

export const deleteLeave = async (id) => {
   try {
       await axios.delete(`${API_URL}/leaves/${id}`);
   } catch (error) {
       console.error('Error deleting leave:', error);
       throw new Error(error.response?.data || 'Failed to delete leave');
   }
};
export const approveLeave = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/leaves/${id}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving leave:', error);
    throw new Error(error.response?.data || 'Failed to approve leave');
  }
};

export const rejectLeave = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/leaves/${id}/reject`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting leave:', error);
    throw new Error(error.response?.data || 'Failed to reject leave');
  }
};