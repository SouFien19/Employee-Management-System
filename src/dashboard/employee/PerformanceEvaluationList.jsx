import React, { useEffect, useState } from 'react';
import { getEvaluations, getUserById } from '../../services/api';

const EvaluationTable = () => {
    const [evaluations, setEvaluations] = useState([]);
    const [employees, setEmployees] = useState({});  // Store employee data

    useEffect(() => {
        // Fetch evaluations and employee names
        const fetchEvaluations = async () => {
            try {
                const evaluationsData = await getEvaluations();
                setEvaluations(evaluationsData);

                // Fetch employee names for each evaluation
                const employeePromises = evaluationsData.map(evaluation =>
                    getUserById(evaluation.employeeId)
                );
                const employeeData = await Promise.all(employeePromises);

                // Store employees by their ID for quick lookup
                const employeeMap = employeeData.reduce((acc, employee) => {
                    acc[employee.id] = employee.name;
                    return acc;
                }, {});
                setEmployees(employeeMap);
            } catch (error) {
                console.error('Error fetching evaluations or employees', error);
            }
        };

        fetchEvaluations();
    }, []);

    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr>
                    <th className="px-6 py-4">Employee Name</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Comments</th>
                </tr>
            </thead>
            <tbody>
                {evaluations.map((evaluation) => (
                    <tr key={evaluation.id} className="border-b hover:bg-gray-100">
                        <td className="px-6 py-4">{employees[evaluation.employeeId]}</td>
                        <td className="px-6 py-4">{new Date(evaluation.employee).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{evaluation.score}</td>
                        <td className="px-6 py-4">{evaluation.comments}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EvaluationTable;
