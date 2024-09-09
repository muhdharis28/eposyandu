import React, { useState } from 'react';
import TopBar from '../TopBar'; // Ensure the correct path to the TopBar component
import SideBar from '../SideBar'; // Ensure the correct path to the SideBar component
import PenggunaList from './PenggunaList'; // Placeholder component for displaying users
import PenggunaForm from './PenggunaForm'; // Placeholder form component for adding/editing users
import Modal from '../Modal'; // Modal component for showing the form
import { useSidebarAdmin } from '../SideBarContext'; // Use sidebar context for collapsible sidebar

const PenggunaDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebarAdmin(); // Sidebar state and toggler
  const [editingPenggunaId, setEditingPenggunaId] = useState(null); // State for tracking which user is being edited
  const [showForm, setShowForm] = useState(false); // State for showing/hiding the form

  // Function to handle editing an existing user
  const handleEditPengguna = (id) => {
    setEditingPenggunaId(id);
    setShowForm(true);
  };

  // Function to handle adding a new user
  const handleAddPengguna = () => {
    setEditingPenggunaId(null);
    setShowForm(true);
  };

  // Function to close the form modal
  const handleCloseForm = () => {
    setShowForm(false);
  };

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
          <PenggunaList onEditPengguna={handleEditPengguna} onAddPengguna={handleAddPengguna} />
          
          {/* Modal for adding/editing users */}
          {showForm && (
            <Modal onClose={handleCloseForm}>
              <PenggunaForm id={editingPenggunaId} onClose={handleCloseForm} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default PenggunaDashboard;
