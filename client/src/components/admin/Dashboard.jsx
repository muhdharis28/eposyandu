// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats from the API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/stats`); // Adjust the URL based on your server configuration
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Dashboard</h2>
        <input
          type="text"
          placeholder="Search..."
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</h3>
                <p className="text-lg text-gray-600">{stat.label}</p>
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
