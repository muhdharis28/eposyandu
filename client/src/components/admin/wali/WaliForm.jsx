import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createWali, updateWali, getWaliById } from '../../WaliService'; // Import your WaliService
import { getPosyandus } from '../../PosyanduService'; // Assume this fetches users with the 'kader' role
import axios from 'axios';
import TopBar from '../TopBar'; // Import TopBar component
import SideBar from '../SideBar'; // Import SideBar component
import { useSidebar } from '../../SideBarContext'; // Use context for sidebar state

const WaliForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    no_kk: '',
    nik_wali: '',
    nama_wali: '',
    tempat_lahir_wali: '',
    tanggal_lahir_wali: '',
    jenis_kelamin_wali: '',
    alamat_ktp_wali: '',
    kelurahan_ktp_wali: '',
    kecamatan_ktp_wali: '',
    kota_ktp_wali: '',
    provinsi_ktp_wali: '',
    alamat_domisili_wali: '',
    kelurahan_domisili_wali: '',
    kecamatan_domisili_wali: '',
    kota_domisili_wali: '',
    provinsi_domisili_wali: '',
    no_hp_wali: '',
    email_wali: '',
    pekerjaan_wali: '',
    pendidikan_wali: '',
    posyandu: ''
  });

  const [pekerjaanOptions, setPekerjaanOptions] = useState([]);
  const [pendidikanOptions, setPendidikanOptions] = useState([]);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state
  const navigate = useNavigate();
  const [posyanduOptions, setPosyanduOptions] = useState([]); // Store list of kader options

  useEffect(() => {
    if (id) {
      loadWali(); // Load Wali data if editing
    }
    loadPekerjaanOptions();
    loadPendidikanOptions();
    loadPosyandu(); // Load kader options
  }, [id]);

  const loadPosyandu = async () => {
    try {
      const result = await getPosyandus(); // Fetch kader data (users with the role 'kader')
      setPosyanduOptions(result.data);
    } catch (error) {
      console.error('Failed to load kader options:', error);
    }
  };

  const loadWali = async () => {
    try {
      const result = await getWaliById(id); // Fetch Wali data by ID
      setFormData(result.data); // Set form data
    } catch (error) {
      console.error('Failed to load wali data:', error);
    }
  };

  const loadPekerjaanOptions = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pekerjaan`);
        setPekerjaanOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch Pekerjaan data:', error);
      }
  };

  const loadPendidikanOptions = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pendidikan`);
        setPendidikanOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch Pendidikan data:', error);
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
        await updateWali(id, formData); // Update Wali
      } else {
        await createWali(formData); // Create new Wali
      }
      navigate('/wali'); // Redirect to Wali list
    } catch (error) {
      console.error('Error submitting wali data:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/wali'); // Navigate back to Wali list
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" /> {/* TopBar added */}
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} /> {/* SideBar added */}

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Wali
            </button>
          </nav>

          
            <h1 className="text-2xl font-bold mb-4 text-center">{id ? 'Edit Wali' : 'Tambah Wali'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="no_kk"
                    value={formData.no_kk}
                    onChange={handleChange}
                    placeholder="No KK"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="nik_wali"
                    value={formData.nik_wali}
                    onChange={handleChange}
                    placeholder="NIK Wali"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="nama_wali"
                    value={formData.nama_wali}
                    onChange={handleChange}
                    placeholder="Nama Wali"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="tempat_lahir_wali"
                    value={formData.tempat_lahir_wali}
                    onChange={handleChange}
                    placeholder="Tempat Lahir"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="date"
                    name="tanggal_lahir_wali"
                    value={formData.tanggal_lahir_wali}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                />
                <select
                    name="jenis_kelamin_wali"
                    value={formData.jenis_kelamin_wali}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="l">Laki-laki</option>
                    <option value="p">Perempuan</option>
                </select>
                <input
                    type="text"
                    name="alamat_ktp_wali"
                    value={formData.alamat_ktp_wali}
                    onChange={handleChange}
                    placeholder="Alamat KTP"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="kelurahan_ktp_wali"
                    value={formData.kelurahan_ktp_wali}
                    onChange={handleChange}
                    placeholder="Kelurahan KTP"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="kecamatan_ktp_wali"
                    value={formData.kecamatan_ktp_wali}
                    onChange={handleChange}
                    placeholder="Kecamatan KTP"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                    />
                    <input
                    type="text"
                    name="kota_ktp_wali"
                    value={formData.kota_ktp_wali}
                    onChange={handleChange}
                    placeholder="Kota KTP"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                    />
                    <input
                    type="text"
                    name="provinsi_ktp_wali"
                    value={formData.provinsi_ktp_wali}
                    onChange={handleChange}
                    placeholder="Provinsi KTP"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>

                <h2 className="text-xl font-semibold mb-3 text-blue-600">Alamat Domisili</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="alamat_domisili_wali"
                    value={formData.alamat_domisili_wali}
                    onChange={handleChange}
                    placeholder="Alamat Domisili"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="kelurahan_domisili_wali"
                    value={formData.kelurahan_domisili_wali}
                    onChange={handleChange}
                    placeholder="Kelurahan Domisili"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="kecamatan_domisili_wali"
                    value={formData.kecamatan_domisili_wali}
                    onChange={handleChange}
                    placeholder="Kecamatan Domisili"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                    />
                    <input
                    type="text"
                    name="kota_domisili_wali"
                    value={formData.kota_domisili_wali}
                    onChange={handleChange}
                    placeholder="Kota Domisili"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                    />
                    <input
                    type="text"
                    name="provinsi_domisili_wali"
                    value={formData.provinsi_domisili_wali}
                    onChange={handleChange}
                    placeholder="Provinsi Domisili"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>

                <h2 className="text-xl font-semibold mb-3 text-blue-600">Kontak</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="no_hp_wali"
                    value={formData.no_hp_wali}
                    onChange={handleChange}
                    placeholder="No HP Wali"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    name="email_wali"
                    value={formData.email_wali}
                    onChange={handleChange}
                    placeholder="Email Wali"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <select
                    name="pekerjaan_wali"
                    value={formData.pekerjaan_wali}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Pilih Pekerjaan</option>
                    {pekerjaanOptions.map((pekerjaan) => (
                    <option key={pekerjaan.id} value={pekerjaan.id}>
                        {pekerjaan.nama}
                    </option>
                    ))}
                </select>
                <select
                    name="pendidikan_wali"
                    value={formData.pendidikan_wali}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Pilih Pendidikan</option>
                    {pendidikanOptions.map((pendidikan) => (
                    <option key={pendidikan.id} value={pendidikan.id}>
                        {pendidikan.nama}
                    </option>
                    ))}
                </select>
                <select
                    name="posyandu"
                    value={formData.posyandu}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Pilih Posyandu</option>
                    {posyanduOptions.map((posyandu) => (
                      <option key={posyandu.id} value={posyandu.id}>
                        {posyandu.nama}
                      </option>
                    ))}
                </select>
                </div>

                <div className="flex justify-end">
                <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">
                    {id ? 'Update' : 'Tambah'}
                </button>
                <button
                    type="button"
                    onClick={handleBackToList}
                    className="text-gray-700 px-4 py-2 ml-4 rounded"
                >
                    Batal
                </button>
                </div>
            </form>
          
        </div>
      </div>
    </div>
  );
};

export default WaliForm;
