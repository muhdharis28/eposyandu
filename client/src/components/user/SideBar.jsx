import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaCog, FaBaby, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const SideBar = ({ isCollapsed }) => {
  const location = useLocation(); // Get the current route
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const navItems = [
    { icon: FaHome, label: 'Dashboard', path: '/user-dashboard' },
    { icon: FaUsers, label: 'Lansia', path: '/user-lansia' },
    { icon: FaBaby, label: 'Balita', path: '/user-balita' },
    { icon: FaCog, label: 'Pengaturan', path: '/user-settings' }
  ];

  const toggleSubMenu = (label) => {
    setActiveSubMenu(activeSubMenu === label ? null : label);
  };

  const isActive = (path) => location.pathname === path; // Check if the current path matches

  return (
    <div
      className={`h-full pt-24 ${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-blue-800 to-purple-900 p-5 flex flex-col justify-between transition-all duration-500 ease-in-out text-white shadow-2xl relative rounded-tr-lg rounded-br-lg overflow-hidden`}>
      <div className="flex flex-col items-start">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.label}>
              {/* No sub-items, just a link */}
              <Link
                to={item.path}
                className={`flex items-center hover:bg-blue-700 hover:bg-opacity-20 p-2 rounded-lg transition-colors duration-200 ease-in-out ${
                  isCollapsed ? 'justify-center' : ''
                } ${isActive(item.path) ? 'bg-blue-700 bg-opacity-30' : ''}` /* Add active style if it's active */}
              >
                <item.icon className="mr-2" size={18} />
                {!isCollapsed && (
                  <span className="transition-opacity duration-300 ease-in-out">
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
