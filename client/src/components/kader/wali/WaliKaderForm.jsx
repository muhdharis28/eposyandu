import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getWaliById, createWali, updateWali } from '../../WaliService'; // Replace with actual service paths
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const WaliKaderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  const [formData, setFormData] = useState({
    no_kk: '',
    nik_wali: '',
    nama_wali: '',
    tempat_lahir_wali: '',
    tanggal_lahir_wali: '',
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
    pendidikan_wali: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      loadWaliKader();
    }
  }, [id]);

  const loadWaliKader = async () => {
    try {
      const result = await getWaliById(id);
      setFormData(result.data);
    } catch (error) {
      console.error('Failed to load Wali data:', error);
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
    if (!formData.nama_wali) newErrors.nama_wali = 'Nama Wali is required';
    if (!formData.nik_wali) newErrors.nik_wali = 'NIK Wali is required';
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
        await updateWali(id, formData);
      } else {
        await createWali(formData);
      }
      navigate('/kader-wali');
    } catch (error) {
      console.error('Error submitting Wali data:', error);
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
            <Link to="/kader-wali" className="hover:underline">Wali List</Link> &gt; {id ? 'Edit Wali' : 'Tambah Wali'}
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Wali' : 'Tambah Wali'}</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold">Nama Wali</label>
                  <input
                    type="text"
                    name="nama_wali"
                    value={formData.nama_wali}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.nama_wali && <p className="text-red-500 text-sm">{errors.nama_wali}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">NIK Wali</label>
                  <input
                    type="text"
                    name="nik_wali"
                    value={formData.nik_wali}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.nik_wali && <p className="text-red-500 text-sm">{errors.nik_wali}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">Tanggal Lahir Wali</label>
                  <input
                    type="date"
                    name="tanggal_lahir_wali"
                    value={formData.tanggal_lahir_wali}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Alamat Domisili Wali</label>
                  <input
                    type="text"
                    name="alamat_domisili_wali"
                    value={formData.alamat_domisili_wali}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">No HP Wali</label>
                  <input
                    type="text"
                    name="no_hp_wali"
                    value={formData.no_hp_wali}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Email Wali</label>
                  <input
                    type="email"
                    name="email_wali"
                    value={formData.email_wali}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Pekerjaan Wali</label>
                  <input
                    type="text"
                    name="pekerjaan_wali"
                    value={formData.pekerjaan_wali}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Pendidikan Wali</label>
                  <input
                    type="text"
                    name="pendidikan_wali"
                    value={formData.pendidikan_wali}
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
                  {isSubmitting ? 'Submitting...' : id ? 'Update Wali' : 'Tambah Wali'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/kader-wali')}
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

export default WaliKaderForm;
