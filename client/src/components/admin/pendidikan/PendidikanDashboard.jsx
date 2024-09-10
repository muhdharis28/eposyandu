import React, { useState } from 'react';
import TopBar from '../TopBar'; // Adjust the path if needed
import SideBar from '../SideBar';
import PendidikanList from './PendidikanList';
import PendidikanForm from './PendidikanForm';
import Modal from '../Modal';
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context

const PendidikanDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state
  const [editingPendidikanId, setEditingPendidikanId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditPendidikan = (id) => {
    setEditingPendidikanId(id);
    setShowForm(true);
  };

  const handleAddPendidikan = () => {
    setEditingPendidikanId(null);
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
          <h1 className="text-3xl font-bold mb-4">Pendidikan Dashboard</h1>
          <PendidikanList
            onEditPendidikan={handleEditPendidikan}
            onAddPendidikan={handleAddPendidikan}
          />
          {showForm && (
            <Modal onClose={handleCloseForm}>
              <PendidikanForm id={editingPendidikanId} onClose={handleCloseForm} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendidikanDashboard;
