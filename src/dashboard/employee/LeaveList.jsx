import React, { useEffect, useState } from 'react';
import { getLeaves, deleteLeave, approveLeave, rejectLeave } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const data = await getLeaves();
      setLeaves(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch leaves');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLeave(id);
      toast.success('Leave request deleted successfully');
      fetchLeaves(); // Refresh the leave list
    } catch (error) {
      toast.error(error.message || 'Failed to delete leave request');
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      toast.success('Leave request approved successfully');
      fetchLeaves(); // Refresh the leave list to reflect the updated status
    } catch (error) {
      toast.error(error.message || 'Failed to approve leave request');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);
      toast.success('Leave request rejected successfully');
      fetchLeaves(); // Refresh the leave list to reflect the updated status
    } catch (error) {
      toast.error(error.message || 'Failed to reject leave request');
    }
  };

  useEffect(() => {
    fetchLeaves(); // Initial fetch when the component mounts
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Leave List</h2>
      <ToastContainer />
      {loading ? (
        <div>Loading...</div> // Add a loading state
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Employee Name</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{leave.employeeName}</td>
                <td className="p-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="p-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="p-3">{leave.status}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleApprove(leave.id)}
                    className="text-green-500 hover:text-green-700 mr-2"
                  >
                    <CheckIcon className="h-5 w-5 inline-block" />
                  </button>
                  <button
                    onClick={() => handleReject(leave.id)}
                    className="text-red-500 hover:text-red-700 mr-2"
                  >
                    <XMarkIcon className="h-5 w-5 inline-block" />
                  </button>
                  <button
                    onClick={() => handleDelete(leave.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveList;
