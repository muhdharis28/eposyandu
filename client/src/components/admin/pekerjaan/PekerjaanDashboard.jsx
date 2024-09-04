import React, { useState } from 'react';
import SideBar from '../SideBar';
import PekerjaanList from './PekerjaanList';
import PekerjaanForm from './PekerjaanForm';
import Modal from '../Modal';

const PekerjaanDashboard = () => {
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
    <div className="flex">
      <SideBar />
      <div className="flex-1 bg-gray-100 p-6">
        <PekerjaanList onEditPekerjaan={handleEditPekerjaan} onAddPekerjaan={handleAddPekerjaan} />
        {showForm && (
          <Modal onClose={handleCloseForm}>
            <PekerjaanForm id={editingPekerjaanId} onClose={handleCloseForm} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default PekerjaanDashboard;
