import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // State variables for username, password, and error message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();

        // Call the registerUser function to create a new account
        const response = await registerUser(username, password);

        if (response.message === "User created successfully") {
            // Redirect to login page after successful registration
            navigate('/login');
        } else {
            // Display error message
            setErrorMessage(response.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Register
                </h2>

                {/* Error Message */}
                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">
                        {errorMessage}
                    </p>
                )}

                {/* Registration Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Username Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>
                </form>

                {/* Redirect to Login */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:text-blue-700">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
