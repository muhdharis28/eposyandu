import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPerkembanganBalita, updatePerkembanganBalita, getPerkembanganBalitaById } from '../../PerkembanganBalitaService';
import { getBayi } from '../../BayiService';
import { getDoctors } from '../../DokterService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import {getPosyandus} from '../../PosyanduService';

const PerkembanganBalitaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    kader: null,
    dokter: null,
    posyandu: null
  });

  const [balitaOptions, setBalitaOptions] = useState([]);
  const [dokterOptions, setDokterOptions] = useState([]);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [posyanduOptions,
    setPosyanduOptions] = useState([]);

  useEffect(() => {
    if (id) {
      loadPerkembanganBalita();
    }
    loadBalitaOptions();
    loadPosyandu();
    loadDokterOptions();
  }, [id]);

  const loadPerkembanganBalita = async () => {
    try {
      const result = await getPerkembanganBalitaById(id);
      setFormData(result.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const loadPosyandu = async() => {
    try {
      const result = await getPosyandus();
      setPosyanduOptions(result.data);
    } catch (error) {
      console.error('Failed to load posyandu options:', error);
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
        await updatePerkembanganBalita(id, formData);
      } else {
        await createPerkembanganBalita(formData);
      }
      navigate('/perkembangan-balita');
    } catch (error) {
      console.error('Error saving Perkembangan Balita:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/perkembangan-balita');
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

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
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

            <div className="col-span-2">
              <label className="block text-gray-700">Keterangan</label>
              <textarea
                name="keterangan"
                value={formData.keterangan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <label className="block">
                <span className="text-gray-700">Posyandu</span>
                <select
                  name="posyandu"
                  value={formData.posyandu}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                  >
                  <option value="">Pilih Posyandu</option>
                  {posyanduOptions.map((posyandu) => (
                      <option key={posyandu.id} value={posyandu.id}>
                      {posyandu.nama}
                      </option>
                  ))}
                </select>
            </label>

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

            <div className="col-span-2 flex justify-start">
              <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">
                {id ? 'Edit' : 'Tambah'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerkembanganBalitaForm;
