import React, { useState, useEffect } from 'react';
import TopBar from '../TopBar'; // Adjust the path if necessary
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context
import { createLansia, updateLansia, getLansiaById } from './LansiaService'; // API service
import { useNavigate, useParams } from 'react-router-dom';

const LansiaForm = () => {
  const { id } = useParams(); // For detecting if editing
  const [formData, setFormData] = useState({
    no_kk_lansia: '',
    nik_lansia: '',
    nama_lansia: '',
    tempat_lahir_lansia: '',
    tanggal_lahir_lansia: '',
    alamat_ktp_lansia: '',
    kelurahan_ktp_lansia: '',
    kecamatan_ktp_lansia: '',
    kota_ktp_lansia: '',
    provinsi_ktp_lansia: '',
    alamat_domisili_lansia: '',
    kelurahan_domisili_lansia: '',
    kecamatan_domisili_lansia: '',
    kota_domisili_lansia: '',
    provinsi_domisili_lansia: '',
    no_hp_lansia: '',
    email_lansia: '',
    pekerjaan_lansia: '',
    pendidikan_lansia: '',
    status_pernikahan_lansia: 'Menikah', // Default value
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
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Lansia
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Lansia' : 'Tambah Lansia'}</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Nomor KK</label>
                <input
                  type="text"
                  name="no_kk_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.no_kk_lansia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">NIK</label>
                <input
                  type="text"
                  name="nik_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.nik_lansia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Nama Lansia</label>
                <input
                  type="text"
                  name="nama_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.nama_lansia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempat_lahir_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.tempat_lahir_lansia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggal_lahir_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.tanggal_lahir_lansia}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Alamat KTP Fields */}
              <div className="mb-4">
                <label className="block text-gray-700">Alamat KTP</label>
                <input
                  type="text"
                  name="alamat_ktp_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.alamat_ktp_lansia}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-1">
              {/* Status Pernikahan */}
              <div className="mb-4">
                <label className="block text-gray-700">Status Pernikahan</label>
                <select
                  name="status_pernikahan_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.status_pernikahan_lansia}
                  onChange={handleChange}
                  required
                >
                  <option value="Menikah">Menikah</option>
                  <option value="Duda">Duda</option>
                  <option value="Janda">Janda</option>
                  <option value="Tidak Menikah">Tidak Menikah</option>
                </select>
              </div>

              {/* Contact Info */}
              <div className="mb-4">
                <label className="block text-gray-700">No HP</label>
                <input
                  type="text"
                  name="no_hp_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.no_hp_lansia}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.email_lansia}
                  onChange={handleChange}
                />
              </div>

              {/* Pekerjaan */}
              <div className="mb-4">
                <label className="block text-gray-700">Pekerjaan</label>
                <input
                  type="text"
                  name="pekerjaan_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.pekerjaan_lansia}
                  onChange={handleChange}
                />
              </div>

              {/* Pendidikan */}
              <div className="mb-4">
                <label className="block text-gray-700">Pendidikan</label>
                <input
                  type="text"
                  name="pendidikan_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.pendidikan_lansia}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">
                {id ? 'Update' : 'Tambah'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LansiaForm;
