import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-center text-white">
      &copy; {new Date().getFullYear()} Movie Booking System
    </footer>
  );
};

export default Footer;
