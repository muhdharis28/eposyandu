import React, { useState } from 'react';
import SideBar from '../SideBar';
import PendidikanList from './PendidikanList';
import PendidikanForm from './PendidikanForm';
import Modal from '../Modal';

const PendidikanDashboard = () => {
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
    <div className="flex">
      <SideBar />
      <div className="flex-1 bg-gray-100 p-6">
        <PendidikanList onEditPendidikan={handleEditPendidikan} onAddPendidikan={handleAddPendidikan} />
        {showForm && (
          <Modal onClose={handleCloseForm}>
            <PendidikanForm id={editingPendidikanId} onClose={handleCloseForm} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default PendidikanDashboard;
