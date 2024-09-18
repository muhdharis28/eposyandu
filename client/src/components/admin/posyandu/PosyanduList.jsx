import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // For search input
import { useNavigate } from 'react-router-dom'; // For navigation
import { getPosyandus, deletePosyandu } from '../../PosyanduService'; // Your API services

const PosyanduList = () => {
  const [jobs, setPosyandus] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(''); // For global filtering
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    loadPosyandus();
  }, []);

  const loadPosyandus = async () => {
    try {
      const result = await getPosyandus();
      const data = result.data;
      setPosyandus(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load posyandu data or unauthorized.');
      console.error('Failed to load posyandu data:', error);
    }
  };

  const refreshList = () => {
    loadPosyandus();
  };

  const handleAddPosyandu = () => {
    navigate('/posyandu/baru'); // Navigate to the create posyandu form
  };

  const handleEditPosyandu = (id) => {
    navigate(`/posyandu/edit/${id}`); // Navigate to the edit posyandu form
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus posyandu ini?');
    if (confirmDelete) {
      try {
        await deletePosyandu(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete posyandu or unauthorized.');
        console.error('Failed to delete posyandu:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/posyandu/${id}`); // Navigate to the detail page
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
          onClick={() => handleEditPosyandu(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Master Posyandu</h2>
        <Button
          label="Tambah Posyandu"
          icon="pi pi-plus"
          className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
          onClick={handleAddPosyandu}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={jobs}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="No posyandu found."
        header={renderHeader()}
      >
        <Column
          field="id"
          header="No"
          body={(rowData, options) => options.rowIndex + 1}
        />
        <Column field="nama" header="Nama Posyandu" />
        <Column field="alamat" header="Alamat Posyandu" />
        <Column
          body={actionBodyTemplate}
          style={{ textAlign: 'center' }}
        />
      </DataTable>
    </div>
  );
};

export default PosyanduList;
