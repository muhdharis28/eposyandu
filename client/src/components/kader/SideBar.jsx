import React from 'react';
import { FaChild, FaUserFriends, FaClipboardList, FaSyringe, FaStar } from 'react-icons/fa';

const SideBar = ({ isCollapsed }) => {
  // Menu items for the sidebar
  const menuItems = [
    { label: 'Data Anak', icon: <FaChild />, path: '/data-anak' },
    { label: 'Data Ortu', icon: <FaUserFriends />, path: '/data-ortu' },
    { label: 'Data PA', icon: <FaClipboardList />, path: '/data-pa' },
    { label: 'Data Imunisasi', icon: <FaSyringe />, path: '/data-imunisasi' },
    { label: 'Data Kunjungan Bulanan', icon: <FaStar />, path: '/data-kunjungan' },
    { label: 'Laporan Rekapitulasi', icon: <FaClipboardList />, path: '/laporan-rekapitulasi' },
  ];

  return (
    <div className={`bg-white shadow-md ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <nav className="h-full flex flex-col py-4">
        {/* Render each menu item */}
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.path}
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-300`}
          >
            <div className="text-lg">{item.icon}</div>
            {!isCollapsed && <span className="ml-4">{item.label}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
