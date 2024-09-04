import React from 'react';

const Dashboard = () => {
  const stats = [
    { label: 'User', value: 18, icon: '👤', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
    { label: 'Kegiatan', value: 132, icon: '📅', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
    { label: 'Kader', value: 4, icon: '👩‍⚕️', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
    { label: 'Orangtua', value: 3, icon: '🧑‍🤝‍🧑', bgColor: 'bg-green-100', textColor: 'text-green-700' },
    { label: 'Bayi', value: 5, icon: '👶', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
    { label: 'Lansia', value: 4, icon: '👵', bgColor: 'bg-teal-100', textColor: 'text-teal-700' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <input
          type="text"
          placeholder="Cari..."
          className="p-2 border border-gray-300 rounded"
        />
      </div>
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
