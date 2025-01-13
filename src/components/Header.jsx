import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isAuthenticated = !!localStorage.getItem('access_token');

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  // Only render the header if the user is authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 shadow-lg z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide text-white shadow-lg">
          FitQuest
        </h1>
        <div className="flex gap-6 items-center">
          <Link
            to="/select-body-part"
            className="text-lg font-semibold bg-gray-800 text-white py-2 px-6 rounded-full shadow-md transform transition-all duration-300 hover:bg-teal-600 hover:scale-105"
          >
            Select Bodypart
          </Link>
          <Link
            to="/my-exercises"
            className="text-lg font-semibold bg-gray-800 text-white py-2 px-6 rounded-full shadow-md transform transition-all duration-300 hover:bg-teal-600 hover:scale-105"
          >
            My Exercises
          </Link>
          <Link
            to="/health-hub"
            className="text-lg font-semibold bg-gray-800 text-white py-2 px-6 rounded-full shadow-md transform transition-all duration-300 hover:bg-teal-600 hover:scale-105"
          >
            Health Hub
          </Link>
          <button
            onClick={handleLogout}
            className="text-lg font-semibold bg-red-600 text-white py-2 px-6 rounded-full shadow-md transform transition-all duration-300 hover:bg-red-700 hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
