import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { getDokumentasi, deleteDokumentasi } from '../../DokumentasiService'; // Your API services

const DokumentasiList = () => {
  const [dokumentasi, setDokumentasi] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(''); // State for global filter
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    loadDokumentasi();
  }, []);

  const loadDokumentasi = async () => {
    try {
      const result = await getDokumentasi();
      const data = result.data;
      setDokumentasi(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load dokumentasi data or unauthorized.');
      console.error('Failed to load dokumentasi data:', error);
    }
  };

  const refreshList = () => {
    loadDokumentasi();
  };

  const handleAddDokumentasi = () => {
    navigate('/dokumentasi/baru'); // Navigate to the create dokumentasi form
  };

  const handleEditDokumentasi = (id) => {
    navigate(`/dokumentasi/edit/${id}`); // Navigate to the edit dokumentasi form
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus dokumentasi ini?');
    if (confirmDelete) {
      try {
        await deleteDokumentasi(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete dokumentasi or unauthorized.');
        console.error('Failed to delete dokumentasi:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/dokumentasi/${id}`); // Navigate to the detail page
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

  // Helper function to format date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  const imageBodyTemplate = (rowData) => {
    return <img src={`${import.meta.env.VITE_API_URL}${rowData.foto}`} alt={rowData.judul} className="w-16 shadow-md rounded-md" />;
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
          onClick={() => handleEditDokumentasi(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Dokumentasi</h2>
        <Button
          label="Tambah Dokumentasi"
          icon="pi pi-plus"
          className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
          onClick={handleAddDokumentasi}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={dokumentasi}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="No dokumentasi found."
        header={renderHeader()}
      >
        <Column
          field="id"
          header="No"
          body={(rowData, options) => options.rowIndex + 1}
        />
        <Column field="judul" header="Judul Dokumentasi" />
        <Column field="tanggal" header="Tanggal" body={(rowData) => formatDate(rowData.tanggal)} />
        <Column field="deskripsi" header="Deskripsi" />
        <Column body={imageBodyTemplate} header="Foto" />
        <Column
          body={actionBodyTemplate}
          style={{ textAlign: 'center' }}
        />
      </DataTable>
    </div>
  );
};

export default DokumentasiList;
