import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 shadow-lg z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Section */}
        <h1 className="text-3xl font-extrabold tracking-wide text-white shadow-lg">
          FitQuest
        </h1>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          {/* Select Bodypart Link */}
          <Link
            to="/select-body-part"
            className="text-lg font-semibold bg-gray-800 text-white py-2 px-6 rounded-full shadow-md transform transition-all duration-300 hover:bg-teal-600 hover:scale-105"
          >
            Select Bodypart
          </Link>
          
          {/* My Exercises Link */}
          <Link
            to="/my-exercises"
            className="text-lg font-semibold bg-gray-800 text-white py-2 px-6 rounded-full shadow-md transform transition-all duration-300 hover:bg-teal-600 hover:scale-105"
          >
            My Exercises
          </Link>

          {/* Health Hub Link */}
          <Link
            to="/health-hub"
            className="text-lg font-semibold bg-gray-800 text-white py-2 px-6 rounded-full shadow-md transform transition-all duration-300 hover:bg-teal-600 hover:scale-105"
          >
            Health Hub
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
