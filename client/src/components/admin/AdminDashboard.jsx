import React from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import Dashboard from './Dashboard';
import { useSidebarAdmin } from './SideBarContext'; // Import the sidebar context

const AdminDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebarAdmin(); // Use context

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div
          className={`flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out`}
        >
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;