import React, { useState, useEffect } from 'react';
import TopBar from '../TopBar'; // Adjust the path if necessary
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context
import { createOrangTua, updateOrangTua, getOrangTuaById } from '../../OrangTuaService'; // Service functions
import { getPosyandus } from '../../PosyanduService'; // Assume this fetches users with the 'kader' role
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and URL params
import axios from 'axios';

const OrangtuaForm = () => {
  const { id } = useParams(); // Get ID if it's an edit form
  const [formData, setFormData] = useState({
    no_kk: '',
    nik_ibu: '',
    nama_ibu: '',
    tempat_lahir_ibu: '',
    tanggal_lahir_ibu: '',
    alamat_ktp_ibu: '',
    kelurahan_ktp_ibu: '',
    kecamatan_ktp_ibu: '',
    kota_ktp_ibu: '',
    provinsi_ktp_ibu: '',
    alamat_domisili_ibu: '',
    kelurahan_domisili_ibu: '',
    kecamatan_domisili_ibu: '',
    kota_domisili_ibu: '',
    provinsi_domisili_ibu: '',
    no_hp_ibu: '',
    email_ibu: '',
    pekerjaan_ibu: '',
    pendidikan_ibu: '',
    nik_ayah: '',
    nama_ayah: '',
    tempat_lahir_ayah: '',
    tanggal_lahir_ayah: '',
    alamat_ktp_ayah: '',
    kelurahan_ktp_ayah: '',
    kecamatan_ktp_ayah: '',
    kota_ktp_ayah: '',
    provinsi_ktp_ayah: '',
    alamat_domisili_ayah: '',
    kelurahan_domisili_ayah: '',
    kecamatan_domisili_ayah: '',
    kota_domisili_ayah: '',
    provinsi_domisili_ayah: '',
    no_hp_ayah: '',
    email_ayah: '',
    pekerjaan_ayah: '',
    pendidikan_ayah: '',
    posyandu: '',
  });
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state management
  const navigate = useNavigate(); // For navigation
  const [pekerjaanOptions, setPekerjaanOptions] = useState([]);
  const [pendidikanOptions, setPendidikanOptions] = useState([]);
  const [posyanduOptions, setPosyanduOptions] = useState([]); // Store list of kader options

  useEffect(() => {
    if (id) {
      loadOrangtua(); // Load orangtua data if editing
    }
    loadPosyandu(); // Load kader options
  }, [id]);
  
  const loadPosyandu = async () => {
    try {
      const result = await getPosyandus(); // Fetch kader data (users with the role 'kader')
      setPosyanduOptions(result.data);
    } catch (error) {
      setError('Failed to load kader options.');
      console.error('Failed to load kader options:', error);
    }
  };

  useEffect(() => {
    const fetchPekerjaan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pekerjaan`); // Adjust the API path as needed
        setPekerjaanOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch Pekerjaan data:', error);
      }
    };

    const fetchPendidikan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pendidikan`); // Adjust the API path as needed
        setPendidikanOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch Pendidikan data:', error);
      }
    };

    fetchPekerjaan();
    fetchPendidikan();
  }, []);

  const loadOrangtua = async () => {
    try {
      const result = await getOrangTuaById(id); // Fetch orangtua data by ID
      setFormData(result.data); // Set form data based on response
    } catch (error) {
      console.error('Failed to load orangtua data:', error);
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
        await updateOrangTua(id, formData); // Update orangtua data
      } else {
        await createOrangTua(formData); // Create new orangtua data
      }
      navigate('/orangtua'); // Navigate back to orangtua list
    } catch (error) {
      console.error('Error submitting orangtua data:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/orangtua'); // Navigate back to orangtua list
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Orangtua
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Orangtua' : 'Tambah Orangtua'}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data Ibu Section */}
        <div className="p-4 border border-gray-200 rounded-md">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Data Ibu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="no_kk"
              value={formData.no_kk}
              onChange={handleChange}
              placeholder="No KK"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="nik_ibu"
              value={formData.nik_ibu}
              onChange={handleChange}
              placeholder="NIK Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="nama_ibu"
              value={formData.nama_ibu}
              onChange={handleChange}
              placeholder="Nama Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="tempat_lahir_ibu"
              value={formData.tempat_lahir_ibu}
              onChange={handleChange}
              placeholder="Tempat Lahir Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              name="tanggal_lahir_ibu"
              value={formData.tanggal_lahir_ibu}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="alamat_ktp_ibu"
              value={formData.alamat_ktp_ibu}
              onChange={handleChange}
              placeholder="Alamat KTP Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="kelurahan_ktp_ibu"
              value={formData.kelurahan_ktp_ibu}
              onChange={handleChange}
              placeholder="Kelurahan KTP Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="kecamatan_ktp_ibu"
              value={formData.kecamatan_ktp_ibu}
              onChange={handleChange}
              placeholder="Kecamatan KTP Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="kota_ktp_ibu"
              value={formData.kota_ktp_ibu}
              onChange={handleChange}
              placeholder="Kota KTP Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="provinsi_ktp_ibu"
              value={formData.provinsi_ktp_ibu}
              onChange={handleChange}
              placeholder="Provinsi KTP Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="alamat_domisili_ibu"
              value={formData.alamat_domisili_ibu}
              onChange={handleChange}
              placeholder="Alamat Domisili Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="kelurahan_domisili_ibu"
              value={formData.kelurahan_domisili_ibu}
              onChange={handleChange}
              placeholder="Kelurahan Domisili Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="kecamatan_domisili_ibu"
              value={formData.kecamatan_domisili_ibu}
              onChange={handleChange}
              placeholder="Kecamatan Domisili Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="kota_domisili_ibu"
              value={formData.kota_domisili_ibu}
              onChange={handleChange}
              placeholder="Kota Domisili Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="provinsi_domisili_ibu"
              value={formData.provinsi_domisili_ibu}
              onChange={handleChange}
              placeholder="Provinsi Domisili Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="no_hp_ibu"
              value={formData.no_hp_ibu}
              onChange={handleChange}
              placeholder="No HP Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email_ibu"
              value={formData.email_ibu}
              onChange={handleChange}
              placeholder="Email Ibu"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="pekerjaan_ibu"
              value={formData.pekerjaan_ibu}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Pekerjaan Ibu</option>
              {pekerjaanOptions.map((pekerjaan) => (
                <option key={pekerjaan.id} value={pekerjaan.id}>
                  {pekerjaan.nama}
                </option>
              ))}
            </select>
            <select
              name="pendidikan_ibu"
              value={formData.pendidikan_ibu}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Pendidikan Ibu</option>
              {pendidikanOptions.map((pendidikan) => (
                <option key={pendidikan.id} value={pendidikan.id}>
                  {pendidikan.nama}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Data Ayah Section */}
        <div className="p-4 border border-gray-200 rounded-md">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Data Ayah</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nik_ayah"
              value={formData.nik_ayah}
              onChange={handleChange}
              placeholder="NIK Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="nama_ayah"
              value={formData.nama_ayah}
              onChange={handleChange}
              placeholder="Nama Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="tempat_lahir_ayah"
              value={formData.tempat_lahir_ayah}
              onChange={handleChange}
              placeholder="Tempat Lahir Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              name="tanggal_lahir_ayah"
              value={formData.tanggal_lahir_ayah}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="alamat_ktp_ayah"
              value={formData.alamat_ktp_ayah}
              onChange={handleChange}
              placeholder="Alamat KTP Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="kelurahan_ktp_ayah"
              value={formData.kelurahan_ktp_ayah}
              onChange={handleChange}
              placeholder="Kelurahan KTP Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="kecamatan_ktp_ayah"
              value={formData.kecamatan_ktp_ayah}
              onChange={handleChange}
              placeholder="Kecamatan KTP Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="kota_ktp_ayah"
              value={formData.kota_ktp_ayah}
              onChange={handleChange}
              placeholder="Kota KTP Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="provinsi_ktp_ayah"
              value={formData.provinsi_ktp_ayah}
              onChange={handleChange}
              placeholder="Provinsi KTP Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="alamat_domisili_ayah"
              value={formData.alamat_domisili_ayah}
              onChange={handleChange}
              placeholder="Alamat Domisili Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="kelurahan_domisili_ayah"
              value={formData.kelurahan_domisili_ayah}
              onChange={handleChange}
              placeholder="Kelurahan Domisili Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="kecamatan_domisili_ayah"
              value={formData.kecamatan_domisili_ayah}
              onChange={handleChange}
              placeholder="Kecamatan Domisili Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="kota_domisili_ayah"
              value={formData.kota_domisili_ayah}
              onChange={handleChange}
              placeholder="Kota Domisili Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="provinsi_domisili_ayah"
              value={formData.provinsi_domisili_ayah}
              onChange={handleChange}
              placeholder="Provinsi Domisili Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="no_hp_ayah"
              value={formData.no_hp_ayah}
              onChange={handleChange}
              placeholder="No HP Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email_ayah"
              value={formData.email_ayah}
              onChange={handleChange}
              placeholder="Email Ayah"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="pekerjaan_ayah"
              value={formData.pekerjaan_ayah}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Pekerjaan Ayah</option>
              {pekerjaanOptions.map((pekerjaan) => (
                <option key={pekerjaan.id} value={pekerjaan.id}>
                  {pekerjaan.nama}
                </option>
              ))}
            </select>
            <select
              name="pendidikan_ayah"
              value={formData.pendidikan_ayah}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Pendidikan Ayah</option>
              {pendidikanOptions.map((pendidikan) => (
                <option key={pendidikan.id} value={pendidikan.id}>
                  {pendidikan.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Posyandu</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.posyandu}
              onChange={handleChange}
              name="posyandu"
              required
            >
              <option value="">Pilih Posyandu</option>
              {posyanduOptions.map((posyandu) => (
                <option key={posyandu.id} value={posyandu.id}>
                  {posyandu.nama}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
        </div>
      </div>
    </div>
  );
};

export default OrangtuaForm;
