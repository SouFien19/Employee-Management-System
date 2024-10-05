import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const HRDashboard = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <div className="bg-gray-800 text-white w-64 p-5">
        <h1 className="text-xl font-bold">HR Dashboard</h1>
        <nav className="mt-5">
          <ul>
            <li>
              <Link to="employees" className={`block py-2 px-4 rounded hover:bg-gray-700 ${location.pathname.includes('employees') ? 'bg-gray-700' : ''}`}>
                Employee List
              </Link>
            </li>
            <li>
              <Link to="create-employee" className={`block py-2 px-4 rounded hover:bg-gray-700 ${location.pathname.includes('create-employee') ? 'bg-gray-700' : ''}`}>
                Create Employee
              </Link>
            </li>
            <li>
              <Link to="leaves" className={`block py-2 px-4 rounded hover:bg-gray-700 ${location.pathname.includes('leaves') ? 'bg-gray-700' : ''}`}>
                Leave List
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};
