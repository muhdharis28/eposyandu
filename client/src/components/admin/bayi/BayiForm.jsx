import React, { useState, useEffect } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { createBayi, updateBayi, getBayiById } from '../../BayiService'; // API services for Bayi
import { getKader } from '../../PenggunaService'; // Assume this fetches users with the 'kader' role
import { getOrangTua } from '../../OrangTuaService'; // Service to fetch orangtua data
import { useNavigate, useParams } from 'react-router-dom';

const BayiForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama_balita: '',
    orangtua: '',
    nik_balita: '',
    jenis_kelamin_balita: '',
    tempat_lahir_balita: '',
    tanggal_lahir_balita: '',
    berat_badan_awal_balita: '',
    tinggi_badan_awal_balita: '',
    riwayat_penyakit_balita: '',
    riwayat_kelahiran_balita: '',
    keterangan_balita: '',
    kader: '',
  });
  const [orangtuaList, setOrangtuaList] = useState([]); // State to store orangtua list
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [kader, setKader] = useState(''); // Store selected kader
  const [kaderOptions, setKaderOptions] = useState([]); // Store list of kader options

  useEffect(() => {
    if (id) {
      loadBayi(); // Load bayi data if editing
    }
    fetchOrangtua(); // Fetch orangtua data when the form loads
    loadKaders(); // Load kader options
  }, [id]);

  const loadKaders = async () => {
    try {
      const result = await getKader(); // Fetch kader data (users with the role 'kader')
      setKaderOptions(result.data);
    } catch (error) {
      setError('Failed to load kader options.');
      console.error('Failed to load kader options:', error);
    }
  };

  const loadBayi = async () => {
    try {
      const result = await getBayiById(id); // Fetch bayi data by ID
      console.log(result.data)
      setFormData(result.data); // Set form data based on response
    } catch (error) {
      console.error('Failed to load bayi data:', error);
    }
  };

  const fetchOrangtua = async () => {
    try {
      const result = await getOrangTua(); // Fetch orangtua data from the backend
      setOrangtuaList(result.data); // Store the orangtua list in state
    } catch (error) {
      console.error('Failed to fetch orangtua data:', error);
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
        await updateBayi(id, formData); // Update bayi if editing
      } else {
        await createBayi(formData); // Create new bayi if adding
      }
      navigate('/balita'); // Navigate back to bayi list
    } catch (error) {
      console.error('Error submitting bayi data:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/balita'); // Navigate back to bayi list
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Balita
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Balita' : 'Tambah Balita'}</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Nama Balita</label>
                <input
                  type="text"
                  name="nama_balita"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.nama_balita}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Orang Tua</label>
                <select
                  name="orangtua"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.orangtua}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Orang Tua</option>
                  {orangtuaList.map((orangtua) => (
                    <option key={orangtua.id} value={orangtua.id}>
                      {orangtua.nama_ayah} - {orangtua.nama_ibu}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">NIK</label>
                <input
                  type="text"
                  name="nik_balita"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.nik_balita}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Jenis Kelamin</label>
                <select
                  name="jenis_kelamin_balita"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.jenis_kelamin_balita}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih</option>
                  <option value="l">Laki-laki</option>
                  <option value="p">Perempuan</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempat_lahir_balita"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.tempat_lahir_balita}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggal_lahir_balita"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.tanggal_lahir_balita}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Berat Badan Awal (kg)</label>
                <input
                  type="number"
                  name="berat_badan_awal_balita"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.berat_badan_awal_balita}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Tinggi Badan Awal (cm)</label>
                <input
                  type="number"
                  name="tinggi_badan_awal_balita"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.tinggi_badan_awal_balita}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Full Row for TextArea */}
            <div className="col-span-2">
              <div className="mb-4">
                <label className="block text-gray-700">Riwayat Penyakit</label>
                <textarea
                  name="riwayat_penyakit_balita"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.riwayat_penyakit_balita}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Riwayat Kelahiran</label>
                <textarea
                  name="riwayat_kelahiran_balita"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.riwayat_kelahiran_balita}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Keterangan</label>
                <textarea
                  name="keterangan_balita"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.keterangan_balita}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Kader</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={kader}
                  onChange={(e) => setKader(e.target.value)}
                  name="kader"
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

export default BayiForm;
