import React from 'react';
import { FaClinicMedical, FaBaby, FaUserMd } from 'react-icons/fa'; // Importing appropriate icons

const stats = [
  { id: 1, label: 'Total Kader', value: 0, icon: <FaClinicMedical className="text-blue-500 text-5xl mb-4" /> },
  { id: 2, label: 'Total Balita', value: 0, icon: <FaBaby className="text-pink-500 text-5xl mb-4" /> },
  { id: 3, label: 'Total Lansia', value: 0, icon: <FaUserMd className="text-yellow-500 text-5xl mb-4" /> },
];

const Stats = () => (
  <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
    <div className="container mx-auto px-4 lg:px-20">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">Statistik Posyandu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map(stat => (
          <div key={stat.id} className="p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center items-center mb-4">
              {stat.icon}
            </div>
            <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-lg text-gray-600 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
