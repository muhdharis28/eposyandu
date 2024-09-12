import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // Import InputText for search
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { getDoctors, deleteDoctor } from './DokterService'; // Your API services

const DokterList = () => {
  const [doctors, setDoctors] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(''); // State for global filter
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

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
    navigate('/dokter/baru'); // Navigate to the create doctor form
  };

  const handleEditDoctor = (id) => {
    navigate(`/dokter/edit/${id}`); // Navigate to the edit doctor form
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

  const handleViewDetail = (id) => {
    navigate(`/dokter/${id}`); // Navigate to the detail page
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
          onClick={() => handleViewDetail(rowData.id)}
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
        <Button
          label="Tambah Dokter"
          icon="pi pi-plus"
          className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
          onClick={handleAddDoctor}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

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
    </div>
  );
};

export default DokterList;
