import React, { useState } from 'react';
import TopBar from '../TopBar'; // Adjust the path if needed
import SideBar from '../SideBar';
import KegiatanList from './KegiatanList';
import KegiatanForm from './KegiatanForm';
import Modal from '../Modal';
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context

const KegiatanDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state
  const [editingKegiatanId, setEditingKegiatanId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditKegiatan = (id) => {
    setEditingKegiatanId(id);
    setShowForm(true);
  };

  const handleAddKegiatan = () => {
    setEditingKegiatanId(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with toggle button for sidebar */}
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar with collapsible functionality */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <div
          className={`flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out`}
        >
          <h1 className="text-3xl font-bold mb-4">Kegiatan Dashboard</h1>
          <KegiatanList
            onEditKegiatan={handleEditKegiatan}
            onAddKegiatan={handleAddKegiatan}
          />
          {showForm && (
            <Modal onClose={handleCloseForm}>
              <KegiatanForm id={editingKegiatanId} onClose={handleCloseForm} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default KegiatanDashboard;
