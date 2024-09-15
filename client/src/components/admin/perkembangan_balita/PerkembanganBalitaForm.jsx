import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPerkembanganBalita, updatePerkembanganBalita, getPerkembanganBalitaById } from '../../PerkembanganBalitaService'; // Adjust the path if needed
import { getBayi } from '../../BayiService'; // Service to fetch Balita options
import { getKader } from '../../PenggunaService'; // Service to fetch Kader options
import { getDoctors } from '../dokter/DokterService'; // Service to fetch Doctor options
import TopBar from '../TopBar'; // Adjust the path as necessary
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext'; // Sidebar context for state management

const PerkembanganBalitaForm = () => {
  const { id } = useParams(); // Get the ID from the URL params if editing
  const navigate = useNavigate(); // For navigation
  const [formData, setFormData] = useState({
    balita: '',
    tanggal_kunjungan: '',
    berat_badan: '',
    tinggi_badan: '',
    lingkar_kepala: '',
    status_gizi: '',
    tipe_imunisasi: '',
    tipe_vitamin: '',
    keterangan: '',
    kader: '',
    dokter: '',
  });
  const [balitaOptions, setBalitaOptions] = useState([]);
  const [kaderOptions, setKaderOptions] = useState([]);
  const [dokterOptions, setDokterOptions] = useState([]);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadPerkembanganBalita(); // Load Perkembangan Balita data if editing
    }
    loadBalitaOptions();
    loadKaderOptions();
    loadDokterOptions();
  }, [id]);

  const loadPerkembanganBalita = async () => {
    try {
      const result = await getPerkembanganBalitaById(id);
      setFormData(result.data); // Set the data in form for editing
    } catch (error) {
      setError('Failed to load Perkembangan Balita data.');
      console.error('Failed to load data:', error);
    }
  };

  const loadBalitaOptions = async () => {
    try {
      const result = await getBayi();
      setBalitaOptions(result.data);
    } catch (error) {
      console.error('Failed to load Balita data:', error);
    }
  };

  const loadKaderOptions = async () => {
    try {
      const result = await getKader();
      setKaderOptions(result.data);
    } catch (error) {
      console.error('Failed to load Kader data:', error);
    }
  };

  const loadDokterOptions = async () => {
    try {
      const result = await getDoctors();
      setDokterOptions(result.data);
    } catch (error) {
      console.error('Failed to load Dokter data:', error);
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
        await updatePerkembanganBalita(id, formData); // Update existing Perkembangan Balita
      } else {
        await createPerkembanganBalita(formData); // Create a new Perkembangan Balita
      }
      navigate('/perkembangan-balita'); // Navigate back to the list
    } catch (error) {
      setError('Failed to save Perkembangan Balita data.');
      console.error('Error saving Perkembangan Balita:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/perkembangan-balita'); // Navigate back to the list
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Perkembangan Balita
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Perkembangan Balita' : 'Tambah Perkembangan Balita'}</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Balita Dropdown */}
            <div className="col-span-1">
              <label className="block text-gray-700">Balita</label>
              <select
                name="balita"
                value={formData.balita}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Pilih Balita</option>
                {balitaOptions.map((balita) => (
                  <option key={balita.id} value={balita.id}>
                    {balita.nama_balita}
                  </option>
                ))}
              </select>
            </div>

            {/* Tanggal Kunjungan */}
            <div className="col-span-1">
              <label className="block text-gray-700">Tanggal Kunjungan</label>
              <input
                type="date"
                name="tanggal_kunjungan"
                value={formData.tanggal_kunjungan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Berat Badan */}
            <div className="col-span-1">
              <label className="block text-gray-700">Berat Badan (kg)</label>
              <input
                type="number"
                name="berat_badan"
                value={formData.berat_badan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Tinggi Badan */}
            <div className="col-span-1">
              <label className="block text-gray-700">Tinggi Badan (cm)</label>
              <input
                type="number"
                name="tinggi_badan"
                value={formData.tinggi_badan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Lingkar Kepala */}
            <div className="col-span-1">
              <label className="block text-gray-700">Lingkar Kepala (cm)</label>
              <input
                type="number"
                name="lingkar_kepala"
                value={formData.lingkar_kepala}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Status Gizi */}
            <div className="col-span-1">
              <label className="block text-gray-700">Status Gizi</label>
              <select
                name="status_gizi"
                value={formData.status_gizi}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Pilih Status Gizi</option>
                <option value="buruk">Buruk</option>
                <option value="kurang">Kurang</option>
                <option value="baik">Baik</option>
                <option value="lebih">Lebih</option>
                <option value="obesitas">Obesitas</option>
              </select>
            </div>

            {/* Tipe Imunisasi */}
            <div className="col-span-1">
              <label className="block text-gray-700">Tipe Imunisasi</label>
              <select
                name="tipe_imunisasi"
                value={formData.tipe_imunisasi}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Pilih Imunisasi</option>
                <option value="">Tidak Ada</option>
                <option value="BCGE">BCG</option>
                <option value="Hepatitis B">Hepatitis B</option>
                <option value="Polio">Polio</option>
                <option value="DPT-HB-Hib">DPT-HB-Hib</option>
                <option value="Campak">Campak</option>
                <option value="MR">MR</option>
              </select>
            </div>

            {/* Tipe Vitamin */}
            <div className="col-span-1">
              <label className="block text-gray-700">Tipe Vitamin</label>
              <select
                name="tipe_vitamin"
                value={formData.tipe_vitamin}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Pilih Vitamin</option>
                <option value="A">Vitamin A</option>
                <option value="Cacing">Cacing</option>
              </select>
            </div>

            {/* Keterangan */}
            <div className="col-span-2">
              <label className="block text-gray-700">Keterangan</label>
              <textarea
                name="keterangan"
                value={formData.keterangan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Kader Dropdown */}
            <div className="col-span-1">
              <label className="block text-gray-700">Kader</label>
              <select
                name="kader"
                value={formData.kader}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Pilih Kader</option>
                {kaderOptions.map((kader) => (
                  <option key={kader.id} value={kader.id}>
                    {kader.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Dokter Dropdown */}
            <div className="col-span-1">
              <label className="block text-gray-700">Dokter</label>
              <select
                name="dokter"
                value={formData.dokter}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Pilih Dokter</option>
                {dokterOptions.map((dokter) => (
                  <option key={dokter.id} value={dokter.id}>
                    {dokter.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="col-span-2 flex justify-end">
              <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">
                {id ? 'Update' : 'Tambah'}
              </button>
              <button type="button" onClick={handleBackToList} className="text-gray-700 px-4 py-2 ml-4 rounded">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerkembanganBalitaForm;
