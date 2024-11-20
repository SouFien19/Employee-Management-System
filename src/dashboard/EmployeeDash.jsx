import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLeaves, createLeave, getNotifications } from '../services/api';
import ToastNotification from '../components/Notifications'; // Ensure this component is correctly implemented
import { Link } from 'react-router-dom';

export const EmployeeDash = () => {
    const [, setLastLeave] = useState(null);
    const [allLeaves, setAllLeaves] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [newLeave, setNewLeave] = useState({
        employeeId: '',
        startDate: '',
        endDate: '',
        reason: ''
    });
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
                    setAllLeaves(userLeaves);
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

        // Validate that all fields are filled in
        if (!newLeave.startDate || !newLeave.endDate || !newLeave.reason) {
            toast.error('Please fill in all fields including reason for leave.');
            return;
        }

        // Check for overlapping dates with existing leave requests
        const isOverlapping = allLeaves.some(leave => {
            const leaveStart = new Date(leave.startDate);
            const leaveEnd = new Date(leave.endDate);
            const newLeaveStart = new Date(newLeave.startDate);
            const newLeaveEnd = new Date(newLeave.endDate);

            // Check if the new leave overlaps with an existing leave
            return (
                (newLeaveStart >= leaveStart && newLeaveStart <= leaveEnd) ||
                (newLeaveEnd >= leaveStart && newLeaveEnd <= leaveEnd) ||
                (newLeaveStart <= leaveStart && newLeaveEnd >= leaveEnd)
            );
        });

        if (isOverlapping) {
            toast.error('The selected dates overlap with an existing leave request.');
            return;
        }

        try {
            newLeave.employeeId = userId;
            const createdLeave = await createLeave(newLeave);
            setLastLeave(createdLeave);
            setAllLeaves(prevLeaves => [...prevLeaves, createdLeave]); // Add the new leave to the list
            setNewLeave({ employeeId: '', startDate: '', endDate: '', reason: '' });
            toast.success('Leave request submitted');
        } catch (error) {
            toast.error('Failed to submit leave request');
        }
    };

    const handleCloseNotification = (index) => {
        setNotifications(notifications.filter((_, i) => i !== index));
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
                <h2 className="text-2xl font-bold mb-6">Your Leave Requests</h2>

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

                {/* Display All Leave Requests */}
                {allLeaves.length > 0 ? (
                    <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-6 py-3">Start Date</th>
                                <th className="px-6 py-3">End Date</th>
                                <th className="px-6 py-3">Reason</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allLeaves.map(leave => (
                                <tr key={leave.id} className="border-b hover:bg-gray-100">
                                    <td className="px-6 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{leave.reason}</td>
                                    <td className="px-6 py-4">{leave.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="bg-white p-5 rounded-lg shadow-md text-center">
                        <p className="text-lg font-semibold">You have no leave requests.</p>
                        <p>Please submit a request using the form below.</p>
                    </div>
                )}

                {/* Leave Request Form */}
                <div className="mb-4 bg-white p-5 rounded-lg shadow-md">
                    <form onSubmit={handleCreateLeave} className="flex flex-col space-y-4">
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
                        <textarea
                            placeholder="Reason for leave"
                            className="border p-2 rounded"
                            value={newLeave.reason}
                            onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
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
