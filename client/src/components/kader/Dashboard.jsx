import React, { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bayi');

  // Stats for each tab
  const bayiStats = [
    { label: 'User', value: 18, icon: '👤', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
    { label: 'Kegiatan', value: 132, icon: '📅', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
    { label: 'Kader', value: 4, icon: '👩‍⚕️', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
    { label: 'Bayi', value: 5, icon: '👶', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' }
  ];

  const lansiaStats = [
    { label: 'User', value: 18, icon: '👤', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
    { label: 'Kegiatan', value: 132, icon: '📅', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
    { label: 'Kader', value: 4, icon: '👩‍⚕️', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
    { label: 'Lansia', value: 4, icon: '👵', bgColor: 'bg-teal-100', textColor: 'text-teal-700' }
  ];

  // Determine which stats to display based on the active tab
  const stats = activeTab === 'bayi' ? bayiStats : lansiaStats;

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <div className="flex mb-4 border-b-2 border-gray-300">
        <button
          onClick={() => setActiveTab('bayi')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'bayi' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          Bayi
        </button>
        <button
          onClick={() => setActiveTab('lansia')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'lansia' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          Lansia
        </button>
      </div>

      {/* Search and Stats Section */}
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{activeTab === 'bayi' ? 'Dashboard Bayi' : 'Dashboard Lansia'}</h2>
        <input
          type="text"
          placeholder="Cari..."
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Stats Display */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bgColor} p-4 rounded-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-xl font-bold ${stat.textColor}`}>{stat.value}</h3>
                <p className="text-gray-500">{stat.label}</p>
              </div>
              <div className={`text-3xl ${stat.textColor}`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
