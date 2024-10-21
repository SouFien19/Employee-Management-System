import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/api';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Bars3Icon } from '@heroicons/react/24/solid';

export const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false); 
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the API to log out
      onLogout(); 
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Logout failed:', error); // Handle any errors here
    }
  };

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          {/* Logo */}
          <img src="/work-team.png" alt="Logo" className="h-8 mr-2" />
          <h1 className="text-xl font-bold">HR Management</h1>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="text-gray-400 md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <Bars3Icon className={`w-6 h-6 transition-transform duration-300 ${open ? 'rotate-90' : ''}`} />
        </button>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                className="flex items-center text-gray-300 hover:text-blue-400 focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUserCircle className="w-8 h-8 mr-2" />
                <span>Welcome, {user.name}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 shadow-lg rounded-lg z-10">
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-gray-600 focus:outline-none"
                  >
                    <RiLogoutCircleRLine className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Icons for Login and Sign Up */}
              <Link to="/login" className="flex items-center text-gray-300 hover:text-blue-400">
                <AiOutlineLogin className="w-6 h-6" aria-hidden="true" />
              </Link>
              <Link to="/register" className="flex items-center text-gray-300 hover:text-blue-400">
                <AiOutlineUserAdd className="w-6 h-6" aria-hidden="true" />
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-700 p-4 rounded shadow-lg">
          <div className="flex flex-col items-center">
            <Link to="/" className="py-2 text-gray-300 hover:text-blue-400">Home</Link>
            {user ? (
              <div className="flex flex-col items-center">
                <span className="text-gray-200 font-medium">Welcome, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white px-4 py-2 rounded transition duration-200 hover:bg-red-600 mt-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="flex items-center text-gray-300 hover:text-blue-400 mt-2">
                  <AiOutlineLogin className="w-6 h-6" aria-hidden="true" />
                  <span className="ml-2">Login</span>
                </Link>
                <Link to="/register" className="flex items-center text-gray-300 hover:text-blue-400 mt-2">
                  <AiOutlineUserAdd className="w-6 h-6" aria-hidden="true" />
                  <span className="ml-2">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
