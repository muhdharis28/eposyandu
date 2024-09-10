import React from 'react';
import { FaBars } from 'react-icons/fa';

const TopBar = ({ onToggle }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md">
      <button onClick={onToggle} className="text-gray-700 text-2xl">
        <FaBars />
      </button>
      <h2 className="text-xl font-semibold text-gray-800">Kader</h2>
      <img
        src="https://via.placeholder.com/40" // Replace with actual profile image URL
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
    </div>
  );
};

export default TopBar;
