import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for active route
import {
  FaHome,
  FaUserMd,
  FaBriefcase,
  FaGraduationCap,
  FaCalendarAlt,
  FaStethoscope,
  FaHeartbeat,
  FaUserTie,
  FaCog,
  FaUserFriends,
  FaBaby,
  FaUser,
  FaUserShield,
  FaCamera
} from 'react-icons/fa';

const SideBar = ({ isCollapsed }) => {
  const location = useLocation();  // Get the current route

  const navItems = [
    { icon: FaHome, label: 'Dashboard', path: '/admin-dashboard' },  // Dashboard Home Icon
    { icon: FaUserMd, label: 'Dokter', path: '/dokter' },  // Doctor Icon for Doctors
    { icon: FaBriefcase, label: 'Pekerjaan', path: '/pekerjaan' },  // Work Icon for Pekerjaan
    { icon: FaGraduationCap, label: 'Pendidikan', path: '/pendidikan' },  // Graduation Cap for Education
    { icon: FaCalendarAlt, label: 'Kegiatan', path: '/kegiatan' },  // Calendar Icon for Events
    { icon: FaUserFriends, label: 'Lansia', path: '/lansia' },  // Users Icon for Elderly (Lansia)
    { icon: FaBaby, label: 'Balita', path: '/balita' },  // Baby Icon for Toddlers (Balita)
    { icon: FaUserTie, label: 'Orang Tua', path: '/orangtua' },  // User Tie for Parents
    { icon: FaUserShield, label: 'Wali', path: '/wali' },  // User Shield for Guardians
    { icon: FaStethoscope, label: 'Pemeriksaan Lansia', path: '/pemeriksaan-lansia' },  // Stethoscope Icon for Elderly Checkups
    { icon: FaHeartbeat, label: 'Perkembangan Balita', path: '/perkembangan-balita' },  // Heartbeat for Toddler Development
    { icon: FaUser, label: 'Pengguna', path: '/pengguna' },  // User Icon for Users
    { icon: FaCamera, label: 'Dokumentasi', path: '/dokumentasi' },  // Camera for Documentation
    { icon: FaCog, label: 'Pengaturan', path: '/settings' },  // Cog for Settings
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
