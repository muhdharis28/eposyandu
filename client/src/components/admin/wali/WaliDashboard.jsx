import React from 'react';
import TopBar from '../TopBar'; // Adjust the path if necessary
import SideBar from '../SideBar';
import WaliList from './WaliList';
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context

const DokterDashboard = () => {
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
          <h1 className="text-3xl font-bold mb-4">Dokter Dashboard</h1>
          <WaliList/>
        </div>
      </div>
    </div>
  );
};

export default DokterDashboard;
