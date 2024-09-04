import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { getJobs, deleteJob } from './PekerjaanService';
import PekerjaanForm from './PekerjaanForm';
import PekerjaanDetail from './PekerjaanDetail';

const PekerjaanList = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const result = await getJobs();
      setJobs(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Error fetching pekerjaan data:', error);
    }
  };

  const refreshList = () => {
    loadJobs();
  };

  const handleAddPekerjaan = () => {
    setEditingJobId(null);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleEditPekerjaan = (id) => {
    setEditingJobId(id);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleViewDetail = (job) => {
    setSelectedJob(job);
    setShowDetail(true);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus pekerjaan ini?');
    if (confirmDelete) {
      try {
        await deleteJob(id);
        refreshList();
      } catch (error) {
        console.error('Error deleting pekerjaan:', error);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingJobId(null);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedJob(null);
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
          icon="pi pi-info-circle"
          className="p-button-text bg-green-500 text-white hover:bg-green-600 px-3 py-2"
          onClick={() => handleViewDetail(rowData)}
        />
        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="p-button-text bg-blue-500 text-white hover:bg-blue-600 px-3 py-2"
          onClick={() => handleEditPekerjaan(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Master Pekerjaan</h2>
        {!showForm && !showDetail && (
          <Button
            label="Tambah Pekerjaan"
            icon="pi pi-plus"
            className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
            onClick={handleAddPekerjaan}
          />
        )}
      </div>

      {showForm ? (
        <div className="mb-4">
          <Button
            label="Back to List"
            className="mb-4 p-button-secondary"
            onClick={handleCloseForm}
          />
          <PekerjaanForm
            id={editingJobId}
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
          <PekerjaanDetail job={selectedJob} />
        </div>
      ) : (
        <DataTable
          value={jobs}
          paginator
          rows={10}
          globalFilter={globalFilter}
          emptyMessage="No pekerjaan found."
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
      )}
    </div>
  );
};

export default PekerjaanList;
