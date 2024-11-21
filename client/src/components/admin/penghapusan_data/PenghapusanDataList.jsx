import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import api from '../../../api';

const PenghapusanDataList = () => {
  const [dataItems, setDataItems] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadDataItems();
  }, []);

  const loadDataItems = async () => {
    try {
      const result = await api.get('/penghapusan-data');
      const data = result.data;
      const filteredData = Array.isArray(data) ? data.filter(item => item.status === 'diminta') : [];
      setDataItems(filteredData);
    } catch (error) {
      setError('Failed to load penghapusan data or unauthorized.');
      console.error('Failed to load penghapusan data:', error);
    }
  };

  const refreshList = () => {
    loadDataItems();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (confirmDelete) {
      try {
        await api.delete(`/penghapusan-data/${id}`);
        refreshList();
      } catch (error) {
        setError('Failed to delete data or unauthorized.');
        console.error('Failed to delete data:', error);
      }
    }
  };

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm('Apakah Anda yakin ingin membatalkan data ini?');
    if (confirmCancel) {
      try {
        await api.put(`/penghapusan-data/${id}`, { status: 'dibatalkan' });
        refreshList();
      } catch (error) {
        setError('Failed to cancel data or unauthorized.');
        console.error('Failed to cancel data:', error);
      }
    }
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-end items-center mb-4">
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
      <div className="flex justify-center space-x-2">
        <Button
          className="p-button-text bg-red-500 text-white hover:bg-red-600"
          onClick={() => handleDelete(rowData.id)}
        ><span className="fas fa-trash mr-3"></span> Hapus </Button>
        <Button
          className="p-button-text bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={() => handleDelete(rowData.id)}
        ><span className="fas fa-cancel mr-3"></span> Batal </Button>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Data Penghapusan</h2>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={dataItems.filter(item => 
          item.nama.toLowerCase().includes(globalFilter.toLowerCase())
        )}
        paginator
        rows={10}
        emptyMessage="Data tidak ditemukan"
        header={renderHeader()}
      >
        <Column
          field="id"
          header="No"
          body={(rowData, options) => options.rowIndex + 1}
        />
        <Column field="nama" header="Nama Data" />
        <Column
          body={actionBodyTemplate}
          style={{ textAlign: 'center' }}
        />
      </DataTable>
    </div>
  );
};

export default PenghapusanDataList;
