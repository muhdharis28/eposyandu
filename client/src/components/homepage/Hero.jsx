import React from 'react';
import heroImage from '@/assets/hero.png'; // Import the image
import { Link } from 'react-router-dom';

const Hero = () => (
  <section id="home" className="relative bg-gradient-to-b from-[#008EB3] to-blue-600 py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
    <div className="container mx-auto flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 text-left md:pr-10 lg:pr-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-10">
          Selamat Datang Di Website <span className="text-white">ePosyandu Tanjungpinang</span>
        </h2>
        <p className="text-white mt-4 leading-relaxed mb-6">
          Website posyandu Tanjungpinang menyediakan informasi kesehatan meliputi data balita, ibu hamil, dokumentasi kegiatan dan jadwal kesehatan.
        </p>
        <Link
          to="/register"
          className="bg-white text-[#008EB3] px-6 py-2 rounded-full shadow-md transition duration-300 transform hover:scale-105 hover:bg-[#008EB3] hover:text-white border-2 border-white"
        >
          Daftar Sekarang
        </Link>
      </div>
      <div className="md:w-1/2 mt-10 md:mt-0 lg:mt-0 relative flex justify-center items-center">
        <div className="relative">
        <img
  src={heroImage}
  alt="Family"
  className="w-full h-auto max-w-xl rounded-lg shadow-xl transform hover:scale-105 transition duration-300"
/>

          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30 rounded-lg"></div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
