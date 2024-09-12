import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom'; // For navigation
import { getOrangTua, deleteOrangTua } from './OrangTuaService'; // Import the necessary services

const OrangtuaList = () => {
  const [orangtuaList, setOrangtuaList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    loadOrangtua();
  }, []);

  const loadOrangtua = async () => {
    try {
      const result = await getOrangTua();
      const data = result.data;
      setOrangtuaList(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load orangtua data.');
      console.error('Failed to load orangtua data:', error);
    }
  };

  const refreshList = () => {
    loadOrangtua();
  };

  const handleAddOrangtua = () => {
    navigate('/orangtua/baru'); // Navigate to the add orangtua form
  };

  const handleEditOrangtua = (id) => {
    navigate(`/orangtua/edit/${id}`); // Navigate to the edit orangtua form
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data orangtua ini?');
    if (confirmDelete) {
      try {
        await deleteOrangTua(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete orangtua data.');
        console.error('Failed to delete orangtua:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/orangtua/${id}`); // Navigate to the detail page
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
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
          onClick={() => handleEditOrangtua(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Orangtua</h2>
        <Button
          label="Tambah Orangtua"
          icon="pi pi-plus"
          className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
          onClick={handleAddOrangtua}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={orangtuaList}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="No orangtua data found."
        header={renderHeader()}
      >
        <Column
          field="id"
          header="No"
          body={(rowData, options) => options.rowIndex + 1}
        />
        <Column field="nama" header="Nama Orangtua" />
        <Column body={actionBodyTemplate} style={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default OrangtuaList;
