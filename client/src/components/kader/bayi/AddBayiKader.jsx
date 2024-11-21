import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createBayi } from '../../BayiService'; // Service to handle API requests
import { getOrangTua } from '../../OrangTuaService'; // Service to fetch all Orangtua data
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getPenggunaById } from '../../PenggunaService';

const AddBayiKader = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_balita: '',
    nik_balita: '',
    tempat_lahir_balita: '',
    tanggal_lahir_balita: '',
    jenis_kelamin_balita: '',
    riwayat_penyakit_balita: '',
    riwayat_kelahiran_balita: '',
    berat_badan_awal_balita: '',
    tinggi_badan_awal_balita: '',
    keterangan_balita: '',
    orangtua: null,
    posyandu: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [orangtuaOptions, setOrangtuaOptions] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrangtuaOptions = async () => {
      try {
        const response = await getOrangTua(); // Fetch the list of all Orangtua
        setOrangtuaOptions(response.data);
      } catch (error) {
        console.error('Error fetching Orangtua data:', error);
      }
    };

    fetchOrangtuaOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await getPenggunaById(userId);
      const updatedFormData = {
        ...formData,
        posyandu: response.data.posyanduDetail.id
      };
      await createBayi(updatedFormData); // Create a new Bayi with the form data
      navigate('/kader-balita'); // Redirect to the Bayi list after successful submission
    } catch (error) {
      console.error('Error adding bayi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.nama_balita) {
      errors.nama_balita = 'Nama balita wajib diisi';
    }

    if (!formData.nik_balita || !/^\d{16}$/.test(formData.nik_balita)) {
      errors.nik_balita = 'NIK balita harus berupa 16 digit angka';
    }

    if (!formData.tempat_lahir_balita) {
      errors.tempat_lahir_balita = 'Tempat lahir wajib diisi';
    }

    if (!formData.tanggal_lahir_balita) {
      errors.tanggal_lahir_balita = 'Tanggal lahir wajib diisi';
    }

    if (!formData.jenis_kelamin_balita) {
      errors.jenis_kelamin_balita = 'Jenis kelamin wajib diisi';
    }

    if (formData.berat_badan_awal_balita <= 0) {
      errors.berat_badan_awal_balita = 'Berat badan awal lebih dari 0';
    }

    if (formData.tinggi_badan_awal_balita <= 0) {
      errors.tinggi_badan_awal_balita = 'Tinggi badan awal lebih dari 0';
    }

    if (!formData.orangtua) {
      errors.orangtua = 'Orangtua wajib diisi';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          
          {/* Breadcrumb for navigation */}
          <nav className="text-gray-600 mb-4">
            <Link to="/kader-balita" className="hover:underline">Bayi List</Link> &gt; Tambah Bayi
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Tambah Bayi</h1>
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
                  <label className="block text-sm font-semibold">Orangtua</label>
                  <select
                    name="orangtua"
                    value={formData.orangtua}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Orangtua</option>
                    {orangtuaOptions.map((orangtua) => (
                      <option key={orangtua.id} value={orangtua.id}>
                        {orangtua.nama_ayah} - {orangtua.nama_ibu}
                      </option>
                    ))}
                  </select>
                  {errors.orangtua && <p className="text-red-500 text-sm">{errors.orangtua}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">NIK Bayi
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nik_balita"
                    value={formData.nik_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.nik_balita && <p className="text-red-500 text-sm">{errors.nik_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Nama Bayi
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama_balita"
                    value={formData.nama_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.nama_balita && <p className="text-red-500 text-sm">{errors.nama_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tempat Lahir
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="tempat_lahir_balita"
                    value={formData.tempat_lahir_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.tempat_lahir_balita && <p className="text-red-500 text-sm">{errors.tempat_lahir_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tanggal Lahir
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="tanggal_lahir_balita"
                    value={formData.tanggal_lahir_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.tanggal_lahir_balita && <p className="text-red-500 text-sm">{errors.tanggal_lahir_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Jenis Kelamin
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenis_kelamin_balita"
                    value={formData.jenis_kelamin_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih</option>
                    <option value="l">Laki-laki</option>
                    <option value="p">Perempuan</option>
                  </select>
                  {errors.jenis_kelamin_balita && <p className="text-red-500 text-sm">{errors.jenis_kelamin_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Berat Badan Awal (gram)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="berat_badan_awal_balita"
                    value={formData.berat_badan_awal_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.berat_badan_awal_balita && <p className="text-red-500 text-sm">{errors.berat_badan_awal_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tinggi Badan Awal (cm)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="tinggi_badan_awal_balita"
                    value={formData.tinggi_badan_awal_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.tinggi_badan_awal_balita && <p className="text-red-500 text-sm">{errors.tinggi_badan_awal_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Riwayat Penyakit</label>
                  <input
                    type="text"
                    name="riwayat_penyakit_balita"
                    value={formData.riwayat_penyakit_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.riwayat_penyakit_balita && <p className="text-red-500 text-sm">{errors.riwayat_penyakit_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Riwayat Kelahiran</label>
                  <input
                    type="text"
                    name="riwayat_kelahiran_balita"
                    value={formData.riwayat_kelahiran_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.riwayat_kelahiran_balita && <p className="text-red-500 text-sm">{errors.riwayat_kelahiran_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Keterangan</label>
                  <input
                    type="text"
                    name="keterangan_balita"
                    value={formData.keterangan_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.keterangan_balita && <p className="text-red-500 text-sm">{errors.keterangan_balita}</p>}
                </div>
                
              </div>

              <button
                type="submit"
                className={`mt-6 px-6 py-2 rounded-lg text-white ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Mengirim...' : 'Tambah'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBayiKader;
