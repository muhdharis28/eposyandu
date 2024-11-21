import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaCog, FaBaby } from 'react-icons/fa';

const SideBar = ({ isCollapsed }) => {
  const location = useLocation(); // Get the current route
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const groupedNavItems = [
    {
      groupLabel: 'Main',
      items: [
        { icon: FaHome, label: 'Dashboard', path: '/user-dashboard' }
      ]
    },
    {
      groupLabel: 'Data',
      items: [
        { icon: FaUsers, label: 'Lansia', path: '/user-lansia' },
        { icon: FaBaby, label: 'Balita', path: '/user-balita' }
      ]
    },
    {
      groupLabel: 'Settings',
      items: [
        { icon: FaCog, label: 'Pengaturan', path: '/user-settings' }
      ]
    }
  ];

  const isActive = (path) => location.pathname === path; // Check if the current path matches

  return (
    <div
      className={`h-full pt-24 ${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-blue-800 to-purple-900 p-5 flex flex-col justify-between transition-all duration-500 ease-in-out text-white shadow-2xl relative rounded-tr-lg rounded-br-lg overflow-hidden`}>
      <div className="flex flex-col items-start">
        {groupedNavItems.map((group) => (
          <div key={group.groupLabel} className="w-full">
            {!isCollapsed && (
              <div className="text-gray-300 mb-2 mt-4 uppercase tracking-wider text-sm">
                {group.groupLabel}
              </div>
            )}
            <ul className="space-y-4">
              {group.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`flex items-center hover:bg-blue-700 hover:bg-opacity-20 p-2 rounded-lg transition-colors duration-200 ease-in-out ${
                      isCollapsed ? 'justify-center' : ''
                    } ${isActive(item.path) ? 'bg-blue-700 bg-opacity-30' : ''}`} /* Add active style if it's active */
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
            {/* Divider */}
            <div className="border-b border-gray-600 my-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
