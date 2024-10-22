import React, { useState } from 'react';
import { logTime } from '../../services/api'; // Assume you have this API function
import { toast } from 'react-toastify';

const LogTime = () => {
    const [timeEntry, setTimeEntry] = useState({ date: '', hours: '', description: '' });
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser ? storedUser.id : null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTimeEntry({ ...timeEntry, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!timeEntry.date || !timeEntry.hours) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            await logTime({ ...timeEntry, employeeId: userId });
            toast.success('Time logged successfully');
            setTimeEntry({ date: '', hours: '', description: '' });
        } catch (error) {
            toast.error('Failed to log time');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Log Time</h2>
            <div className="mb-4">
                <label className="block">Date:</label>
                <input
                    type="date"
                    name="date"
                    value={timeEntry.date}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block">Hours:</label>
                <input
                    type="number"
                    name="hours"
                    value={timeEntry.hours}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block">Description:</label>
                <textarea
                    name="description"
                    value={timeEntry.description}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Log Time
            </button>
        </form>
    );
};

export default LogTime;
