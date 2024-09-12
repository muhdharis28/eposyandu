import React from 'react';
import TopBar from '../TopBar'; // Adjust the path to your TopBar component
import SideBar from '../SideBar'; // Adjust the path to your SideBar component
import PendidikanList from './PendidikanList'; // Import the Pekerjaan list component
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context for collapse/expand functionality

const PendidikanDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with sidebar toggle button */}
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar with collapsible functionality */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out">
          <h1 className="text-3xl font-bold mb-4">Pendidikan Dashboard</h1>
          {/* Render the list of Pendidikan */}
          <PendidikanList />
        </div>
      </div>
    </div>
  );
};

export default PendidikanDashboard;
