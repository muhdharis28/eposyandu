// LansiaForm.jsx
import React, { useState, useEffect } from 'react';
import TopBar from '../TopBar'; // Adjust the path if necessary
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context
import { createLansia, updateLansia, getLansiaById } from './LansiaService'; // API service
import { useNavigate, useParams } from 'react-router-dom';

const LansiaForm = () => {
  const { id } = useParams(); // For detecting if editing
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat_ktp: '',
    no_hp: '',
    email: '',
    pekerjaan: '',
    pendidikan: '',
  });
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state management
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    if (id) {
      loadLansia(); // Load data if editing
    }
  }, [id]);

  const loadLansia = async () => {
    try {
      const result = await getLansiaById(id); // Fetch the lansia data by ID
      setFormData(result.data); // Set form data based on response
    } catch (error) {
      console.error('Failed to load lansia data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateLansia(id, formData); // Update lansia
      } else {
        await createLansia(formData); // Create new lansia
      }
      navigate('/lansia'); // Navigate back to the list
    } catch (error) {
      console.error('Error submitting lansia data:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/lansia'); // Navigate back to the list
  };

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with toggle button for sidebar */}
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar with collapsible functionality */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Lansia
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Lansia' : 'Tambah Lansia'}</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Nama Lansia</label>
                <input
                  type="text"
                  name="nama"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">NIK</label>
                <input
                  type="text"
                  name="nik"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.nik}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempat_lahir"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.tempat_lahir}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggal_lahir"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Alamat KTP</label>
                <input
                  type="text"
                  name="alamat_ktp"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.alamat_ktp}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">
                {id ? 'Update' : 'Tambah'}
              </button>
            </div>

            {/* Right Column */}
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">No HP</label>
                <input
                  type="text"
                  name="no_hp"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.no_hp}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Pekerjaan</label>
                <input
                  type="text"
                  name="pekerjaan"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.pekerjaan}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Pendidikan</label>
                <input
                  type="text"
                  name="pendidikan"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.pendidikan}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LansiaForm;
