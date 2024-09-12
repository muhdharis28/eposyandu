import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // For global filter
import { useNavigate } from 'react-router-dom'; // For routing
import { getWali, deleteWali } from './WaliService'; // API service for Wali

const WaliList = () => {
  const [waliList, setWaliList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(''); // For global filtering
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For routing

  useEffect(() => {
    loadWali();
  }, []);

  const loadWali = async () => {
    try {
      const result = await getWali();
      const data = result.data;
      setWaliList(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load wali data.');
      console.error('Failed to load wali data:', error);
    }
  };

  const refreshList = () => {
    loadWali();
  };

  const handleAddWali = () => {
    navigate('/wali/baru'); // Navigate to the create Wali form
  };

  const handleEditWali = (id) => {
    navigate(`/wali/edit/${id}`); // Navigate to the edit Wali form
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus wali ini?');
    if (confirmDelete) {
      try {
        await deleteWali(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete wali.');
        console.error('Failed to delete wali:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/wali/${id}`); // Navigate to the detail page
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
          onClick={() => handleEditWali(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Wali</h2>
        <Button
          label="Tambah Wali"
          icon="pi pi-plus"
          className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
          onClick={handleAddWali}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={waliList}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="No wali found."
        header={renderHeader()}
      >
        <Column
          field="id"
          header="No"
          body={(rowData, options) => options.rowIndex + 1}
        />
        <Column field="nama_wali" header="Nama Wali" />
        <Column body={actionBodyTemplate} style={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default WaliList;
