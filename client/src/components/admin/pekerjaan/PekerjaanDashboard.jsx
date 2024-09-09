import React, { useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import PekerjaanList from './PekerjaanList';
import PekerjaanForm from './PekerjaanForm';
import Modal from '../Modal';
import { useSidebarAdmin } from '../SideBarContext'; // Import the sidebar context

const PekerjaanDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebarAdmin(); // Use context

  const [editingPekerjaanId, setEditingPekerjaanId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditPekerjaan = (id) => {
    setEditingPekerjaanId(id);
    setShowForm(true);
  };

  const handleAddPekerjaan = () => {
    setEditingPekerjaanId(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div
          className={`flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out`}
        >
          <h1 className="text-3xl font-bold mb-4">Pekerjaan Dashboard</h1>
          <PekerjaanList
            onEditPekerjaan={handleEditPekerjaan}
            onAddPekerjaan={handleAddPekerjaan}
          />
          {showForm && (
            <Modal onClose={handleCloseForm}>
              <PekerjaanForm id={editingPekerjaanId} onClose={handleCloseForm} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default PekerjaanDashboard;
