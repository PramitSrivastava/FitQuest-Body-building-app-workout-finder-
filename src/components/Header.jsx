import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 shadow-lg z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-wide">FitQuest</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-800 text-white rounded-full shadow-lg"
          >
            Toggle Theme
          </button>
          <Link
            to="/my-exercises"
            className="p-2 bg-gray-800 text-white rounded-full shadow-lg"
          >
            My Exercises
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
