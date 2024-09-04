// KegiatanDashboard.js
import React, { useState } from 'react';
import SideBar from '../SideBar';
import KegiatanList from './KegiatanList';
import KegiatanForm from './KegiatanForm';
import Modal from '../Modal';

const KegiatanDashboard = () => {
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
    <div className="flex">
      <SideBar />
      <div className="flex-1 bg-gray-100 p-6">
        <KegiatanList onEditKegiatan={handleEditKegiatan} onAddKegiatan={handleAddKegiatan} /> 
        {showForm && ( 
            <Modal onClose={handleCloseForm}> 
                <KegiatanForm id={editingKegiatanId} onClose={handleCloseForm} /> 
            </Modal> 
        )} 
      </div> 
    </div> 
    ); 
};

export default KegiatanDashboard;
