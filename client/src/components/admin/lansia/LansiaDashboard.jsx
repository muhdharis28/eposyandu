// LansiaDashboard.jsx
import React, { useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import LansiaList from './LansiaList'; // Import the list of Lansia
import Modal from '../Modal'; // For modal handling
import { useSidebar } from '../../SideBarContext'; // Use sidebar context for collapsible sidebar

const LansiaDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with toggle button for sidebar */}
      <TopBar onToggle={toggleSidebar} className="w-full" isCollapsed={isSidebarCollapsed} />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar with collapsible functionality */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out">
          <h1 className="text-3xl font-bold mb-4">Lansia Dashboard</h1>
          <LansiaList />
        </div>
      </div>
    </div>
  );
};

export default LansiaDashboard;
