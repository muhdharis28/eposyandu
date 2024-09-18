// KegiatanForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and URL parameters
import { createKegiatan, updateKegiatan, getKegiatanById } from '../../KegiatanService';
import TopBar from '../TopBar'; // Adjust the path if necessary
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const KegiatanForm = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [nama, setNama] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jenis, setJenis] = useState('balita'); // Default to "balita"
  const [deskripsi, setDeskripsi] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state

  useEffect(() => {
    if (id) {
      loadKegiatan(); // Load kegiatan data if an ID is provided (for editing)
    }
  }, [id]);

  const loadKegiatan = async () => {
    try {
      const result = await getKegiatanById(id); // Fetch kegiatan data by ID
      const kegiatan = result.data;
      setNama(kegiatan.nama);
      setTanggal(kegiatan.tanggal);
      setJenis(kegiatan.jenis);
      setDeskripsi(kegiatan.deskripsi);
    } catch (error) {
      setError('Failed to load kegiatan data.');
      console.error('Failed to load kegiatan data:', error);
    }
  };

  const isUserAuthorized = () => {
    const userRole = localStorage.getItem('role'); // Assuming roles are stored in local storage
    return userRole === 'admin'; // Only admin can edit or add kegiatan
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserAuthorized()) {
      alert('You are not authorized to perform this action.');
      return;
    }

    const kegiatan = { nama, tanggal, jenis, deskripsi };

    try {
      if (id) {
        await updateKegiatan(id, kegiatan); // Update kegiatan if an ID is provided
      } else {
        await createKegiatan(kegiatan); // Create a new kegiatan if no ID is provided
      }

      navigate('/kegiatan'); // Navigate back to the kegiatan list after form submission
    } catch (error) {
      setError('Failed to save kegiatan data.');
      console.error('Error saving kegiatan:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/kegiatan'); // Navigate back to the kegiatan list
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Kegiatan
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Kegiatan' : 'Tambah Kegiatan'}</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
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
              <button
                type="submit"
                className="text-white bg-blue-500 px-4 py-2 rounded"
              >
                {id ? 'Update' : 'Tambah'}
              </button>
            </div>
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Deskripsi</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows="8"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KegiatanForm;
