import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // For search input
import { useNavigate } from 'react-router-dom';
import { getPerkembanganBalitas, deletePerkembanganBalita } from './PerkembanganBalitaService'; // Import the service for fetching data

const PerkembanganBalitaList = () => {
  const [perkembanganBalitaList, setPerkembanganBalitaList] = useState([]); // State for list of Perkembangan Balita
  const [globalFilter, setGlobalFilter] = useState(''); // For global filtering
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    loadPerkembanganBalitas(); // Load Perkembangan Balitas on component mount
  }, []);

  const loadPerkembanganBalitas = async () => {
    try {
      const result = await getPerkembanganBalitas();
      const data = result.data;
      setPerkembanganBalitaList(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load Perkembangan Balita data.');
      console.error('Failed to load data:', error);
    }
  };

  const refreshList = () => {
    loadPerkembanganBalitas(); // Reloads the Perkembangan Balita list
  };

  const handleAddPerkembanganBalita = () => {
    navigate('/perkembangan-balita/baru'); // Navigate to the create Perkembangan Balita form
  };

  const handleEditPerkembanganBalita = (id) => {
    navigate(`/perkembangan-balita/edit/${id}`); // Navigate to the edit Perkembangan Balita form
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data perkembangan balita ini?');
    if (confirmDelete) {
      try {
        await deletePerkembanganBalita(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete Perkembangan Balita.');
        console.error('Failed to delete:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/perkembangan-balita/${id}`); // Navigate to the detail page
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
          placeholder="Search Perkembangan Balita"
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
          onClick={() => handleEditPerkembanganBalita(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Perkembangan Balita</h2>
        <Button
          label="Tambah Perkembangan Balita"
          icon="pi pi-plus"
          className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
          onClick={handleAddPerkembanganBalita}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={perkembanganBalitaList}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="No perkembangan balita found."
        header={renderHeader()}
      >
        <Column field="id" header="No" body={(rowData, options) => options.rowIndex + 1} />
        <Column field="balitaDetail.nama_balita" header="Nama Balita" />
        <Column field="tanggal_kunjungan" header="Tanggal Kunjungan" />
        <Column field="berat_badan" header="Berat Badan (kg)" />
        <Column field="tinggi_badan" header="Tinggi Badan (cm)" />
        <Column body={actionBodyTemplate} style={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default PerkembanganBalitaList;
