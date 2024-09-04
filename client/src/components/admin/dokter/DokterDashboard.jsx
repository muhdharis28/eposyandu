// DokterDashboard.js
import React, { useState } from 'react';
import SideBar from '../SideBar';
import DokterList from './DokterList';
import DokterForm from './DokterForm';
import Modal from '../Modal';

const DokterDashboard = () => {
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditDoctor = (id) => {
    setEditingDoctorId(id);
    setShowForm(true);
  };

  const handleAddDoctor = () => {
    setEditingDoctorId(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 bg-gray-100 p-6">
        <DokterList onEditDoctor={handleEditDoctor} onAddDoctor={handleAddDoctor} />
        {showForm && (
          <Modal onClose={handleCloseForm}>
            <DokterForm id={editingDoctorId} onClose={handleCloseForm} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default DokterDashboard;
