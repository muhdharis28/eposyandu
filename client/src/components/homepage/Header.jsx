import React from 'react';
import { FaHome, FaCalendarAlt, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '@/assets/silaba.png';

const Header = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  let dashboardLink = "/register";
  if (role === 'admin') {
    dashboardLink = "/admin-dashboard";
  } else if (role === 'kader') {
    dashboardLink = "/kader-dashboard";
  } else if (role === 'user') {
    dashboardLink = "/user-dashboard";
  }

  const buttonStyle =
    "px-6 py-2 rounded-full shadow-md transition duration-300 transform hover:scale-105 hover:-translate-y-1";

  const dashboardButtonStyle =
    `bg-[#008EB3] text-white ${buttonStyle} hover:bg-white hover:text-[#008EB3] border-2 border-white`;

  const registerButtonStyle =
    `bg-[#008EB3] text-white ${buttonStyle} hover:bg-white hover:text-[#008EB3] border-2 border-white`;

  const loginButtonStyle =
    `bg-[#008EB3] text-white ${buttonStyle} hover:bg-white hover:text-[#008EB3] border-2 border-white`;

  return (
    <header className="bg-gradient-to-r from-[#008EB3] to-[#008EB3] p-6 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg mr-4">
            <img src={logo} className="h-10" alt="SiLaBa Tanjungpinang Logo" />
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            SiLaBa Tanjungpinang
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <nav className="flex items-center space-x-6 mr-5">
            <a href="#home" className="text-white flex items-center space-x-2 hover:text-gray-200 transition duration-300">
              <FaHome className="text-xl" />
              <span className="text-lg">Beranda</span>
            </a>

            <a href="#jadwal" className="text-white flex items-center space-x-2 hover:text-gray-200 transition duration-300">
              <FaCalendarAlt className="text-xl" />
              <span className="text-lg">Jadwal Kegiatan</span>
            </a>

            <a href="#dokumentasi" className="text-white flex items-center space-x-2 hover:text-gray-200 transition duration-300">
              <FaCamera className="text-xl" />
              <span className="text-lg">Dokumentasi</span>
            </a>
          </nav>

          <nav className="flex items-center space-x-3">
            {token ? (
              <Link to={dashboardLink} className={`${dashboardButtonStyle} ml-12`}>
                DASHBOARD
              </Link>
            ) : (
              <>
                <Link to="/register" className={`${registerButtonStyle} ml-12`}>
                  DAFTAR
                </Link>
                <Link to="/login" className={`${loginButtonStyle} ml-4`}>
                  MASUK
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
      <hr className="border-t-1 border-gray-300 mt-6" />
    </header>
  );
};

export default Header;
