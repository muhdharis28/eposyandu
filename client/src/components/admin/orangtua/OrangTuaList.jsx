// Import necessary hooks and services for handling Orangtua
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { getOrangTua, deleteOrangTua } from './OrangTuaService';

const OrangtuaList = ({ onEditOrangtua, onAddOrangtua, onViewDetail }) => {
  const [orangtuaList, setOrangtuaList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    loadOrangtua();
  }, []);

  const loadOrangtua = async () => {
    try {
      const result = await getOrangTua();
      setOrangtuaList(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Error fetching orangtua data:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Apakah Anda yakin ingin menghapus data orangtua ini?'
    );
    if (confirmDelete) {
      try {
        await deleteOrangTua(id);
        loadOrangtua();
      } catch (error) {
        console.error('Error deleting orangtua:', error);
      }
    }
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
        className="p-button-text bg-gray-500 text-white hover:bg-gray-600 px-3 py-2"
        onClick={() => onViewDetail(rowData.id)}
      />
      <Button
        label="Edit"
        icon="pi pi-pencil"
        className="p-button-text bg-blue-500 text-white hover:bg-blue-600 px-3 py-2"
        onClick={() => onEditOrangtua(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Orangtua</h2>
        <Button
          label="Tambah Orangtua"
          icon="pi pi-plus"
          className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
          onClick={onAddOrangtua}
        />
      </div>

      <DataTable
        value={orangtuaList}
        paginator
        rows={5}
        globalFilter={globalFilter}
        emptyMessage="No orangtua data found."
        header={renderHeader()}
      >
        <Column
          field="id"
          header="No"
          body={(rowData, options) => options.rowIndex + 1}
        />
        <Column field="nama" header="Nama Orangtua" />
        <Column body={actionBodyTemplate} style={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default OrangtuaList;
