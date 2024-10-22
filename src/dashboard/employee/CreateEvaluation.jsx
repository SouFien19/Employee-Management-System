import React, { useState, useEffect } from 'react';
import { createEvaluation, getUsers } from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS

const CreateEvaluation = () => {
    const [evaluation, setEvaluation] = useState({ employeeId: '', score: '', comments: '' });
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getUsers(); // Fetch users from the API
                setEmployees(response);
            } catch (error) {
                toast.error('Failed to load employees.');
            }
        };
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvaluation({ ...evaluation, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!evaluation.employeeId || !evaluation.score) {
            toast.error('Please select an employee and provide a score.');
            return;
        }

        try {
            await createEvaluation(evaluation);
            toast.success('Evaluation created successfully.');
            setEvaluation({ employeeId: '', score: '', comments: '' }); // Reset form
        } catch (error) {
            toast.error('Failed to create evaluation.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Performance Evaluation</h2>

            <div className="mb-4">
                <label className="block text-gray-700">Employee Name:</label>
                <select
                    name="employeeId"
                    value={evaluation.employeeId}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                >
                    <option value="" disabled>Select Employee</option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Score:</label>
                <input
                    type="number"
                    name="score"
                    value={evaluation.score}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    min="1" max="10"
                    placeholder="Rate from 1 to 10"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Comments:</label>
                <textarea
                    name="comments"
                    value={evaluation.comments}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    placeholder="Add any comments here..."
                    rows="4"
                />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
                Create Evaluation
            </button>
        </form>
    );
};

export default CreateEvaluation;
