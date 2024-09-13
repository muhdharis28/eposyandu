import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // For search functionality
import { useNavigate } from 'react-router-dom'; // For navigation
import { getBayi, deleteBayi } from './BayiService'; // API services

const BayiList = () => {
  const [bayiList, setBayiList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(''); // State for global search
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for routing

  useEffect(() => {
    loadBayi(); // Fetch bayi data when the component loads
  }, []);

  const loadBayi = async () => {
    try {
      const result = await getBayi();
      const data = result.data;
      setBayiList(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load bayi data.');
      console.error('Failed to load bayi data:', error);
    }
  };

  const refreshList = () => {
    loadBayi(); // Refresh bayi data after an action
  };

  const handleAddBayi = () => {
    navigate('/balita/baru'); // Navigate to add bayi form
  };

  const handleEditBayi = (id) => {
    navigate(`/balita/edit/${id}`); // Navigate to edit bayi form
  };

  const handleViewDetail = (id) => {
    navigate(`/balita/${id}`); // Navigate to view bayi detail
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data balita ini?');
    if (confirmDelete) {
      try {
        await deleteBayi(id);
        refreshList(); // Refresh list after deletion
      } catch (error) {
        setError('Failed to delete bayi.');
        console.error('Failed to delete bayi:', error);
      }
    }
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value); // Update global filter state
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
        onClick={() => handleEditBayi(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Bayi</h2>
        <Button
          label="Tambah Bayi"
          icon="pi pi-plus"
          className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
          onClick={handleAddBayi}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={bayiList}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="No bayi data found."
        header={renderHeader()}
      >
        <Column field="id" header="No" body={(rowData, options) => options.rowIndex + 1} />
        <Column field="nama_balita" header="Nama Bayi" />
        <Column field="nik_balita" header="NIK" />
        <Column field="orangtuaDetail.nama_ayah" header="Ayah" />
        <Column field="orangtuaDetail.nama_ibu" header="Ibu" />
        <Column field="tanggal_lahir_balita" header="Tanggal Lahir" />
        <Column body={actionBodyTemplate} style={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default BayiList;
