import React from 'react';
import heroImage from '@/assets/hero.png'; // Import the image
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
    <div className="container mx-auto flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 text-left md:pr-10 lg:pr-16">
        <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
          Selamat Datang Di Website <span className="text-blue-600">ePosyandu Bintan</span>
        </h2>
        <p className="text-gray-700 mt-4 leading-relaxed mb-6">
          Website posyandu Bintan menyediakan informasi kesehatan meliputi data balita, ibu hamil, dokumentasi kegiatan dan jadwal kesehatan.
        </p>
      </div>
      <div className="md:w-1/2 mt-10 md:mt-0 lg:mt-0 relative flex justify-center items-center">
        <div className="relative">
          <img
            src={heroImage}
            alt="Family"
            className="w-full h-auto max-w-md rounded-lg shadow-xl transform hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30 rounded-lg"></div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
