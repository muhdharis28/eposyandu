import React from 'react';
import Sidebar from './SideBar';
import Dashboard from './Dashboard';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6">
        <Dashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
