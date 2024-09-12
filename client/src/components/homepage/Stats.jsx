import React, { useEffect, useState } from 'react';
import { FaClinicMedical, FaBaby, FaUserMd, FaUserAlt, FaCalendarAlt } from 'react-icons/fa'; // Add necessary icons

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch stats from the backend API
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stats`); // Adjust the path as needed
        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load stats.');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // A function to dynamically map icons based on the label
  const getIcon = (label) => {
    switch (label) {
      case 'User':
        return <FaUserAlt className="text-purple-500 text-5xl mb-4" />;
      case 'Kegiatan':
        return <FaCalendarAlt className="text-blue-500 text-5xl mb-4" />;
      case 'Kader':
        return <FaClinicMedical className="text-pink-500 text-5xl mb-4" />;
      case 'Bayi':
        return <FaBaby className="text-yellow-500 text-5xl mb-4" />;
      case 'Lansia':
        return <FaUserMd className="text-teal-500 text-5xl mb-4" />;
      default:
        return <FaUserAlt className="text-gray-500 text-5xl mb-4" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 lg:px-20">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">Statistik Posyandu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map(stat => (
            <div
              key={stat.label}
              className={`p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105 hover:shadow-2xl ${stat.bgColor}`}
            >
              <div className="flex justify-center items-center mb-4">
                {getIcon(stat.label)}
              </div>
              <p className={`text-4xl font-bold ${stat.textColor}`}>{stat.value}</p>
              <p className="text-lg text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
