import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { getLeaves, createLeave } from '../services/api';

export const EmployeeDash = () => {
  const [leaves, setLeaves] = useState([]);
  const [newLeave, setNewLeave] = useState({employeeId:'', startDate: '', endDate: '' });
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser.id; 
  
  console.log('User ID:', userId); 
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const leaveData = await getLeaves();
        setLeaves(leaveData);
      } catch (error) {
        toast.error('Failed to load leave data');
      }
    };
    fetchLeaves();
  }, []);

  const handleCreateLeave = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!newLeave.startDate || !newLeave.endDate) {
      toast.error('Please fill in both start and end dates.');
      return;
    }

    try {
      newLeave.employeeId = userId; 
      const createdLeave = await createLeave(newLeave);
      setLeaves([...leaves, createdLeave]); // Add new leave to the list
      setNewLeave({employeeId: '', startDate: '', endDate: '' }); // Reset form fields
      console.log('New leave:', createdLeave);
      toast.success('Leave request submitted');
    } catch (error) {
      toast.error('Failed to submit leave request');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Your Leaves</h2>

      {/* Leaves Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
        <thead>
          <tr>
            <th className="px-6 py-3">Start Date</th>
            <th className="px-6 py-3">End Date</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td className="px-6 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
              <td className="px-6 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
              <td className="px-6 py-4">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* Leave Request Form */}
       <div className="mb-4">
         <form onSubmit={handleCreateLeave}>
           <input
             type="date"
             className="border p-2 mr-2"
             value={newLeave.startDate}
             onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
             required
           />
           <input
             type="date"
             className="border p-2 mr-2"
             value={newLeave.endDate}
             onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
             required
           />
           <button
             type="submit"
             className="bg-blue-500 text-white px-4 py-2 rounded"
           >
             <PlusCircleIcon className="w-6 h-6 inline" /> Request Leave
           </button>
         </form>
       </div>

      
       <ToastContainer />

     </div>
   );
};