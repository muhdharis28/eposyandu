import React from 'react';
import TopBar from '../TopBar'; // Adjust the path if necessary
import SideBar from '../SideBar';
import DokumentasiList from './DokumentasiList';
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context

const DokumentasiDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with toggle button for sidebar */}
      <TopBar onToggle={toggleSidebar} className="w-full" isCollapsed={isSidebarCollapsed} />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar with collapsible functionality */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <div
          className={`flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out`}
        >
          <h1 className="text-3xl font-bold mb-4">Dokumentasi Dashboard</h1>
          <DokumentasiList/>
        </div>
      </div>
    </div>
  );
};

export default DokumentasiDashboard;
