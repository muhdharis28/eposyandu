import React, { useState, useEffect } from 'react';
import { createPendidikan, updatePendidikan, getPendidikan } from './PendidikanService';

const PendidikanForm = ({ id, onClose, refreshList }) => {
  const [nama, setNama] = useState(''); // State for 'nama' input
  const [error, setError] = useState(null); // State for error messages

  useEffect(() => {
    if (id) {
      loadPendidikan(); // Load pendidikan data when editing
    }
  }, [id]);

  const loadPendidikan = async () => {
    try {
      const result = await getPendidikan();
      const pendidikan = result.data.find((pendidikan) => pendidikan.id === id);
      if (pendidikan) {
        setNama(pendidikan.nama);
      }
    } catch (error) {
      setError('Failed to load pendidikan data'); // Set error message
      console.error('Failed to load pendidikan data:', error);
    }
  };

  const isUserAuthorized = () => {
    const userRole = localStorage.getItem('role'); // Assuming roles are stored in local storage
    return userRole === 'admin'; // Only admin can edit or add pendidikan
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Alert if the user is not authorized
    if (!isUserAuthorized()) {
      alert('You are not authorized to perform this action.');
      return; // Prevent submission
    }

    const pendidikan = { nama };
    try {
      if (id) {
        await updatePendidikan(id, pendidikan); // Update existing pendidikan
      } else {
        await createPendidikan(pendidikan); // Create new pendidikan
      }
      refreshList(); // Refresh the list after adding or updating a pendidikan
      onClose(); // Close the form
    } catch (error) {
      setError('Failed to save pendidikan'); // Handle errors
      console.error('Error saving pendidikan:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Pendidikan' : 'Tambah Pendidikan'}</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Pendidikan</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className="text-white bg-blue-500 px-4 py-2 rounded"
        >
          {id ? 'Update' : 'Tambah'}
        </button>
        <button 
          type="button" 
          onClick={onClose} 
          className="text-gray-700 px-4 py-2 ml-4 rounded"
        >
          Batal
        </button>
      </form>
    </div>
  );
};

export default PendidikanForm;
