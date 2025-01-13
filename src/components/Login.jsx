import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // State variables for username, password, and error message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        // Call the loginUser function to authenticate
        const response = await loginUser(username, password);

        if (response.access_token) {
            // Store the JWT token in localStorage
            localStorage.setItem('access_token', response.access_token);
            // Redirect user to the select body part page
            navigate('/select-body-part');
        } else {
            // Display error message
            setErrorMessage(response.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Login
                </h2>

                {/* Error Message */}
                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">
                        {errorMessage}
                    </p>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin}>
                    {/* Username Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
