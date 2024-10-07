import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaUsers, FaUserPlus, FaClipboardList } from 'react-icons/fa'; // Importing icons

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
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-5 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};