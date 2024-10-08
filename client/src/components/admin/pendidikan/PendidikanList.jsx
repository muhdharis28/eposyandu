import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // For search input
import { useNavigate } from 'react-router-dom'; // For navigation
import { getPendidikans, deletePendidikan } from '../../PendidikanService'; // Your API services

const PendidikanList = () => {
  const [jobs, setJobs] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(''); // For global filtering
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const result = await getPendidikans();
      const data = result.data;
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load pendidikan data or unauthorized.');
      console.error('Failed to load pendidikan data:', error);
    }
  };

  const refreshList = () => {
    loadJobs();
  };

  const handleAddPendidikan = () => {
    navigate('/pendidikan/baru'); // Navigate to the create pendidikan form
  };

  const handleEditPendidikan = (id) => {
    navigate(`/pendidikan/edit/${id}`); // Navigate to the edit pendidikan form
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus pendidikan ini?');
    if (confirmDelete) {
      try {
        await deletePendidikan(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete pendidikan or unauthorized.');
        console.error('Failed to delete pendidikan:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/pendidikan/${id}`); // Navigate to the detail page
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value); // Update filter state
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
          onClick={() => handleEditPendidikan(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Master Pendidikan</h2>
        <Button
          label="Tambah Pendidikan"
          icon="pi pi-plus"
          className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
          onClick={handleAddPendidikan}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={jobs}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="No pendidikan found."
        header={renderHeader()}
      >
        <Column
          field="id"
          header="No"
          body={(rowData, options) => options.rowIndex + 1}
        />
        <Column field="nama" header="Nama Pendidikan" />
        <Column
          body={actionBodyTemplate}
          style={{ textAlign: 'center' }}
        />
      </DataTable>
    </div>
  );
};

export default PendidikanList;
