import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {getBayiById, updateBayi} from '../../BayiService'; // Service to handle API requests
import { getOrangTua } from '../../OrangTuaService'; // Service to fetch Orangtua data
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import {useSidebar} from '../../SideBarContext';

const EditBayiKader = () => {
  const {isSidebarCollapsed, toggleSidebar} = useSidebar();
  const navigate = useNavigate();
  const {id} = useParams();
  const [orangtuaList, setOrangtuaList] = useState([]); // List of Orangtua

  const [formData,
    setFormData] = useState({
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
    orangtua: ''
  });

  const [isSubmitting,
    setIsSubmitting] = useState(false);
  const [errors,
    setErrors] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    const fetchBayiDetails = async() => {
      try {
        const response = await getBayiById(id); // Fetch the Lansia data by ID
        setFormData(response.data); // Pre-fill form with existing data
      } catch (error) {
        console.error('Error fetching Bayi data:', error);
      }
    };

    const fetchOrangtuaList = async() => {
      try {
        const response = await getOrangTua(); // Fetch the list of Orangtua
        setOrangtuaList(response.data); // Populate dropdown with Orangtua data
      } catch (error) {
        console.error('Error fetching Orangtua data:', error);
      }
    };

    fetchBayiDetails();
    fetchOrangtuaList();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await updateBayi(id, formData);
      navigate('/kader-balita');
    } catch (error) {
      console.error('Error adding bayi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.nama_balita) {
      errors.nama_balita = 'Nama balita is required';
    }

    
    if (!formData.nik_balita || String(formData.nik_balita).length !== 16) {
      errors.nik_balita = 'NIK balita must be 16 digits';
    }

    if (!formData.tempat_lahir_balita) {
      errors.tempat_lahir_balita = 'Tempat lahir is required';
    }

    if (!formData.tanggal_lahir_balita) {
      errors.tanggal_lahir_balita = 'Tanggal lahir is required';
    }

    if (!formData.jenis_kelamin_balita) {
      errors.jenis_kelamin_balita = 'Jenis kelamin is required';
    }

    if (formData.berat_badan_awal_balita <= 0) {
      errors.berat_badan_awal_balita = 'Berat badan awal must be positive';
    }

    if (formData.tinggi_badan_awal_balita <= 0) {
      errors.tinggi_badan_awal_balita = 'Tinggi badan awal must be positive';
    }

    if (!formData.orangtua) {
      errors.orangtua = 'Orangtua data is required. Please fill in the orangtua details';
    }

    setErrors(errors);

    // If there are no errors, return true (valid form), otherwise false
    return Object
      .keys(errors)
      .length === 0;
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar}/>
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed}/>
        <div
          className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">

          {/* Breadcrumb for navigation */}
          <nav className="text-gray-600 mb-4">
            <Link to="/kader-balita" className="hover:underline">Bayi List</Link>
            &gt; Tambah Bayi
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Tambah Bayi</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold">NIK Bayi</label>
                  <input
                    type="text"
                    name="nik_balita"
                    value={formData.nik_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nik_balita && <p className="text-red-500 text-sm">{errors.nik_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Nama Bayi</label>
                  <input
                    type="text"
                    name="nama_balita"
                    value={formData.nama_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nama_balita && <p className="text-red-500 text-sm">{errors.nama_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tempat Lahir</label>
                  <input
                    type="text"
                    name="tempat_lahir_balita"
                    value={formData.tempat_lahir_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tempat_lahir_balita && <p className="text-red-500 text-sm">{errors.tempat_lahir_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="tanggal_lahir_balita"
                    value={formData.tanggal_lahir_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tanggal_lahir_balita && <p className="text-red-500 text-sm">{errors.tanggal_lahir_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Jenis Kelamin</label>
                  <select
                    name="jenis_kelamin_balita"
                    value={formData.jenis_kelamin_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                    <option value="">Pilih</option>
                    <option value="l">Laki-laki</option>
                    <option value="p">Perempuan</option>
                  </select>
                  {errors.jenis_kelamin_balita && <p className="text-red-500 text-sm">{errors.jenis_kelamin_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Berat Badan Awal</label>
                  <input
                    type="number"
                    name="berat_badan_awal_balita"
                    value={formData.berat_badan_awal_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.berat_badan_awal_balita && <p className="text-red-500 text-sm">{errors.berat_badan_awal_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tinggi Badan Awal</label>
                  <input
                    type="number"
                    name="tinggi_badan_awal_balita"
                    value={formData.tinggi_badan_awal_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tinggi_badan_awal_balita && <p className="text-red-500 text-sm">{errors.tinggi_badan_awal_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Riwayat Penyakit</label>
                  <input
                    type="text"
                    name="riwayat_penyakit_balita"
                    value={formData.riwayat_penyakit_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.riwayat_penyakit_balita && <p className="text-red-500 text-sm">{errors.riwayat_penyakit_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Riwayat Kelahiran</label>
                  <input
                    type="text"
                    name="riwayat_kelahiran_balita"
                    value={formData.riwayat_kelahiran_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.riwayat_kelahiran_balita && <p className="text-red-500 text-sm">{errors.riwayat_kelahiran_balita}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Keterangan</label>
                  <input
                    type="text"
                    name="keterangan_balita"
                    value={formData.keterangan_balita}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.keterangan_balita && <p className="text-red-500 text-sm">{errors.keterangan_balita}</p>}
                </div>
                <div>
                <label className="block text-sm font-semibold">Orangtua</label>
                <select
                  name="orangtua"
                  value={formData.orangtua}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                  <option value="">Pilih Orangtua</option>
                  {orangtuaList.map((orangtua) => (
                    <option key={orangtua.id} value={orangtua.id}>
                      {orangtua.nama_ayah}-{orangtua.nama_ibu}
                    </option>
                  ))}
                </select>
                {errors.orangtua && <p className="text-red-500 text-sm">{errors.orangtua}</p>}
              </div>
              </div>

              <button
                type="submit"
                className={`mt-6 px-6 py-2 rounded-lg text-white ${isSubmitting
                ? 'bg-gray-400'
                : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={isSubmitting}>
                {isSubmitting
                  ? 'Updating...'
                  : 'Edit Bayi'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBayiKader;
