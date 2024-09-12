import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for active route
import {
  FaHome,
  FaUserMd,
  FaBriefcase,
  FaGraduationCap,
  FaCalendarAlt,
  FaFileAlt,
  FaCog,
  FaUserFriends,
  FaBaby,
  FaUsers,
  FaCamera
} from 'react-icons/fa';

const SideBar = ({ isCollapsed }) => {
  const location = useLocation();  // Get the current route

  const navItems = [
    { icon: FaHome, label: 'Dashboard', path: '/admin-dashboard' },
    { icon: FaUserMd, label: 'Dokter', path: '/dokter' },
    { icon: FaBriefcase, label: 'Pekerjaan', path: '/pekerjaan' },
    { icon: FaGraduationCap, label: 'Pendidikan', path: '/pendidikan' },
    { icon: FaCalendarAlt, label: 'Kegiatan', path: '/kegiatan' },
    { icon: FaUserFriends, label: 'Lansia', path: '/lansia' },
    { icon: FaBaby, label: 'Balita', path: '/balita' },
    { icon: FaUsers, label: 'Orang Tua', path: '/orangtua' },
    { icon: FaUsers, label: 'Wali', path: '/wali' },
    { icon: FaUsers, label: 'Pengguna', path: '/pengguna' },
    { icon: FaCamera, label: 'Dokumentasi', path: '/dokumentasi' },
    { icon: FaFileAlt, label: 'Laporan', path: '/report' },
    { icon: FaCog, label: 'Pengaturan', path: '/settings' },
  ];

  return (
    <div
      className={`h-full pt-24 ${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-blue-800 to-purple-900 p-5 flex flex-col justify-between transition-all duration-500 text-white shadow-xl rounded-tr-lg`}
    >
      <ul className="space-y-6">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              to={item.path}
              className={`flex items-center p-2 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`}
            >
              <item.icon className="mr-2" size={18} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
