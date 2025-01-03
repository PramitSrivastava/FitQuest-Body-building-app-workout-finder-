import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component for navigation

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 FitQuest. All rights reserved.</p>

        {/* Dummy Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <Link to="#" className="hover:text-teal-500">About Us</Link>
          <Link to="#" className="hover:text-teal-500">Contact</Link>
          <Link to="#" className="hover:text-teal-500">Privacy Policy</Link>
          <Link to="#" className="hover:text-teal-500">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
