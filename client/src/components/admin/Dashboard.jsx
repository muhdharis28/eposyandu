import React, { useEffect, useState } from 'react';
import api from '../../api';
import {getPosyandus} from '../PosyanduService';

const API_URL = '/stats';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posyanduList, setPosyanduList] = useState([]);
  const [selectedPosyandu, setSelectedPosyandu] = useState('');

  const fetchStats = async (posyandu = '') => {
    try {
      setLoading(true);
      const response = await api.get(API_URL, {
        params: { posyandu },
      });
      setStats(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch stats');
      setLoading(false);
    }
  };

  const fetchPosyanduList = async () => {
    try {
      const response = await getPosyandus();
      setPosyanduList(response.data);
    } catch (err) {
      console.error('Failed to fetch posyandu list:', err);
    }
  };

  useEffect(() => {
    fetchPosyanduList();
    fetchStats();
  }, []);

  const handlePosyanduChange = (e) => {
    const posyandu = e.target.value;
    setSelectedPosyandu(posyandu);
    fetchStats(posyandu);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-64 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 min-h-screen mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <select
          className="p-2 border rounded-md"
          value={selectedPosyandu}
          onChange={handlePosyanduChange}
        >
          <option value="">Semua Posyandu</option>
          {posyanduList.map((posyandu) => (
            <option key={posyandu.id} value={posyandu.id}>
              {posyandu.nama}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
