import React from 'react';
import logo from '@/assets/posyandu.png';

const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white rounded-lg shadow-lg ">
    <div className="w-full max-w-screen-xl mx-auto p-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-4">
          <img src={logo} className="h-10" alt="ePosyandu Tanjungpinang Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">ePosyandu Tanjungpinang</span>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-200 sm:mb-0">
          <li>
            <a href="#about" className="hover:underline mr-4 md:mr-6 transition duration-300 ease-in-out">Beranda</a>
          </li>
          <li>
            <a href="#privacy" className="hover:underline mr-4 md:mr-6 transition duration-300 ease-in-out">Jadwal Kegiatan</a>
          </li>
          <li>
            <a href="#licensing" className="hover:underline mr-4 md:mr-6 transition duration-300 ease-in-out">Dokumentasi</a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-500 sm:mx-auto dark:border-gray-400 lg:my-8" />
      <span className="block text-sm text-gray-200 text-center mt-4">
        &copy; {new Date().getFullYear()} <a href="#" className="hover:underline">ePosyandu Tanjungpinang™</a>. All Rights Reserved.
      </span>
      <span className="block text-sm text-gray-200 text-center">
        Designed and developed by STTI
      </span>
    </div>
  </footer>
);

export default Footer;
