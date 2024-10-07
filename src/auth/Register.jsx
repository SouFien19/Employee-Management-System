import React, { useState, useEffect } from 'react';
import { registerUser } from '../services/api'; 
import { Link, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react'; // Import the animation library

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false); // State to control animation display
  const navigate = useNavigate();

  // Reset form fields on component mount
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('employee');
  }, []);

  // Show animation on success and redirect after 1500ms
  useEffect(() => {
    if (success) {
      setShowAnimation(true); // Show animation on success
      const timer = setTimeout(() => {
        setShowAnimation(false); // Hide animation after 1500 milliseconds
        navigate('/login'); // Redirect to login after displaying animation
      }, 1700);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await registerUser(name, email, password, role);
      setSuccess('Registration successful! You can now log in.');
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full max-w-md mx-auto">
        {showAnimation ? (
          <div className="flex flex-col items-center justify-center h-full">
            <DotLottieReact
              src="https://lottie.host/bcec1911-4c9c-41bf-b1ea-baad3c0eb0b8/j8oHnNWOjo.json" // Updated animation URL
              loop
              autoplay
              style={{ width: '300px', height: '300px' }} // Make the animation larger
            />
            <p className="mt-4 text-xl font-semibold text-green-500">Registration Successful!</p> {/* Success message */}
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-200">Register</h1>
              <p className="text-gray-500 dark:text-gray-400">Create your account</p>
            </div>
            <form onSubmit={handleSubmit}>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}

              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="role" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                >
                  <option value="employee">Employee</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div className="mb-6">
                <button
                  type="submit"
                  className={`w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>

              <p className="text-sm text-center text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800">Log in</Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};