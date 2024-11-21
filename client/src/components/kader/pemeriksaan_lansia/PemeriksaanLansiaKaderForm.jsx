import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPemeriksaanLansiaById, createPemeriksaanLansia, updatePemeriksaanLansia } from '../../PemeriksaanLansiaService'; 
import { getLansia } from '../../LansiaService';
import { getDoctors } from '../../DokterService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const PemeriksaanLansiaKaderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

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
    kader: null,
    dokter: null
  });

  const [lansiaOptions, setLansiaOptions] = useState([]);
  const [dokterOptions, setDokterOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    if (loggedInUserId) {
      setFormData((prevData) => ({
        ...prevData,
        kader: loggedInUserId
      }));
    }
  }, []);

  useEffect(() => {
    if (id) {
      loadPemeriksaanLansia();
    }
    loadLansiaOptions();
    loadDokterOptions();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.lansia) newErrors.lansia = 'Lansia wajib diisi';
    if (!formData.tanggal_kunjungan) newErrors.tanggal_kunjungan = 'Tanggal Kunjungan wajib diisi';
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
        await updatePemeriksaanLansia(id, formData);
      } else {
        await createPemeriksaanLansia(formData);
      }
      navigate('/kader-pemeriksaan-lansia');
    } catch (error) {
      console.error('Error submitting pemeriksaan lansia data:', error);
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
            <Link to="/kader-pemeriksaan-lansia" className="hover:underline">Pemeriksaan Lansia List</Link> &gt; {id ? 'Edit Pemeriksaan Lansia' : 'Tambah Pemeriksaan Lansia'}
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Pemeriksaan Lansia' : 'Tambah Pemeriksaan Lansia'}</h1>
            <div
              className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
              <p className="text-sm font-bold">
                <span className="text-red-500">*</span>
                Wajib diisi
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold">Lansia
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="lansia"
                    value={formData.lansia}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Lansia</option>
                    {lansiaOptions.map((lansia) => (
                      <option key={lansia.id} value={lansia.id}>
                        {lansia.nama_lansia}
                      </option>
                    ))}
                  </select>
                  {errors.lansia && <p className="text-red-500 text-sm">{errors.lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tanggal Kunjungan
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="tanggal_kunjungan"
                    value={formData.tanggal_kunjungan}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.tanggal_kunjungan && <p className="text-red-500 text-sm">{errors.tanggal_kunjungan}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Dokter</label>
                  <select
                    name="dokter"
                    value={formData.dokter}
                    onChange={handleChange}
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
                  <label className="block text-sm font-semibold">Lingkar Perut (cm)</label>
                  <input
                    type="number"
                    name="lingkar_perut"
                    value={formData.lingkar_perut}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Tekanan Darah (mmHg)</label>
                  <input
                    type="number"
                    name="tekanan_darah"
                    value={formData.tekanan_darah}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Gula Darah (mg/dL)</label>
                  <input
                    type="number"
                    name="gula_darah"
                    value={formData.gula_darah}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Kolesterol (mg/dL)</label>
                  <input
                    type="number"
                    name="kolestrol"
                    value={formData.kolestrol}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Asam Urat (mg/dL)</label>
                  <input
                    type="number"
                    name="asam_urat"
                    value={formData.asam_urat}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Kesehatan Mata (/10)</label>
                  <input
                    type="number"
                    name="kesehatan_mata"
                    value={formData.kesehatan_mata}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Riwayat Obat</label>
                  <textarea
                    name="riwayat_obat"
                    value={formData.riwayat_obat}
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

              <div className="mt-6 flex justify-start space-x-4">
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-white ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Memproses...' : id ? 'Edit' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PemeriksaanLansiaKaderForm;
