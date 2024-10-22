import React, { useEffect, useState } from 'react';
import { getLoggedHours } from '../../services/api'; // Assume you have this API function
import { toast } from 'react-toastify';

const TimeTrackingList = () => {
    const [loggedHours, setLoggedHours] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser ? storedUser.id : null;

    useEffect(() => {
        const fetchLoggedHours = async () => {
            try {
                const data = await getLoggedHours(userId);
                setLoggedHours(data);
            } catch (error) {
                toast.error('Failed to load logged hours');
            }
        };
        fetchLoggedHours();
    }, [userId]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Logged Hours</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Hours</th>
                        <th className="px-6 py-3">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {loggedHours.map((entry) => (
                        <tr key={entry.id} className="border-b hover:bg-gray-100">
                            <td className="px-6 py-4">{new Date(entry.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4">{entry.hours}</td>
                            <td className="px-6 py-4">{entry.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimeTrackingList;
