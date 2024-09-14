import React from 'react';
import logo from '@/assets/posyandu.png';

const Footer = () => (
  <footer className="bg-gradient-to-b from-[#008EB3] to-[#008EB3] text-white shadow-lg pt-10 px-6">
    <hr className="border-t-1 border-gray-300 mb-5" />
    <div className="w-full max-w-screen-xl mx-auto p-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-4">
          <div className="bg-white h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg">
            <img src={logo} className="h-10" alt="ePosyandu Tanjungpinang Logo" />
          </div>
          <span className="self-center text-xl font-semibold whitespace-nowrap">ePosyandu Tanjungpinang</span>
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
