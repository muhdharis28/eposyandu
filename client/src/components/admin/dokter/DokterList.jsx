import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { getDoctors, deleteDoctor } from '../../DokterService';

const DokterList = () => {
  const [doctors, setDoctors] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const { data } = await getDoctors();
      setDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load doctor data or unauthorized.');
      console.error(error);
    }
  };

  const handleAddDoctor = () => navigate('/dokter/baru');
  const handleEditDoctor = (id) => navigate(`/dokter/edit/${id}`);
  const handleViewDoctor = (id) => navigate(`/dokter/${id}`);

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dokter ini?')) {
      try {
        await deleteDoctor(id);
        loadDoctors();
      } catch (error) {
        setError('Failed to delete doctor or unauthorized.');
        console.error(error);
      }
    }
  };

  const onFilterChange = (e) => setGlobalFilter(e.target.value);

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <Button
        className="bg-green-500 text-white hover:bg-green-600 rounded-md flex items-center"
        onClick={handleAddDoctor}
      >
        <span className="fas fa-plus mr-2"></span> Tambah
      </Button>
      <InputText
        value={globalFilter}
        onChange={onFilterChange}
        placeholder="Cari Kata Kunci"
        className="p-inputtext-sm md:w-30rem ml-3"
      />
    </div>
  );

  const renderActions = (rowData) => (
    <div className="flex justify-end gap-2">
      <Button
        className="p-button-text bg-blue-400 text-white hover:bg-blue-500"
        onClick={() => handleViewDoctor(rowData.id)}
      ><span className="fas fa-circle-info mr-3"></span> Detail </Button>
      <Button
        className="p-button-text bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => handleEditDoctor(rowData.id)}
      ><span className="fas fa-edit mr-3"></span> Edit </Button>
      <Button
        className="p-button-text bg-red-500 text-white hover:bg-red-600"
        onClick={() => handleDeleteDoctor(rowData.id)}
      ><span className="fas fa-trash mr-3"></span> Hapus </Button>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Data Master Dokter</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={doctors}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="Data tidak ditemukan"
        header={renderHeader()}
      >
        <Column field="id" header="No" body={(rowData, { rowIndex }) => rowIndex + 1} />
        <Column field="nama" header="Nama Dokter" />
        <Column body={renderActions} style={{ textAlign: 'center', width: '15rem' }} />
      </DataTable>
    </div>
  );
};

export default DokterList;
