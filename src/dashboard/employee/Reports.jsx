import React, { useEffect, useState } from 'react';
import { getReports } from '../../services/api'; // Assume this API function is implemented
import { toast } from 'react-toastify';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser ? storedUser.id : null;

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getReports(userId);
                setReports(data);
            } catch (error) {
                toast.error('Failed to load reports');
            }
        };
        fetchReports();
    }, [userId]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Reports</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-6 py-3">Report Type</th>
                        <th className="px-6 py-3">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.id} className="border-b hover:bg-gray-100">
                            <td className="px-6 py-4">{report.type}</td>
                            <td className="px-6 py-4">{report.details}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;
