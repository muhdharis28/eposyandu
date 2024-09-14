import React, { useState } from 'react';
import TopBar from '../TopBar'; // Ensure the correct path to the TopBar component
import SideBar from '../SideBar'; // Ensure the correct path to the SideBar component
import PenggunaList from './PenggunaList'; // Placeholder component for displaying users
import { useSidebar } from '../../SideBarContext'; // Use sidebar context for collapsible sidebar

const PenggunaDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state and toggler

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with sidebar toggle button */}
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar with collapsible functionality */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <div className={`flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out`}>
          <h1 className="text-3xl font-bold mb-4">Pengguna Dashboard</h1>
          <PenggunaList />
        
        </div>
      </div>
    </div>
  );
};

export default PenggunaDashboard;
