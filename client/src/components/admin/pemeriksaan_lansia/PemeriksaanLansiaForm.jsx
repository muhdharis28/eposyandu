import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPemeriksaanLansiaById, createPemeriksaanLansia, updatePemeriksaanLansia } from './PemeriksaanLansiaService'; // You need to implement this service
import { getLansia } from '../lansia/LansiaService'; // Fetch Lansia data
import { getDoctors } from '../dokter/DokterService'; // Fetch Dokter data
import { getKader } from '../pengguna/PenggunaService'; // Fetch Kader data
import TopBar from '../TopBar'; // Import the TopBar
import SideBar from '../SideBar'; // Import the SideBar
import { useSidebar } from '../../SideBarContext'; 

const PemeriksaanLansiaForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    lansia: '',
    tanggal_kunjungan: '',
    berat_badan: '',
    tinggi_badan: '',
    lingkar_perut: '',
    tekanan_darah: '',
    gula_darah: '',
    kolestrol: '',
    asam_urat: '',
    kesehatan_mata: '',
    keterangan: '',
    riwayat_obat: '',
    riwayat_penyakit: '',
    kader: '',
    dokter: '',
  });

  const [lansiaOptions, setLansiaOptions] = useState([]);
  const [dokterOptions, setDokterOptions] = useState([]);
  const [kaderOptions, setKaderOptions] = useState([]);
  const navigate = useNavigate();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  useEffect(() => {
    if (id) {
      loadPemeriksaanLansia(); // Load Pemeriksaan Lansia data if editing
    }
    loadLansiaOptions();
    loadDokterOptions();
    loadKaderOptions();
  }, [id]);

  const loadPemeriksaanLansia = async () => {
    try {
      const result = await getPemeriksaanLansiaById(id);
      setFormData(result.data);
    } catch (error) {
      console.error('Failed to load pemeriksaan lansia data:', error);
    }
  };

  const loadLansiaOptions = async () => {
    try {
      const result = await getLansia();
      setLansiaOptions(result.data);
    } catch (error) {
      console.error('Failed to fetch Lansia data:', error);
    }
  };

  const loadDokterOptions = async () => {
    try {
      const result = await getDoctors();
      setDokterOptions(result.data);
    } catch (error) {
      console.error('Failed to fetch Dokter data:', error);
    }
  };

  const loadKaderOptions = async () => {
    try {
      const result = await getKader();
      setKaderOptions(result.data);
    } catch (error) {
      console.error('Failed to fetch Kader data:', error);
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
        await updatePemeriksaanLansia(id, formData); // Update if editing
      } else {
        await createPemeriksaanLansia(formData); // Create new record
      }
      navigate('/pemeriksaan-lansia'); // Navigate back to the list after form submission
    } catch (error) {
      console.error('Error submitting pemeriksaan lansia data:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/pemeriksaan-lansia'); // Navigate back to list
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
            <h1 className="text-2xl font-bold mb-4 text-center">{id ? 'Edit Pemeriksaan Lansia' : 'Tambah Pemeriksaan Lansia'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-gray-700">Lansia</span>
                    <select
                    name="lansia"
                    value={formData.lansia}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                    >
                    <option value="">Pilih Lansia</option>
                    {lansiaOptions.map((lansia) => (
                        <option key={lansia.id} value={lansia.id}>
                        {lansia.nama_lansia}
                        </option>
                    ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-700">Tanggal Kunjungan</span>
                    <input
                    type="date"
                    name="tanggal_kunjungan"
                    value={formData.tanggal_kunjungan}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Berat Badan (kg)</span>
                    <input
                    type="number"
                    name="berat_badan"
                    value={formData.berat_badan}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Tinggi Badan (cm)</span>
                    <input
                    type="number"
                    name="tinggi_badan"
                    value={formData.tinggi_badan}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Lingkar Perut (cm)</span>
                    <input
                    type="number"
                    name="lingkar_perut"
                    value={formData.lingkar_perut}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Tekanan Darah (mmHg)</span>
                    <input
                    type="number"
                    name="tekanan_darah"
                    value={formData.tekanan_darah}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-gray-700">Gula Darah (mg/dL)</span>
                    <input
                    type="number"
                    name="gula_darah"
                    value={formData.gula_darah}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Kolesterol (mg/dL)</span>
                    <input
                    type="number"
                    name="kolestrol"
                    value={formData.kolestrol}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Asam Urat (mg/dL)</span>
                    <input
                    type="number"
                    name="asam_urat"
                    value={formData.asam_urat}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Kesehatan Mata (/10)</span>
                    <input
                    type="number"
                    name="kesehatan_mata"
                    value={formData.kesehatan_mata}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-gray-700">Riwayat Obat</span>
                    <textarea
                    name="riwayat_obat"
                    value={formData.riwayat_obat}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Riwayat Penyakit</span>
                    <textarea
                    name="riwayat_penyakit"
                    value={formData.riwayat_penyakit}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Kader</span>
                    <select
                    name="kader"
                    value={formData.kader}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                    >
                    <option value="">Pilih Kader</option>
                    {kaderOptions.map((kader) => (
                        <option key={kader.id} value={kader.id}>
                        {kader.nama}
                        </option>
                    ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-700">Dokter</span>
                    <select
                    name="dokter"
                    value={formData.dokter}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                    >
                    <option value="">Pilih Dokter</option>
                    {dokterOptions.map((dokter) => (
                        <option key={dokter.id} value={dokter.id}>
                        {dokter.nama}
                        </option>
                    ))}
                    </select>
                </label>
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

export default PemeriksaanLansiaForm;
