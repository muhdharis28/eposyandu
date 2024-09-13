import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // For global filter
import { useNavigate } from 'react-router-dom'; // For routing
import { getLansia, deleteLansia } from './LansiaService'; // API service

const LansiaList = () => {
  const [lansiaList, setLansiaList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(''); // For global filtering
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For routing

  useEffect(() => {
    loadLansia();
  }, []);

  const loadLansia = async () => {
    try {
      const result = await getLansia();
      const data = result.data;
      setLansiaList(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load lansia data.');
      console.error('Failed to load lansia data:', error);
    }
  };

  const refreshList = () => {
    loadLansia();
  };

  const handleAddLansia = () => {
    navigate('/lansia/baru'); // Navigate to the create Lansia form
  };

  const handleEditLansia = (id) => {
    navigate(`/lansia/edit/${id}`); // Navigate to the edit Lansia form
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus lansia ini?');
    if (confirmDelete) {
      try {
        await deleteLansia(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete lansia.');
        console.error('Failed to delete lansia:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/lansia/${id}`); // Navigate to the detail page
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
          onClick={() => handleEditLansia(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Master Lansia</h2>
        <Button
          label="Tambah Lansia"
          icon="pi pi-plus"
          className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
          onClick={handleAddLansia}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={lansiaList}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="No lansia found."
        header={renderHeader()}
      >
        <Column
          field="id"
          header="No"
          body={(rowData, options) => options.rowIndex + 1}
        />
        <Column field="nama_lansia" header="Nama Lansia" />
        {/* Displaying Wali's Nama */}
        <Column field="waliDetail.nama_wali" header="Nama Wali" />
        <Column field="tanggal_lahir_lansia" header="Tanggal Lahir Lansia" />
        <Column field="tempat_lahir_lansia" header="Tempat Lahir Lansia" />
        <Column body={actionBodyTemplate} style={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default LansiaList;
