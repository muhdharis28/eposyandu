import React, { useState, useEffect } from 'react';
import TopBar from '../TopBar'; // Adjust the path if necessary
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context
import { createLansia, updateLansia, getLansiaById } from '../../LansiaService'; // API service
import { getKader } from '../../PenggunaService'; // Assume this fetches users with the 'kader' role
import { useNavigate, useParams } from 'react-router-dom';
import { getWali } from '../../WaliService';
import axios from 'axios';

const LansiaForm = () => {
  const { id } = useParams(); // For detecting if editing
  const [formData, setFormData] = useState({
    no_kk_lansia: '',
    nik_lansia: '',
    nama_lansia: '',
    tempat_lahir_lansia: '',
    tanggal_lahir_lansia: '',
    jenis_kelamin_lansia: '',
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
    status_pernikahan_lansia: '',
    kader: ''
  });

  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state management
  const navigate = useNavigate(); // For navigation
  const [pekerjaanOptions, setPekerjaanOptions] = useState([]);
  const [pendidikanOptions, setPendidikanOptions] = useState([]);
  const [waliList, setWaliList] = useState([]);
  const [kader, setKader] = useState(''); // Store selected kader
  const [kaderOptions, setKaderOptions] = useState([]); // Store list of kader options

  useEffect(() => {
    if (id) {
      loadLansia(); // Load data if editing
    }
    loadKaders(); // Load kader options
  }, [id]);

  useEffect(() => {
    const fetchPekerjaan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pekerjaan`); // Adjust the API path as needed
        setPekerjaanOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch Pekerjaan data:', error);
      }
    };

    const fetchWali = async () => {
      try {
        const result = await getWali(); // Fetch Wali data from the backend
        setWaliList(result.data); // Store the Wali list in state
      } catch (error) {
        console.error('Failed to fetch wali data:', error);
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
    fetchWali();
  }, []);

  const loadKaders = async () => {
    try {
      const result = await getKader(); // Fetch kader data (users with the role 'kader')
      console.log(result.data)
      setKaderOptions(result.data);
    } catch (error) {
      setError('Failed to load kader options.');
      console.error('Failed to load kader options:', error);
    }
  };

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
                <label className="block text-gray-700">Wali</label>
                <select
                  name="wali"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.wali}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Wali</option>
                  {waliList.map((wali) => (
                    <option key={wali.id} value={wali.id}>
                      {wali.nama_wali}
                    </option>
                  ))}
                </select>
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

              <div className="mb-4">
                <label className="block text-gray-700">Jenis Kelamin</label>
                <select
                  name="jenis_kelamin_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.jenis_kelamin_lansia}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih</option>
                  <option value="l">Laki-laki</option>
                  <option value="p">Perempuan</option>
                </select>
              </div>

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

              <div className="mb-4">
                <label className="block text-gray-700">Kelurahan KTP</label>
                <input
                  type="text"
                  name="kelurahan_ktp_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.kelurahan_ktp_lansia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Kecamatan KTP</label>
                <input
                  type="text"
                  name="kecamatan_ktp_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.kecamatan_ktp_lansia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Kota KTP</label>
                <input
                  type="text"
                  name="kota_ktp_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.kota_ktp_lansia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Provinsi KTP</label>
                <input
                  type="text"
                  name="provinsi_ktp_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.provinsi_ktp_lansia}
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

              <div className="mb-4">
                <label className="block text-gray-700">Pekerjaan</label>
                <select
                  name="pekerjaan_lansia"
                  value={formData.pekerjaan_lansia}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Pilih Pekerjaan Lansia</option>
                  {pekerjaanOptions.map((pekerjaan) => (
                    <option key={pekerjaan.id} value={pekerjaan.id}>
                      {pekerjaan.nama}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700">Pendidikan</label>
                <select
                  name="pendidikan_lansia"
                  value={formData.pendidikan_lansia}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Pilih Pendidikan Lansia</option>
                  {pendidikanOptions.map((pendidikan) => (
                    <option key={pendidikan.id} value={pendidikan.id}>
                      {pendidikan.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Alamat Domisili</label>
                <input
                  type="text"
                  name="alamat_domisili_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.alamat_domisili_lansia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Kelurahan Domisili</label>
                <input
                  type="text"
                  name="kelurahan_domisili_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.kelurahan_domisili_lansia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Kecamatan Domisili</label>
                <input
                  type="text"
                  name="kecamatan_domisili_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.kecamatan_domisili_lansia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Kota Domisili</label>
                <input
                  type="text"
                  name="kota_domisili_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.kota_domisili_lansia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Provinsi Domisili</label>
                <input
                  type="text"
                  name="provinsi_domisili_lansia"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.provinsi_domisili_lansia}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Kader</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={kader}
                  onChange={(e) => setKader(e.target.value)}
                  required
                >
                  <option value="">Pilih Kader</option>
                  {kaderOptions.map((kader) => (
                    <option key={kader.id} value={kader.id}>
                      {kader.nama} - {kader.posyanduDetail?.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LansiaForm;
