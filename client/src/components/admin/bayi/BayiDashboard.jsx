import React, { useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import BayiList from './BayiList';
import BayiForm from './BayiForm';
import BayiDetail from './BayiDetail'; // Import BayiDetail component
import Modal from '../Modal';
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context

const BayiDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  const [editingBayiId, setEditingBayiId] = useState(null);
  const [viewingBayiId, setViewingBayiId] = useState(null); // State for viewing details
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false); // State to show details modal

  const handleEditBayi = (id) => {
    setEditingBayiId(id);
    setShowForm(true);
  };

  const handleAddBayi = () => {
    setEditingBayiId(null);
    setShowForm(true);
  };

  const handleViewDetail = (id) => {
    setViewingBayiId(id);
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
          <h1 className="text-3xl font-bold mb-4">Bayi Dashboard</h1>
          <BayiList
            onEditBayi={handleEditBayi}
            onAddBayi={handleAddBayi}
            onViewDetail={handleViewDetail}
          />
          {showForm && (
            <Modal onClose={handleCloseForm}>
              <BayiForm id={editingBayiId} onClose={handleCloseForm} />
            </Modal>
          )}
          {showDetail && (
            <Modal onClose={handleCloseDetail}>
              <BayiDetail id={viewingBayiId} onClose={handleCloseDetail} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default BayiDashboard;
