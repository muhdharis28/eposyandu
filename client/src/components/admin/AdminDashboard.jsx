import React from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import Dashboard from './Dashboard';
import { useSidebar } from '../SideBarContext';

const AdminDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} isCollapsed={isSidebarCollapsed} />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className={`flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out`}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
