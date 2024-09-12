import React, { useState } from 'react';
import TopBar from '../TopBar'; // Adjust the path if needed
import SideBar from '../SideBar';
import KegiatanList from './KegiatanList'; // Component to list all kegiatan
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context

const KegiatanDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state
  const [showForm, setShowForm] = useState(false);

  const handleAddKegiatan = () => {
    setShowForm(true); // Show form to add a new kegiatan
  };

  const handleCloseForm = () => {
    setShowForm(false); // Close the form when finished or canceled
  };

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
          <h1 className="text-3xl font-bold mb-4">Kegiatan Dashboard</h1>
          <KegiatanList onAddKegiatan={handleAddKegiatan} />

          {/* Show form when adding or editing kegiatan */}
          {showForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <KegiatanForm onClose={handleCloseForm} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KegiatanDashboard;
