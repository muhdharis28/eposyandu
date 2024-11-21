import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaStethoscope, FaHeartbeat, FaCog, FaBaby, FaChevronDown, FaChevronUp, FaCalendarAlt, FaCamera, FaUserTie, FaUserShield } from 'react-icons/fa';

const SideBar = ({ isCollapsed }) => {

  const groupedNavItems = [
    {
      groupLabel: 'Main',
      items: [
        { icon: FaHome, label: 'Dashboard', path: '/kader-dashboard' },
        { icon: FaCalendarAlt, label: 'Kegiatan', path: '/kader-kegiatan' },
        { icon: FaCamera, label: 'Dokumentasi', path: '/kader-dokumentasi' }
      ]
    },
    {
      groupLabel: 'Data',
      items: [
        { icon: FaUsers, label: 'Lansia', path: '/kader-lansia' },
        { icon: FaBaby, label: 'Balita', path: '/kader-balita' },
        { icon: FaStethoscope, label: 'Pemeriksaan Lansia', path: '/kader-pemeriksaan-lansia' },
        { icon: FaHeartbeat, label: 'Perkembangan Balita', path: '/kader-perkembangan-balita' },
        { icon: FaUserTie, label: 'Orang Tua', path: '/kader-orangtua' },
        { icon: FaUserShield, label: 'Wali', path: '/kader-wali' }
      ]
    },
    {
      groupLabel: 'Settings',
      items: [
        { icon: FaCog, label: 'Pengaturan', path: '/kader-settings' }
      ]
    }
  ];

  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleSubMenu = (label) => {
    setActiveSubMenu(activeSubMenu === label ? null : label);
  };

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
                    className={`flex items-center hover:bg-blue-700 hover:bg-opacity-20 p-2 rounded-lg transition-colors duration-200 ease-in-out ${isCollapsed ? 'justify-center' : ''}`}>
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
