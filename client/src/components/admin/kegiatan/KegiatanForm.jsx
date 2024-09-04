import React, { useState, useEffect } from 'react';
import { createKegiatan, updateKegiatan, getKegiatan } from './KegiatanService';

const KegiatanForm = ({ id, onClose, refreshList }) => {
  const [nama, setNama] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jenis, setJenis] = useState('balita');
  const [deskripsi, setDeskripsi] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadKegiatan(); // Load kegiatan data if editing
    }
  }, [id]);

  const loadKegiatan = async () => {
    try {
      const result = await getKegiatan();
      const kegiatan = result.data.find((kegiatan) => kegiatan.id === id);
      if (kegiatan) {
        setNama(kegiatan.nama);
        setTanggal(kegiatan.tanggal);
        setJenis(kegiatan.jenis);
        setDeskripsi(kegiatan.deskripsi);
      }
    } catch (error) {
      setError('Failed to load kegiatan data.'); // Set error message if fetching fails
      console.error('Failed to load kegiatan data:', error);
    }
  };

  const isUserAuthorized = () => {
    const userRole = localStorage.getItem('role'); // Assuming roles are stored in local storage
    return userRole === 'admin'; // Only admin can edit or add kegiatan
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Alert if the user is not authorized
    if (!isUserAuthorized()) {
      alert('You are not authorized to perform this action.');
      return; // Prevent submission
    }

    const kegiatan = { nama, tanggal, jenis, deskripsi };
    try {
      if (id) {
        await updateKegiatan(id, kegiatan); // Update existing kegiatan
      } else {
        await createKegiatan(kegiatan); // Create new kegiatan
      }
      refreshList(); // Refresh the list after adding or updating a kegiatan
      onClose(); // Close the form
    } catch (error) {
      setError('Failed to save kegiatan data.'); // Handle errors
      console.error('Error saving kegiatan:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Kegiatan' : 'Tambah Kegiatan'}</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Kegiatan</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tanggal</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Jenis</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            required
          >
            <option value="balita">Balita</option>
            <option value="lansia">Lansia</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deskripsi</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
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

export default KegiatanForm;
