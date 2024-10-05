import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react'; 
import { toast, ToastContainer } from 'react-toastify'; 

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAnimation, setShowAnimation] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) navigate('/'); 
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
        toast.error('Please enter both email and password.');
        return;
    }

    try {
        const response = await loginUser(email, password);
        
        // Log the response for debugging
        console.log('Login response:', response);

        if (response && response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
            onLogin(response.user);
            setShowAnimation(true);

            // Redirect based on user role
            const redirectPath = response.user.role === 'HR' ? '/hr-dashboard' : '/employee-dashboard';
            console.log('Redirecting to:', response.user.role); // Log the redirect path
            navigate(redirectPath);
        } else {
            toast.error('Unexpected response from server.');
        }
    } catch (err) {
        setError(err.message || 'Login failed. Please try again.');
        toast.error(err.message || 'Login failed. Please try again.');
    }
};

return (
   <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
     <div className="container mx-auto flex justify-center items-center space-x-10">
       <div className="w-1/2 flex items-center justify-center">
         <DotLottieReact
           src="https://lottie.host/f9c0ef59-0eeb-4c47-90bc-992b197e3de8/m1sNGgNtw6.json"
           background="transparent"
           speed="1"
           style={{ width: '400px', height: '400px' }}
           direction="1"
           playMode="normal"
           loop
           autoplay
         />
       </div>

       <div className="w-1/2 max-w-lg p-10 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
         <div className="text-center mb-6">
           <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign in</h1>
           <p className="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
         </div>

         {error && <p className="text-red-500 mb-4">{error}</p>}

         {showAnimation ? (
           <div className="flex justify-center items-center h-full">
             <DotLottieReact
               src="https://lottie.host/74d44ad6-7c6a-4d54-a59d-89fcaa2150ee/cKZ3v51pna.json"
               loop
               autoplay
               style={{ width: '200px', height: '200px' }}
             />
           </div>
         ) : (
           <form onSubmit={handleSubmit}>
             <div className="mb-6">
               <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
               <input
                 type="email"
                 id="email"
                 placeholder="you@company.com"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                 className="w-full px-4 py-3 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
               />
             </div>
             <div className="mb-6">
               <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Password</label>
               <input
                 type="password"
                 id="password"
                 placeholder="Your Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                 className="w-full px-4 py-3 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
               />
             </div>
             <button
               type="submit"
               className="w-full px-4 py-3 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
             >
               Sign in
             </button>
             <p className="text-sm text-center text-gray-400 mt-4">
               Don't have an account yet?{' '}
               <Link to="/register" className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800">Sign up</Link>.
             </p>
           </form>
         )}
       </div>
     </div>
     {/* Toast Container for notifications */}
     <ToastContainer />
   </div>
);
}