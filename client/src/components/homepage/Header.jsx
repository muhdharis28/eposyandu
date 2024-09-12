import React from 'react';
import { FaHome, FaCalendarAlt, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '@/assets/posyandu.png';

const Header = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  let dashboardLink = "/register"; // Default to registration
  if (role === 'admin') {
    dashboardLink = "/admin-dashboard";
  } else if (role === 'kader') {
    dashboardLink = "/kader-dashboard";
  } else if (role === 'user') {
    dashboardLink = "/user-dashboard";
  }

  // Reusable Button Style
  const buttonStyle =
    "px-6 py-2 rounded-full shadow-md transition duration-300 transform hover:scale-105 hover:-translate-y-1";
  
  const dashboardButtonStyle =
    "bg-white text-blue-600 " + buttonStyle + " hover:bg-gray-100";
  
  const registerButtonStyle =
    "bg-white text-blue-600 " + buttonStyle + " hover:bg-gray-100";
  
  const loginButtonStyle =
    "bg-white text-blue-600 " + buttonStyle + " hover:bg-gray-100";

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center shadow-lg mr-3">
            <img src={logo} className="h-10" alt="ePosyandu Tanjungpinang Logo" />
          </div>
          <h1 className="text-2xl font-bold text-white">ePosyandu Tanjungpinang</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#home" className="text-white flex items-center space-x-2 hover:text-gray-200 transition duration-300">
            <FaHome className="text-lg" />
            <span>Beranda</span>
          </a>
          <a href="#jadwal" className="text-white flex items-center space-x-2 hover:text-gray-200 transition duration-300">
            <FaCalendarAlt className="text-lg" />
            <span>Jadwal Kegiatan</span>
          </a>
          <a href="#dokumentasi" className="text-white flex items-center space-x-2 hover:text-gray-200 transition duration-300">
            <FaCamera className="text-lg" />
            <span>Dokumentasi</span>
          </a>
          {token ? (
            <Link to={dashboardLink} className={dashboardButtonStyle}>
              DASHBOARD
            </Link>
          ) : (
            <>
              <Link to="/register" className={registerButtonStyle}>
                DAFTAR
              </Link>
              <Link to="/login" className={loginButtonStyle}>
                MASUK
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
