import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  FaCamera,
  FaClinicMedical,
  FaTrash
} from 'react-icons/fa';

const SideBar = ({ isCollapsed }) => {
  const location = useLocation();

  const groupedNavItems = [
    {
      groupLabel: 'Utama',
      items: [
        { icon: FaHome, label: 'Dashboard', path: '/admin-dashboard' }
      ]
    },
    {
      groupLabel: 'Manajemen',
      items: [
        { icon: FaUserMd, label: 'Dokter', path: '/dokter' },
        { icon: FaClinicMedical, label: 'Posyandu', path: '/posyandu' },
        { icon: FaBriefcase, label: 'Pekerjaan', path: '/pekerjaan' },
        { icon: FaGraduationCap, label: 'Pendidikan', path: '/pendidikan' },
        { icon: FaTrash, label: 'Penghapusan Data', path: '/penghapusan-data' }
      ]
    },
    {
      groupLabel: 'Aktifitas',
      items: [
        { icon: FaCalendarAlt, label: 'Kegiatan', path: '/kegiatan' },
        { icon: FaCamera, label: 'Dokumentasi', path: '/dokumentasi' }
      ]
    },
    {
      groupLabel: 'Data',
      items: [
        { icon: FaUser, label: 'Pengguna', path: '/pengguna' },
        { icon: FaUserFriends, label: 'Lansia', path: '/lansia' },
        { icon: FaBaby, label: 'Balita', path: '/balita' },
        { icon: FaUserTie, label: 'Orang Tua', path: '/orangtua' },
        { icon: FaUserShield, label: 'Wali', path: '/wali' },
        { icon: FaStethoscope, label: 'Pemeriksaan Lansia', path: '/pemeriksaan-lansia' },
        { icon: FaHeartbeat, label: 'Perkembangan Balita', path: '/perkembangan-balita' }
      ]
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`h-full pt-24 ${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-blue-800 to-purple-900 p-5 flex flex-col justify-between transition-all duration-500 text-white shadow-xl rounded-tr-lg`}
    >
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
                    className={`flex items-center p-2 rounded-lg transition-colors ${
                      isActive(item.path) ? 'bg-blue-700' : 'hover:bg-blue-700'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <item.icon className="mr-2" size={18} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-b border-gray-600 my-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
