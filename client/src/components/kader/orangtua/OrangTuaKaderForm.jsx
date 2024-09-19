import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getOrangTuaById, createOrangTua, updateOrangTua } from '../../OrangTuaService'; // Replace with actual service paths
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const OrangTuaKaderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  const [formData, setFormData] = useState({
    no_kk: '',
    nik_ibu: '',
    nama_ibu: '',
    tempat_lahir_ibu: '',
    tanggal_lahir_ibu: '',
    alamat_ktp_ibu: '',
    kelurahan_ktp_ibu: '',
    kecamatan_ktp_ibu: '',
    kota_ktp_ibu: '',
    provinsi_ktp_ibu: '',
    alamat_domisili_ibu: '',
    kelurahan_domisili_ibu: '',
    kecamatan_domisili_ibu: '',
    kota_domisili_ibu: '',
    provinsi_domisili_ibu: '',
    no_hp_ibu: '',
    email_ibu: '',
    pekerjaan_ibu: '',
    pendidikan_ibu: '',
    nik_ayah: '',
    nama_ayah: '',
    tempat_lahir_ayah: '',
    tanggal_lahir_ayah: '',
    alamat_ktp_ayah: '',
    kelurahan_ktp_ayah: '',
    kecamatan_ktp_ayah: '',
    kota_ktp_ayah: '',
    provinsi_ktp_ayah: '',
    alamat_domisili_ayah: '',
    kelurahan_domisili_ayah: '',
    kecamatan_domisili_ayah: '',
    kota_domisili_ayah: '',
    provinsi_domisili_ayah: '',
    no_hp_ayah: '',
    email_ayah: '',
    pekerjaan_ayah: '',
    pendidikan_ayah: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      loadOrangTuaKader();
    }
  }, [id]);

  const loadOrangTuaKader = async () => {
    try {
      const result = await getOrangTuaById(id);
      setFormData(result.data);
    } catch (error) {
      console.error('Failed to load Orang Tua data:', error);
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
    if (!formData.nama_ibu) newErrors.nama_ibu = 'Nama Ibu is required';
    if (!formData.nik_ibu) newErrors.nik_ibu = 'NIK Ibu is required';
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
        await updateOrangTua(id, formData);
      } else {
        await createOrangTua(formData);
      }
      navigate('/kader-orangtua');
    } catch (error) {
      console.error('Error submitting Orang Tua data:', error);
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
            <Link to="/kader-orangtua" className="hover:underline">Orang Tua List</Link> &gt; {id ? 'Edit Orang Tua' : 'Tambah Orang Tua'}
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Orang Tua' : 'Tambah Orang Tua'}</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold">Nama Ibu</label>
                  <input
                    type="text"
                    name="nama_ibu"
                    value={formData.nama_ibu}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.nama_ibu && <p className="text-red-500 text-sm">{errors.nama_ibu}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">NIK Ibu</label>
                  <input
                    type="text"
                    name="nik_ibu"
                    value={formData.nik_ibu}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.nik_ibu && <p className="text-red-500 text-sm">{errors.nik_ibu}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">Tanggal Lahir Ibu</label>
                  <input
                    type="date"
                    name="tanggal_lahir_ibu"
                    value={formData.tanggal_lahir_ibu}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Alamat Domisili Ibu</label>
                  <input
                    type="text"
                    name="alamat_domisili_ibu"
                    value={formData.alamat_domisili_ibu}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">No HP Ibu</label>
                  <input
                    type="text"
                    name="no_hp_ibu"
                    value={formData.no_hp_ibu}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Email Ibu</label>
                  <input
                    type="email"
                    name="email_ibu"
                    value={formData.email_ibu}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Pekerjaan Ibu</label>
                  <input
                    type="text"
                    name="pekerjaan_ibu"
                    value={formData.pekerjaan_ibu}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Pendidikan Ibu</label>
                  <input
                    type="text"
                    name="pendidikan_ibu"
                    value={formData.pendidikan_ibu}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                {/* Add similar fields for Ayah as required */}
                <div>
                  <label className="block text-sm font-semibold">Nama Ayah</label>
                  <input
                    type="text"
                    name="nama_ayah"
                    value={formData.nama_ayah}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">NIK Ayah</label>
                  <input
                    type="text"
                    name="nik_ayah"
                    value={formData.nik_ayah}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Tanggal Lahir Ayah</label>
                  <input
                    type="date"
                    name="tanggal_lahir_ayah"
                    value={formData.tanggal_lahir_ayah}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Alamat Domisili Ayah</label>
                  <input
                    type="text"
                    name="alamat_domisili_ayah"
                    value={formData.alamat_domisili_ayah}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">No HP Ayah</label>
                  <input
                    type="text"
                    name="no_hp_ayah"
                    value={formData.no_hp_ayah}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Email Ayah</label>
                  <input
                    type="email"
                    name="email_ayah"
                    value={formData.email_ayah}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Pekerjaan Ayah</label>
                  <input
                    type="text"
                    name="pekerjaan_ayah"
                    value={formData.pekerjaan_ayah}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Pendidikan Ayah</label>
                  <input
                    type="text"
                    name="pendidikan_ayah"
                    value={formData.pendidikan_ayah}
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
                  {isSubmitting ? 'Submitting...' : id ? 'Update Orang Tua' : 'Tambah Orang Tua'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/kader-orangtua')}
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

export default OrangTuaKaderForm;
