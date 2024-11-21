import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { getJobs, deleteJob } from '../../PekerjaanService';

const PekerjaanList = () => {
  const [jobs, setJobs] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const result = await getJobs();
      const data = result.data;
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load pekerjaan data or unauthorized.');
      console.error('Failed to load pekerjaan data:', error);
    }
  };

  const refreshList = () => {
    loadJobs();
  };

  const handleAddPekerjaan = () => {
    navigate('/pekerjaan/baru');
  };

  const handleEditPekerjaan = (id) => {
    navigate(`/pekerjaan/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus pekerjaan ini?');
    if (confirmDelete) {
      try {
        await deleteJob(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete pekerjaan or unauthorized.');
        console.error('Failed to delete pekerjaan:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/pekerjaan/${id}`);
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <Button
          className="bg-green-500 text-white hover:bg-green-600 rounded-md flex items-center"
          onClick={handleAddPekerjaan}
        >
          <span className="fas fa-plus mr-2"></span> Tambah
        </Button>
        <InputText
          value={globalFilter}
          onChange={onGlobalFilterChange}
          placeholder="Cari Kata Kunci"
          className="p-inputtext-sm md:w-30rem ml-3"
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-end gap-2">
        <Button
          className="p-button-text bg-blue-400 text-white hover:bg-blue-500"
          onClick={() => handleViewDetail(rowData.id)}
        ><span className="fas fa-circle-info mr-3"></span> Detail </Button>
        <Button
          className="p-button-text bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleEditPekerjaan(rowData.id)}
        ><span className="fas fa-edit mr-3"></span> Edit </Button>
        <Button
          className="p-button-text bg-red-500 text-white hover:bg-red-600"
          onClick={() => handleDelete(rowData.id)}
        ><span className="fas fa-trash mr-3"></span> Hapus </Button>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Data Master Pekerjaan</h2>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={jobs}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="Data tidak ditemukan"
        header={renderHeader()}
      >
        <Column
          field="id"
          header="No"
          body={(rowData, options) => options.rowIndex + 1}
        />
        <Column field="nama" header="Nama Pekerjaan" />
        <Column
          body={actionBodyTemplate}
          style={{ textAlign: 'center' }}
        />
      </DataTable>
    </div>
  );
};

export default PekerjaanList;
