import React, { useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import KegiatanList from './KegiatanList';
import { useSidebar } from '../../SideBarContext';

const KegiatanDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [showForm, setShowForm] = useState(false);

  const handleAddKegiatan = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" isCollapsed={isSidebarCollapsed} />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div
          className={`flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out`}
        >
          <h1 className="text-3xl font-bold mb-4">Kegiatan Dashboard</h1>
          <KegiatanList onAddKegiatan={handleAddKegiatan} />

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
