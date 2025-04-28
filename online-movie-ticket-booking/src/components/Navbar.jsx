import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl">Movie Booking</h1>
        <div className="flex space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/login" className="text-white">Login</Link>
          <Link to="/register" className="text-white">Register</Link>
          <Link to="/history" className="text-white">History</Link>
          <Link to="/feedback" className="text-white">Feedback</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
