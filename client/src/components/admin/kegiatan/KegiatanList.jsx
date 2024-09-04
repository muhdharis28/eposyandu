import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // Import InputText for search
import { getKegiatan, deleteKegiatan } from './KegiatanService'; // Your API services
import KegiatanForm from './KegiatanForm'; // Form component for add/edit
import KegiatanDetail from './KegiatanDetail'; // Detail component for viewing kegiatan information

const KegiatanList = () => {
  const [kegiatanList, setKegiatanList] = useState([]);
  const [editingKegiatanId, setEditingKegiatanId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedKegiatan, setSelectedKegiatan] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(''); // State for global filter
  const [error, setError] = useState('');

  useEffect(() => {
    loadKegiatan();
  }, []);

  const loadKegiatan = async () => {
    try {
      const result = await getKegiatan();
      const data = result.data;
      setKegiatanList(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load kegiatan data or unauthorized.');
      console.error('Failed to load kegiatan data:', error);
    }
  };

  const refreshList = () => {
    loadKegiatan();
  };

  const handleAddKegiatan = () => {
    setEditingKegiatanId(null);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleEditKegiatan = (id) => {
    setEditingKegiatanId(id);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus kegiatan ini?');
    if (confirmDelete) {
      try {
        await deleteKegiatan(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete kegiatan or unauthorized.');
        console.error('Failed to delete kegiatan:', error);
      }
    }
  };

  const handleViewDetail = (kegiatan) => {
    setSelectedKegiatan(kegiatan);
    setShowDetail(true);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingKegiatanId(null);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedKegiatan(null);
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-end gap-2">
        <Button
          label="Detail"
          icon="pi pi-eye"
          className="p-button-text bg-blue-400 text-white hover:bg-blue-500 px-3 py-2"
          onClick={() => handleViewDetail(rowData)}
        />
        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="p-button-text bg-blue-500 text-white hover:bg-blue-600 px-3 py-2"
          onClick={() => handleEditKegiatan(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Master Kegiatan</h2>
        {!showForm && !showDetail && (
          <Button
            label="Tambah Kegiatan"
            icon="pi pi-plus"
            className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
            onClick={handleAddKegiatan}
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
          <KegiatanForm
            id={editingKegiatanId}
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
          <KegiatanDetail kegiatan={selectedKegiatan} />
        </div>
      ) : (
        <DataTable
          value={kegiatanList}
          paginator
          rows={10}
          globalFilter={globalFilter}
          emptyMessage="No kegiatan found."
          header={renderHeader()}
        >
          <Column
            field="id"
            header="No"
            body={(rowData, options) => options.rowIndex + 1}
          />
          <Column field="nama" header="Nama Kegiatan" />
          <Column field="tanggal" header="Tanggal" />
          <Column field="jenis" header="Jenis" />
          <Column field="deskripsi" header="Deskripsi" />
          <Column
            body={actionBodyTemplate}
            style={{ textAlign: 'center' }}
          />
        </DataTable>
      )}
    </div>
  );
};

export default KegiatanList;
