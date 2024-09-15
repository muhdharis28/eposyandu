import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { getPengguna, deletePengguna } from '../../PenggunaService'; // Replace with the correct service path

const PenggunaList = () => {
  const [penggunaList, setPenggunaList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadPengguna();
  }, []);

  const loadPengguna = async () => {
    try {
      const result = await getPengguna();
      const data = result.data;
      setPenggunaList(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load pengguna data or unauthorized.');
      console.error('Failed to load pengguna data:', error);
    }
  };

  const refreshList = () => {
    loadPengguna();
  };

  const handleAddPengguna = () => {
    navigate('/pengguna/baru'); // Navigate to the create pengguna form
  };

  const handleEditPengguna = (id) => {
    navigate(`/pengguna/edit/${id}`); // Navigate to the edit pengguna form
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?');
    if (confirmDelete) {
      try {
        await deletePengguna(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete pengguna or unauthorized.');
        console.error('Failed to delete pengguna:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/pengguna/${id}`); // Navigate to the detail page
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <InputText
        value={globalFilter}
        onChange={onGlobalFilterChange}
        placeholder="Keyword Search"
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
        onClick={() => handleEditPengguna(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Master Pengguna</h2>
        <Button
          label="Tambah Pengguna"
          icon="pi pi-plus"
          className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
          onClick={handleAddPengguna}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={penggunaList}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="No pengguna found."
        header={renderHeader()}
      >
        <Column
          field="id"
          header="No"
          body={(rowData, options) => options.rowIndex + 1}
        />
        <Column field="nama" header="Nama Pengguna" />
        <Column field="no_hp" header="No HP" />
        <Column
          body={actionBodyTemplate}
          style={{ textAlign: 'center' }}
        />
      </DataTable>
    </div>
  );
};

export default PenggunaList;
