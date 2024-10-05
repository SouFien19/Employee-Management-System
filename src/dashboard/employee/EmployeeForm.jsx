import React, { useState } from 'react';
import { createUser } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserIcon, EnvelopeIcon, LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'; // Importing icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(name, email, password, role);
      toast.success('Employee created successfully');
      setName('');
      setEmail('');
      setPassword('');
      setRole('Employee');
      navigate('/employee-list'); // Redirect to employee list
    } catch (error) {
      toast.error(error.message || 'Failed to create employee');
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Employee</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border border-gray-300 rounded p-3">
          <UserIcon className="h-6 w-6 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-none focus:outline-none w-full text-lg"
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded p-3">
          <EnvelopeIcon className="h-6 w-6 text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-none focus:outline-none w-full text-lg"
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded p-3">
          <LockClosedIcon className="h-6 w-6 text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-none focus:outline-none w-full text-lg"
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded p-3">
          <ShieldCheckIcon className="h-6 w-6 text-gray-500 mr-2" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border-none focus:outline-none w-full text-lg"
          >
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 w-full transition duration-200 text-lg"
        >
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;