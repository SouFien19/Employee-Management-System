import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { getLeaves, createLeave } from '../services/api';
import { Link } from 'react-router-dom';

export const EmployeeDash = () => {
  const [leaves, setLeaves] = useState([]);
  const [newLeave, setNewLeave] = useState({ employeeId: '', startDate: '', endDate: '' });
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser.id;

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const leaveData = await getLeaves();
        // Filter leaves for the logged-in user
        const userLeaves = leaveData.filter(leave => leave.employeeId === userId);
        setLeaves(userLeaves);
      } catch (error) {
        toast.error('Failed to load leave data');
      }
    };
    fetchLeaves();
  }, [userId]);

  const handleCreateLeave = async (e) => {
    e.preventDefault();
    if (!newLeave.startDate || !newLeave.endDate) {
      toast.error('Please fill in both start and end dates.');
      return;
    }

    try {
      newLeave.employeeId = userId;
      const createdLeave = await createLeave(newLeave);
      setLeaves([...leaves, createdLeave]);
      setNewLeave({ employeeId: '', startDate: '', endDate: '' });
      toast.success('Leave request submitted');
    } catch (error) {
      toast.error('Failed to submit leave request');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 p-5">
        <h1 className="text-xl font-bold mb-6">Employee Dashboard</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/employee-dash" className="hover:text-gray-300">Your Leaves</Link>
            </li>
            <li className="mb-4">
              <Link to="/profile" className="hover:text-gray-300">Profile</Link>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="hover:text-gray-300">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Your Leaves</h2>

        {/* Leaves Table */}
        {leaves.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">End Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // Message when no leaves are found
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <p className="text-lg font-semibold">You have no leave requests.</p>
            <p>Please submit a request using the form below.</p>
          </div>
        )}

        {/* Leave Request Form */}
        <div className="mb-4 bg-white p-5 rounded-lg shadow-md">
          <form onSubmit={handleCreateLeave} className="flex items-center space-x-4">
            <input
              type="date"
              className="border p-2 rounded"
              value={newLeave.startDate}
              onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
              required
            />
            <input
              type="date"
              className="border p-2 rounded"
              value={newLeave.endDate}
              onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition duration-200"
            >
              <PlusCircleIcon className="w-5 h-5 mr-2" /> Request Leave
            </button>
          </form>
        </div>

        <ToastContainer />
      </main>
    </div>
  );
};