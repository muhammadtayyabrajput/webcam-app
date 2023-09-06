import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const serverURL = 'http://localhost:5000'; // Update this with your server's URL
    const registerURL = `${serverURL}/api/auth/register`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');
        setIsSuccessVisible(false);
        setIsErrorVisible(false);

        try {
            await axios.post(registerURL, { username, email, password, phonenumber });
            setSuccessMessage('Registration successful! Please log in.');
            setIsSuccessVisible(true);
            setUsername('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');
        } catch (error) {
            setError('Registration failed. Please check your inputs and try again.');
            setIsErrorVisible(true);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
            <div>
                <a>
                    <h3 className="text-4xl font-bold text-purple-600">
                        <Link to="/">Web Cam</Link>
                    </h3>
                </a>
            </div>
            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-gray-200 shadow-md sm:max-w-md sm:rounded-lg">
                {isSuccessVisible && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
                        {successMessage}
                    </div>
                )}

                {isErrorVisible && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="phonenumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone Number
                        </label>
                        <div className="mt-1">
                            <input
                                type="tel"
                                name="phonenumber"
                                id="phonenumber"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={phonenumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <a className="text-sm text-gray-600 underline hover:text-gray-900">
                            <Link to="/login">Already registered?</Link>
                        </a>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
