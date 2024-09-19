import React, { useEffect, useState } from 'react';
import api from '../../api'; // Import the Axios instance
import { FaSpinner } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        
        const response = await api.get(`/stats/authenticated`);  // Include posyanduId in the request
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</h3>
                <p className="text-gray-500 text-lg mt-2">{stat.label}</p>
              </div>
              <div className={`text-4xl ${stat.textColor}`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
