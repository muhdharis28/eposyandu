import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // For global filtering
import { useNavigate } from 'react-router-dom';
import { getPemeriksaanLansia, deletePemeriksaanLansia } from '../../PemeriksaanLansiaService'; // You need to implement this service

const PemeriksaanLansiaList = () => {
  const [pemeriksaanLansiaList, setPemeriksaanLansiaList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(''); // For global filtering
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For routing

  useEffect(() => {
    loadPemeriksaanLansia();
  }, []);

  const loadPemeriksaanLansia = async () => {
    try {
      const result = await getPemeriksaanLansia();
      setPemeriksaanLansiaList(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      setError('Failed to load pemeriksaan lansia data.');
      console.error('Failed to load pemeriksaan lansia data:', error);
    }
  };

  const refreshList = () => {
    loadPemeriksaanLansia();
  };

  const handleAddPemeriksaanLansia = () => {
    navigate('/pemeriksaan-lansia/baru'); // Navigate to the create form
  };

  const handleEditPemeriksaanLansia = (id) => {
    navigate(`/pemeriksaan-lansia/edit/${id}`); // Navigate to the edit form
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus pemeriksaan ini?');
    if (confirmDelete) {
      try {
        await deletePemeriksaanLansia(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete pemeriksaan.');
        console.error('Failed to delete pemeriksaan:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/pemeriksaan-lansia/${id}`); // Navigate to the detail page
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value); // Update global filter state
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <InputText
        value={globalFilter}
        onChange={onGlobalFilterChange}
        placeholder="Search Pemeriksaan Lansia"
        className="p-inputtext-sm w-full md:w-30rem"
      />
    </div>
  );

  const actionBodyTemplate = (rowData) => (
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
        onClick={() => handleEditPemeriksaanLansia(rowData.id)}
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        className="p-button-text bg-red-500 text-white hover:bg-red-600 px-3 py-2"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Data Pemeriksaan Lansia</h2>
        <Button
          label="Tambah Pemeriksaan"
          icon="pi pi-plus"
          className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
          onClick={handleAddPemeriksaanLansia}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={pemeriksaanLansiaList}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="No pemeriksaan lansia found."
        header={renderHeader()}
      >
        <Column
          field="id"
          header="No"
          body={(rowData, options) => options.rowIndex + 1}
        />
        <Column field="lansiaDetail.nama_lansia" header="Nama Lansia" />
        <Column field="tanggal_kunjungan" header="Tanggal Kunjungan" />
        <Column field="berat_badan" header="Berat Badan" />
        <Column field="tinggi_badan" header="Tinggi Badan" />
        <Column body={actionBodyTemplate} style={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default PemeriksaanLansiaList;