import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getKegiatanById, createKegiatan, updateKegiatan } from '../../KegiatanService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const KegiatanKaderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  const [formData, setFormData] = useState({
    nama: '',
    tanggal: '',
    deskripsi: '',
    jenis: '', // Options: 'balita', 'lansia'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      loadKegiatanKader();
    }
  }, [id]);

  const loadKegiatanKader = async () => {
    try {
      const result = await getKegiatanById(id);
      setFormData(result.data);
    } catch (error) {
      console.error('Failed to load kegiatan kader data:', error);
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
    if (!formData.nama) newErrors.nama = 'Nama Kegiatan is required';
    if (!formData.tanggal) newErrors.tanggal = 'Tanggal Kegiatan is required';
    if (!formData.jenis) newErrors.jenis = 'Jenis Kegiatan is required';
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
        await updateKegiatan(id, formData);
      } else {
        await createKegiatan(formData);
      }
      navigate('/kader-kegiatan');
    } catch (error) {
      console.error('Error submitting kegiatan kader data:', error);
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
            <Link to="/kader-kegiatan" className="hover:underline">Kegiatan Kader List</Link> &gt; {id ? 'Edit Kegiatan Kader' : 'Tambah Kegiatan Kader'}
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Kegiatan Kader' : 'Tambah Kegiatan Kader'}</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold">Nama Kegiatan</label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">Tanggal Kegiatan</label>
                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.tanggal && <p className="text-red-500 text-sm">{errors.tanggal}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">Jenis Kegiatan</label>
                  <select
                    name="jenis"
                    value={formData.jenis}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Jenis Kegiatan</option>
                    <option value="balita">Balita</option>
                    <option value="lansia">Lansia</option>
                  </select>
                  {errors.jenis && <p className="text-red-500 text-sm">{errors.jenis}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">Deskripsi Kegiatan</label>
                  <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
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
                  {isSubmitting ? 'Submitting...' : id ? 'Update Kegiatan' : 'Tambah Kegiatan'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/kader-kegiatan')}
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

export default KegiatanKaderForm;
