import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaStethoscope, FaHeartbeat, FaCog, FaBaby, FaChevronDown, FaChevronUp, FaCalendarAlt, FaCamera, FaUserTie, FaUserShield } from 'react-icons/fa';

const SideBar = ({ isCollapsed }) => {

  const navItems = [
    { icon: FaHome, label: 'Dashboard', path: '/kader-dashboard' },
    { icon: FaUsers, label: 'Lansia', path: '/kader-lansia' },
    { icon: FaBaby, label: 'Balita', path: '/kader-balita' },
    { icon: FaStethoscope, label: 'Pemeriksaan Lansia', path: '/kader-pemeriksaan-lansia' },
    { icon: FaHeartbeat, label: 'Perkembangan Balita', path: '/kader-perkembangan-balita' },
    { icon: FaCalendarAlt, label: 'Kegiatan', path: '/kader-kegiatan' },
    { icon: FaCamera, label: 'Dokumentasi', path: '/kader-dokumentasi' },  // Calendar Icon for Events
    { icon: FaUserTie, label: 'Orang Tua', path: '/kader-orangtua' },  // Calendar Icon for Events
    { icon: FaUserShield, label: 'Wali', path: '/kader-wali' },
    { icon: FaCog, label: 'Pengaturan', path: '/kader-settings' }
  ];

  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleSubMenu = (label) => {
    setActiveSubMenu(activeSubMenu === label ? null : label);
  };

  return (
    <div
      className={`h-full pt-24 ${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-blue-800 to-purple-900 p-5 flex flex-col justify-between transition-all duration-500 ease-in-out text-white shadow-2xl relative rounded-tr-lg rounded-br-lg overflow-hidden`}>
      <div className="flex flex-col items-start">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.label}>
              {/* If the item has subItems, render it with toggle functionality */}
              {item.subItems ? (
                <div>
                  <div
                    onClick={() => toggleSubMenu(item.label)}
                    className={`flex items-center justify-between hover:bg-blue-700 hover:bg-opacity-20 p-2 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="flex items-center">
                      <item.icon className="mr-2" size={18} />
                      {!isCollapsed && (
                        <span className="transition-opacity duration-300 ease-in-out">
                          {item.label}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <span>
                        {activeSubMenu === item.label ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    )}
                  </div>

                  {/* Submenu items with smooth collapse */}
                  <div
                    className={`transition-max-height duration-300 ease-in-out overflow-hidden`}
                    style={{
                      maxHeight: activeSubMenu === item.label ? '1000px' : '0',
                    }}
                  >
                    <ul className="ml-6 space-y-2">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            to={subItem.path}
                            className="flex items-center hover:bg-blue-700 hover:bg-opacity-20 p-2 rounded-lg transition-colors duration-200 ease-in-out">
                            <subItem.icon className="mr-2" size={18} />
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center hover:bg-blue-700 hover:bg-opacity-20 p-2 rounded-lg transition-colors duration-200 ease-in-out ${isCollapsed ? 'justify-center' : ''}`}>
                  <item.icon className="mr-2" size={18} />
                  {!isCollapsed && (
                    <span className="transition-opacity duration-300 ease-in-out">
                      {item.label}
                    </span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
