import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { getPosyandus, deletePosyandu } from '../../PosyanduService';

const PosyanduList = () => {
  const [jobs, setPosyandus] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    navigate('/posyandu/baru');
  };

  const handleEditPosyandu = (id) => {
    navigate(`/posyandu/edit/${id}`);
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
    navigate(`/posyandu/${id}`);
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <Button
          className="bg-green-500 text-white hover:bg-green-600 rounded-md flex items-center"
          onClick={handleAddPosyandu}
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
        onClick={() => handleEditPosyandu(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Master Posyandu</h2>
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
