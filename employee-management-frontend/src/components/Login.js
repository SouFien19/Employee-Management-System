// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Ensure this file exists

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password
            });
            setMessage(response.data.message);
            setEmail('');
            setPassword('');
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={error ? 'error-input' : ''}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={error ? 'error-input' : ''}
                />
                <button type="submit">Login</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Login;
