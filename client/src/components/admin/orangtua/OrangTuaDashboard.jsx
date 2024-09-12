import React, { useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import OrangtuaList from './OrangTuaList'; // Import the OrangtuaList component
import OrangtuaForm from './OrangTuaForm'; // Import the OrangtuaForm component
import OrangtuaDetail from './OrangTuaDetail'; // Import the OrangtuaDetail component
import Modal from '../Modal';
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context

const OrangtuaDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  const [editingOrangtuaId, setEditingOrangtuaId] = useState(null);
  const [viewingOrangtuaId, setViewingOrangtuaId] = useState(null); // State for viewing details
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false); // State to show details modal

  const handleEditOrangtua = (id) => {
    setEditingOrangtuaId(id);
    setShowForm(true);
  };

  const handleAddOrangtua = () => {
    setEditingOrangtuaId(null);
    setShowForm(true);
  };

  const handleViewDetail = (id) => {
    setViewingOrangtuaId(id);
    setShowDetail(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out">
          <h1 className="text-3xl font-bold mb-4">Orangtua Dashboard</h1>
          <OrangtuaList
            onEditOrangtua={handleEditOrangtua}
            onAddOrangtua={handleAddOrangtua}
            onViewDetail={handleViewDetail}
          />
          {showForm && (
            <Modal onClose={handleCloseForm}>
              <OrangtuaForm id={editingOrangtuaId} onClose={handleCloseForm} />
            </Modal>
          )}
          {showDetail && (
            <Modal onClose={handleCloseDetail}>
              <OrangtuaDetail id={viewingOrangtuaId} onClose={handleCloseDetail} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrangtuaDashboard;
