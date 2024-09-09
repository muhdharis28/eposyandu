import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaChartBar,
  FaUserMd,
  FaBriefcase,
  FaGraduationCap,
  FaCalendarAlt,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaPowerOff,
} from 'react-icons/fa';

const SideBar = ({ isCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { icon: FaHome, label: 'Dashboard', path: '/admin-dashboard' },
    { icon: FaChartBar, label: 'Data', path: '/data' },
    { icon: FaUserMd, label: 'Dokter', path: '/dokter' },
    { icon: FaBriefcase, label: 'Pekerjaan', path: '/pekerjaan' },
    { icon: FaGraduationCap, label: 'Pendidikan', path: '/pendidikan' },
    { icon: FaCalendarAlt, label: 'Kegiatan', path: '/kegiatan' },
    { icon: FaUsers, label: 'Pasien', path: '/patient' },
    { icon: FaFileAlt, label: 'Laporan', path: '/report' },
    { icon: FaCog, label: 'Pengaturan', path: '/settings' },
  ];

  return (
    <div
      className={`h-full ${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-gradient-to-br from-blue-800 to-purple-900 p-5 flex flex-col justify-between transition-all duration-500 ease-in-out text-white shadow-2xl relative rounded-tr-lg rounded-br-lg overflow-hidden`}
    >
      <div className="flex flex-col items-start">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`flex items-center hover:bg-blue-700 hover:bg-opacity-20 p-2 rounded-lg transition-colors duration-200 ease-in-out ${
                  isCollapsed ? 'justify-center' : ''
                }`}
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
