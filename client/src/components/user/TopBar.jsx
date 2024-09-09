import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaUserCircle, FaCog, FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ onToggle }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const [userName, setUserName] = useState('');

  // Toggle the profile menu visibility
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Close the profile menu when clicking outside
  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="bg-blue-500 h-16 flex items-center justify-between px-6 shadow-md">
      <div className="flex items-center">
        <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mr-4">
          {/* Logo placeholder */}
        </div>
        <button onClick={onToggle} className="text-white hover:text-gray-300">
          <FaBars size={24} />
        </button>
      </div>
      <div className="relative" ref={profileRef}>
        
        <button onClick={toggleProfileMenu} className="text-white text-3xl">
          <FaUserCircle />
        </button>
        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-10">
            <button
              onClick={handleSettings}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FaCog className="mr-2" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-gray-100 transition-colors"
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
