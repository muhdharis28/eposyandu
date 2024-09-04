import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // Import InputText for search
import { getDoctors, deleteDoctor } from './DokterService'; // Your API services
import DokterForm from './DokterForm'; // Form component for add/edit
import DokterDetail from './DokterDetail'; // Detail component for viewing doctor information

const DokterList = () => {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false); // State for showing detail view
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State for the selected doctor to view details
  const [globalFilter, setGlobalFilter] = useState(''); // State for global filter
  const [error, setError] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const result = await getDoctors();
      const data = result.data;
      setDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load doctor data or unauthorized.');
      console.error('Failed to load doctor data:', error);
    }
  };

  const refreshList = () => {
    loadDoctors();
  };

  const handleAddDoctor = () => {
    setEditingDoctorId(null);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleEditDoctor = (id) => {
    setEditingDoctorId(id);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus dokter ini?');
    if (confirmDelete) {
      try {
        await deleteDoctor(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete doctor or unauthorized.');
        console.error('Failed to delete doctor:', error);
      }
    }
  };

  const handleViewDetail = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetail(true);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingDoctorId(null);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedDoctor(null);
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value); // Update global filter state
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <InputText
          value={globalFilter}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
          className="p-inputtext-sm w-full md:w-30rem"
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-end gap-2">
        <Button
          label="Detail"
          icon="pi pi-eye"
          className="p-button-text bg-blue-400 text-white hover:bg-blue-500 px-3 py-2"
          onClick={() => handleViewDetail(rowData)}
        />
        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="p-button-text bg-blue-500 text-white hover:bg-blue-600 px-3 py-2"
          onClick={() => handleEditDoctor(rowData.id)}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-text bg-red-500 text-white hover:bg-red-600 px-3 py-2"
          onClick={() => handleDelete(rowData.id)}
        />
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Data Master Dokter</h2>
        {!showForm && !showDetail && (
          <Button
            label="Tambah Dokter"
            icon="pi pi-plus"
            className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
            onClick={handleAddDoctor}
          />
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {showForm ? (
        <div className="mb-4">
          <Button
            label="Back to List"
            className="mb-4 p-button-secondary"
            onClick={handleCloseForm}
          />
          <DokterForm
            id={editingDoctorId}
            onClose={handleCloseForm}
            refreshList={refreshList}
          />
        </div>
      ) : showDetail ? (
        <div className="mb-4">
          <Button
            label="Back to List"
            className="mb-4 p-button-secondary"
            onClick={handleCloseDetail}
          />
          <DokterDetail doctor={selectedDoctor} />
        </div>
      ) : (
        <DataTable
          value={doctors}
          paginator
          rows={10}
          globalFilter={globalFilter}
          emptyMessage="No doctors found."
          header={renderHeader()}
        >
          <Column
            field="id"
            header="No"
            body={(rowData, options) => options.rowIndex + 1}
          />
          <Column field="nama" header="Nama Dokter" />
          <Column
            body={actionBodyTemplate}
            style={{ textAlign: 'center' }}
          />
        </DataTable>
      )}
    </div>
  );
};

export default DokterList;
