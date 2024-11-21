import React, {useEffect, useState} from 'react';
import {FaClinicMedical, FaBaby, FaUserMd, FaUserAlt, FaCalendarAlt} from 'react-icons/fa';

const Stats = ({selectedPosyandu}) => {
  const [stats,
    setStats] = useState([]);
  const [error,
    setError] = useState(null);

  useEffect(() => {
    const fetchStats = async() => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stats?posyandu=${selectedPosyandu}`);
        const data = await response.json();
        setStats(data);

      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load stats.');
      }
    };

    fetchStats();

  }, [selectedPosyandu]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const getIcon = (label) => {
    switch (label) {
      case 'User':
        return <FaUserAlt className="text-purple-500 text-3xl mb-2"/>;
      case 'Kegiatan':
        return <FaCalendarAlt className="text-blue-500 text-3xl mb-2"/>;
      case 'Kader':
        return <FaClinicMedical className="text-pink-500 text-3xl mb-2"/>;
      case 'Bayi':
        return <FaBaby className="text-yellow-500 text-3xl mb-2"/>;
      case 'Lansia':
        return <FaUserMd className="text-teal-500 text-3xl mb-2"/>;
      default:
        return <FaUserAlt className="text-gray-500 text-3xl mb-2"/>;
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-blue-600 to-blue-400">
      <div className="container mx-auto px-4 lg:px-16">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Statistik Posyandu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="flex justify-center items-center mb-2">
                {getIcon(stat.label)}
              </div>
              <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              <p className="text-base text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
