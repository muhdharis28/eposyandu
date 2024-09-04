import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // Import InputText for search
import { getPendidikan, deletePendidikan } from './PendidikanService';
import PendidikanForm from './PendidikanForm'; // Form component for add/edit
import PendidikanDetail from './PendidikanDetail'; // Detail component for viewing data

const PendidikanList = () => {
  const [pendidikanList, setPendidikanList] = useState([]);
  const [editingPendidikanId, setEditingPendidikanId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPendidikan, setSelectedPendidikan] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(''); // State for global filter
  const [error, setError] = useState('');

  useEffect(() => {
    loadPendidikan();
  }, []);

  const loadPendidikan = async () => {
    try {
      const result = await getPendidikan();
      setPendidikanList(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      setError('Error fetching pendidikan data.');
      console.error('Error fetching pendidikan data:', error);
    }
  };

  const refreshList = () => {
    loadPendidikan(); // Reloads the pendidikan list
  };

  const handleAddPendidikan = () => {
    setEditingPendidikanId(null); // Set to null to add a new pendidikan
    setShowForm(true); // Show form for adding
    setShowDetail(false); // Hide detail view
  };

  const handleEditPendidikan = (id) => {
    setEditingPendidikanId(id); // Set the pendidikan ID to edit
    setShowForm(true); // Show form for editing
    setShowDetail(false); // Hide detail view
  };

  const handleViewDetail = (pendidikan) => {
    setSelectedPendidikan(pendidikan); // Set the selected pendidikan for detail view
    setShowDetail(true);
    setShowForm(false); // Hide form view
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data pendidikan ini?');
    if (confirmDelete) {
      try {
        await deletePendidikan(id);
        refreshList(); // Refresh the list after deleting
      } catch (error) {
        setError('Error deleting pendidikan data.');
        console.error('Error deleting pendidikan data:', error);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false); // Close the form
    setEditingPendidikanId(null); // Reset editing state
  };

  const handleCloseDetail = () => {
    setShowDetail(false); // Close the detail view
    setSelectedPendidikan(null); // Reset selected pendidikan
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
        onClick={() => handleEditPendidikan(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Master Pendidikan</h2>
        {!showForm && !showDetail && (
          <Button
            label="Tambah Pendidikan"
            icon="pi pi-plus"
            className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-md"
            onClick={handleAddPendidikan}
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
          <PendidikanForm
            id={editingPendidikanId}
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
          <PendidikanDetail pendidikan={selectedPendidikan} />
        </div>
      ) : (
        <DataTable
          value={pendidikanList}
          paginator
          rows={10}
          globalFilter={globalFilter}
          emptyMessage="No pendidikan found."
          header={renderHeader()}
        >
          <Column
            field="id"
            header="No"
            body={(rowData, options) => options.rowIndex + 1}
          />
          <Column field="nama" header="Pendidikan" />
          <Column
            body={actionBodyTemplate}
            style={{ textAlign: 'center' }}
          />
        </DataTable>
      )}
    </div>
  );
};

export default PendidikanList;
