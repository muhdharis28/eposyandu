import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPerkembanganBalitaById, createPerkembanganBalita, updatePerkembanganBalita } from '../../PerkembanganBalitaService'; 
import { getBayi } from '../../BayiService';
import { getDoctors } from '../../DokterService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const PerkembanganBalitaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  const [formData, setFormData] = useState({
    balita: '',
    tanggal_kunjungan: '',
    berat_badan: '',
    tinggi_badan: '',
    lingkar_kepala: '',
    imunisasi: '',
    riwayat_penyakit: '',
    keterangan: '',
    kader: '', // Will be automatically filled with logged-in user
    dokter: ''
  });

  const [balitaOptions, setBalitaOptions] = useState([]);
  const [dokterOptions, setDokterOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Get logged-in user ID from localStorage
  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    if (loggedInUserId) {
      setFormData((prevData) => ({
        ...prevData,
        kader: loggedInUserId // Set the kader field to the logged-in user ID
      }));
    }
  }, []);

  useEffect(() => {
    if (id) {
      loadPerkembanganBalita();
    }
    loadBalitaOptions();
    loadDokterOptions();
  }, [id]);

  const loadPerkembanganBalita = async () => {
    try {
      const result = await getPerkembanganBalitaById(id);
      setFormData(result.data);
    } catch (error) {
      console.error('Failed to load perkembangan balita data:', error);
    }
  };

  const loadBalitaOptions = async () => {
    try {
      const result = await getBayi();
      setBalitaOptions(result.data);
    } catch (error) {
      console.error('Failed to fetch Balita data:', error);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.balita) newErrors.balita = 'Balita is required';
    if (!formData.tanggal_kunjungan) newErrors.tanggal_kunjungan = 'Tanggal Kunjungan is required';
    if (!formData.dokter) newErrors.dokter = 'Dokter is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (id) {
        await updatePerkembanganBalita(id, formData);
      } else {
        await createPerkembanganBalita(formData);
      }
      navigate('/kader-perkembangan-balita');
    } catch (error) {
      console.error('Error submitting perkembangan balita data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          {/* Breadcrumb navigation */}
          <nav className="text-gray-600 mb-4">
            <Link to="/kader-perkembangan-balita" className="hover:underline">Perkembangan Balita List</Link> &gt; {id ? 'Edit Perkembangan Balita' : 'Tambah Perkembangan Balita'}
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Perkembangan Balita' : 'Tambah Perkembangan Balita'}</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold">Balita</label>
                  <select
                    name="balita"
                    value={formData.balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Balita</option>
                    {balitaOptions.map((balita) => (
                      <option key={balita.id} value={balita.id}>
                        {balita.nama_balita}
                      </option>
                    ))}
                  </select>
                  {errors.balita && <p className="text-red-500 text-sm">{errors.balita}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">Dokter</label>
                  <select
                    name="dokter"
                    value={formData.dokter}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Dokter</option>
                    {dokterOptions.map((dokter) => (
                      <option key={dokter.id} value={dokter.id}>
                        {dokter.nama}
                      </option>
                    ))}
                  </select>
                  {errors.dokter && <p className="text-red-500 text-sm">{errors.dokter}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">Tanggal Kunjungan</label>
                  <input
                    type="date"
                    name="tanggal_kunjungan"
                    value={formData.tanggal_kunjungan}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.tanggal_kunjungan && <p className="text-red-500 text-sm">{errors.tanggal_kunjungan}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">Berat Badan (kg)</label>
                  <input
                    type="number"
                    name="berat_badan"
                    value={formData.berat_badan}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Tinggi Badan (cm)</label>
                  <input
                    type="number"
                    name="tinggi_badan"
                    value={formData.tinggi_badan}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Lingkar Kepala (cm)</label>
                  <input
                    type="number"
                    name="lingkar_kepala"
                    value={formData.lingkar_kepala}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Imunisasi</label>
                  <textarea
                    name="imunisasi"
                    value={formData.imunisasi}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Riwayat Penyakit</label>
                  <textarea
                    name="riwayat_penyakit"
                    value={formData.riwayat_penyakit}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Keterangan</label>
                  <textarea
                    name="keterangan"
                    value={formData.keterangan}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-white ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : id ? 'Update Perkembangan' : 'Tambah Perkembangan'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/kader-perkembangan-balita')}
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerkembanganBalitaForm;
