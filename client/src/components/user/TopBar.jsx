import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaUserCircle, FaCog, FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import posyandu from '@/assets/posyandu.png';

const TopBar = ({ onToggle, isCollapsed }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) setUserName(name);

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSettings = () => navigate('/user-settings');

  return (
    <div className="bg-white h-16 flex items-center justify-between pl-4 pr-6 shadow-lg fixed top-0 left-0 w-full z-10">
      <div className="flex items-center">
        {/* Conditionally render logo based on isCollapsed */}
        <div className={`text-gray-600 ${isCollapsed ? 'w-20' : 'w-64'} text-2xl font-bold`}>
          {isCollapsed ? <img
            src={posyandu}
            alt="Posyandu Logo"
            className={`transition-all duration-500 ease-in-out ${isCollapsed ? 'w-12' : 'w-32'}`}
          /> : <div className="flex items-center">
          <img
            src={posyandu}
            alt="Posyandu Logo"
            className="w-12 mr-2" // Keep a smaller logo even when expanded
          />
          ePosyandu
        </div>}
        </div>
        <button onClick={onToggle} className="text-gray-600 hover:text-gray-300">
          <FaBars size={24} />
        </button>
      </div>
      <div className="relative" ref={profileRef}>
        <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="text-gray-600 text-3xl">
          <FaUserCircle />
        </button>
        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
            <button
              onClick={handleSettings}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <FaCog className="mr-2" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              <FaPowerOff className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
