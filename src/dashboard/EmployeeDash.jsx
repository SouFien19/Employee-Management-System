import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getLeaves, createLeave, getNotifications } from '../services/api';
import ToastNotification from '../components/Notifications'; // Correct import
import { Link } from 'react-router-dom';

export const EmployeeDash = () => {
    const [lastLeave, setLastLeave] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [newLeave, setNewLeave] = useState({ employeeId: '', startDate: '', endDate: '' });
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser ? storedUser.id : null;

    useEffect(() => {
        const fetchLeavesAndNotifications = async () => {
            if (!userId) return;

            try {
                const leaveData = await getLeaves();
                const userLeaves = leaveData.filter(leave => leave.employeeId === userId);

                if (userLeaves.length > 0) {
                    setLastLeave(userLeaves[userLeaves.length - 1]);
                }

                const notificationData = await getNotifications(userId);
                setNotifications(
                    notificationData.map(leave => ({
                        message: leave.notificationMessage,
                        type: leave.status === 'approved' ? 'approved' : 'rejected'
                    }))
                );
            } catch (error) {
                toast.error('Failed to load data');
            }
        };
        fetchLeavesAndNotifications();
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
            setLastLeave(createdLeave);
            setNewLeave({ employeeId: '', startDate: '', endDate: '' });
            toast.success('Leave request submitted');
        } catch (error) {
            toast.error('Failed to submit leave request');
        }
    };

    // Define handleCloseNotification here
    const handleCloseNotification = (index) => {
        setNotifications(notifications.filter((_, i) => i !== index)); // Remove notification at index
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="bg-gray-800 text-white w-64 p-5">
                <h1 className="text-xl font-bold mb-6">Employee Dashboard</h1>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <Link to="/employee-dashboard" className="hover:text-gray-300">Your Leaves</Link>
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

            <main className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-6">Your Last Leave Request</h2>

                {/* Notifications */}
                {notifications.length > 0 && (
                    <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
                        {notifications.map((notif, index) => (
                            <ToastNotification 
                                key={index} 
                                message={notif.message} 
                                type={notif.type} 
                                onClose={() => handleCloseNotification(index)} 
                            />
                        ))}
                    </div>
                )}

                {/* Display Last Leave Request */}
                {lastLeave ? (
                    <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-6 py-3">Start Date</th>
                                <th className="px-6 py-3">End Date</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={lastLeave.id} className="border-b hover:bg-gray-100">
                                <td className="px-6 py-4">{new Date(lastLeave.startDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{new Date(lastLeave.endDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{lastLeave.status}</td>
                            </tr>
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
                            Request Leave
                        </button>
                    </form>
                </div>

                {/* Toast Container for Notifications */}
                <ToastContainer />
            </main>
        </div>
    );
};