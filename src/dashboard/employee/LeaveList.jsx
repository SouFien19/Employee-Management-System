import React, { useEffect, useState } from 'react';
import { getLeaves, deleteLeave, approveLeave, rejectLeave, getUsers } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const data = await getLeaves();
      console.log('Fetched Leaves:', data); // Log the response to check the structure
      setLeaves(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch leaves');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const data = await getUsers();
      setEmployees(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch employees');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLeave(id);
      toast.success('Leave request deleted successfully');
      fetchLeaves();
    } catch (error) {
      toast.error(error.message || 'Failed to delete leave request');
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      toast.success('Leave request approved successfully');
      fetchLeaves();
    } catch (error) {
      toast.error(error.message || 'Failed to approve leave request');
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Please enter the reason for rejection:');
    if (reason) {
      try {
        await rejectLeave(id, reason);
        toast.success('Leave request rejected successfully');
        fetchLeaves();
      } catch (error) {
        toast.error(error.message || 'Failed to reject leave request');
      }
    } else {
      toast.info('Rejection cancelled');
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchLeaves();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Leave List</h2>
      <ToastContainer />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Employee Name</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id} className="border-b hover:bg-gray-100">
                <td className="p-3">
                  {employees.find(employee => employee.id === leave.employeeId)?.name || 'Unknown'}
                </td>
                <td className="p-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="p-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="p-3">{leave.status}</td>
                <td className="p-3">{leave.reason || 'No reason provided'}</td>
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
