import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { getPengguna, deletePengguna } from './PenggunaService';
import PenggunaForm from './PenggunaForm'; // Form component for add/edit
import PenggunaDetail from './PenggunaDetail'; // Detail component for viewing data

const PenggunaList = () => {
  const [penggunaList, setPenggunaList] = useState([]);
  const [filteredPenggunaList, setFilteredPenggunaList] = useState([]);
  const [editingPenggunaId, setEditingPenggunaId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPengguna, setSelectedPengguna] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadPengguna();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [penggunaList, globalFilter]);

  const loadPengguna = async () => {
    try {
      const result = await getPengguna();
      setPenggunaList(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      setError('Error fetching pengguna data.');
      console.error('Error fetching pengguna data:', error);
    }
  };

  // Filter pengguna based on global search
  const applyFilters = () => {
    let filteredList = penggunaList;

    // Apply global filter
    if (globalFilter) {
      filteredList = filteredList.filter((pengguna) =>
        pengguna.nama.toLowerCase().includes(globalFilter.toLowerCase())
      );
    }

    setFilteredPenggunaList(filteredList);
  };

  const refreshList = () => {
    loadPengguna(); // Reloads the pengguna list
  };

  const handleAddPengguna = () => {
    setEditingPenggunaId(null);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleEditPengguna = (id) => {
    setEditingPenggunaId(id);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleViewDetail = (pengguna) => {
    setSelectedPengguna(pengguna);
    setShowDetail(true);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this pengguna?');
    if (confirmDelete) {
      try {
        await deletePengguna(id);
        refreshList();
      } catch (error) {
        setError('Error deleting pengguna data.');
        console.error('Error deleting pengguna data:', error);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPenggunaId(null);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedPengguna(null);
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

  const actionBodyTemplate = (rowData) => (
    <div className="flex justify-end gap-2">
      <Button
        label="Detail"
        icon="pi pi-info-circle"
        className="p-button-text text-blue-400 hover:text-blue-500"
        onClick={() => handleViewDetail(rowData)}
      />
      <Button
        label="Edit"
        icon="pi pi-pencil"
        className="p-button-text text-blue-500 hover:text-blue-600"
        onClick={() => handleEditPengguna(rowData.id)}
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        className="p-button-text text-red-500 hover:text-red-600"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Data Master Pengguna</h2>
        {!showForm && !showDetail && (
          <Button
            label="Tambah Pengguna"
            icon="pi pi-plus"
            className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
            onClick={handleAddPengguna}
          />
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {showForm ? (
        <div className="mb-4">
          <Button
            label="Back to List"
            className="mb-4 p-button-secondary"
            onClick={handleCloseForm}
          />
          <PenggunaForm
            id={editingPenggunaId}
            onClose={handleCloseForm}
            refreshList={refreshList}
          />
        </div>
      ) : showDetail ? (
        <div className="mb-4">
          <Button
            label="Back to List"
            className="mb-4 p-button-secondary"
            onClick={handleCloseDetail}
          />
          <PenggunaDetail pengguna={selectedPengguna} />
        </div>
      ) : (
        <DataTable
          value={filteredPenggunaList}
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
          <Column field="email" header="Email" />
          <Column
            body={actionBodyTemplate}
            style={{ textAlign: 'center' }}
          />
        </DataTable>
      )}
    </div>
  );
};

export default PenggunaList;
