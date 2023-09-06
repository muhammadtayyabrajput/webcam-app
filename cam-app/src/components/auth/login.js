import React, { useState } from 'react';
import axios from 'axios';
import Register from '../auth/register';
import {Link } from 'react-router-dom';

function Login({ login }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const serverURL = 'http://localhost:5000'; // Update this with your server's URL
    const loginURL = `${serverURL}/api/auth/login`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        try {
            const response = await axios.post(loginURL, { email, password });
            const token = response.data.token;
            login(token);
            setSuccessMessage('Logged in successfully');
            setEmail('')
            setPassword('')
        } catch (error) {
            setError('Login failed. Please check your email and password.');
            console.error('Login error', error);
        }
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-gray-200 rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                    Sign in
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email" // Use htmlFor and id to associate the label with the input
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password" // Use htmlFor and id to associate the label with the input
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                        >
                            Log In
                        </button>
                    </div>
                </form>

                {successMessage && (
                    <div className="mt-4 text-green-600">{successMessage}</div>
                )}

                {error && <div className="mt-4 text-red-600">{error}</div>}


                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    Don't have an account?{' '}
                    <a
                        className="font-medium text-purple-600 hover:underline"
                    >
                        <Link to='/register'>Sign up</Link>
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
