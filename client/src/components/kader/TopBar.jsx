import React from 'react';
import { FaBars, FaPowerOff } from 'react-icons/fa';

const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

const TopBar = ({ onToggle }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md">
      <button onClick={onToggle} className="text-gray-700 text-2xl">
        <FaBars />
      </button>
      <h2 className="text-xl font-semibold text-gray-800">Kader</h2>
      <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-gray-100 transition-colors"
            >
              <FaPowerOff className="mr-2" />
              Logout
            </button>
    </div>
  );
};

export default TopBar;
