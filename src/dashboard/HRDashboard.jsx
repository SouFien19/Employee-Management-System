import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaUsers, FaUserPlus, FaClipboardList, FaClipboardCheck, FaClock, FaChartBar } from 'react-icons/fa'; 

export const HRDashboard = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-5 shadow-lg">
        <h1 className="text-xl font-bold">HR Dashboard</h1>
        <nav className="mt-5">
          <ul>
            <li>
              <Link 
                to="employees" 
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${location.pathname.includes('employees') ? 'bg-gray-700' : ''}`}
              >
                <FaUsers className="mr-2" /> Employee List
              </Link>
            </li>
            <li>
              <Link 
                to="create-employee" 
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${location.pathname.includes('create-employee') ? 'bg-gray-700' : ''}`}
              >
                <FaUserPlus className="mr-2" /> Create Employee
              </Link>
            </li>
            <li>
              <Link 
                to="leaves" 
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${location.pathname.includes('leaves') ? 'bg-gray-700' : ''}`}
              >
                <FaClipboardList className="mr-2" /> Leave List
              </Link>
            </li>
            <li>
              <Link 
                to="performance-evaluations" 
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${location.pathname.includes('performance-evaluations') ? 'bg-gray-700' : ''}`}
              >
                <FaClipboardCheck className="mr-2" /> Performance Evaluations
              </Link>
            </li>
            <li>
              <Link 
                to="create-performance-evaluation" 
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${location.pathname.includes('create-performance-evaluation') ? 'bg-gray-700' : ''}`}
              >
                <FaClipboardCheck className="mr-2" /> Create Performance Evaluation
              </Link>
            </li>
            <li>
              <Link 
                to="time-tracking" 
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${location.pathname.includes('time-tracking') ? 'bg-gray-700' : ''}`}
              >
                <FaClock className="mr-2" /> Time Tracking
              </Link>
            </li>
            <li>
              <Link 
                to="reports" 
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${location.pathname.includes('reports') ? 'bg-gray-700' : ''}`}
              >
                <FaChartBar className="mr-2" /> Reports
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default HRDashboard;
