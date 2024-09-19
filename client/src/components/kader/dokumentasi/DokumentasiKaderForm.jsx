import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getDokumentasiById, createDokumentasi, updateDokumentasi } from '../../DokumentasiService'; // Adjust import paths as needed
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getKader } from '../../PenggunaService'; // Assume this fetches users with the 'kader' role

const DokumentasiKaderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  const [formData, setFormData] = useState({
    judul: '',
    tanggal: '',
    deskripsi: '',
    kader: '', // Options for selecting a kader
    foto: null,
  });

  const [kaderOptions, setKaderOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [filePreview, setFilePreview] = useState(null); // For image preview

  useEffect(() => {
    if (id) {
      loadDokumentasiKader();
    }
    loadKaderOptions();
  }, [id]);

  const loadDokumentasiKader = async () => {
    try {
      const result = await getDokumentasiById(id);
      setFormData({
        ...result.data,
        foto: null, // Set foto to null for editing (we will upload new one)
      });
    } catch (error) {
      console.error('Failed to load dokumentasi kader data:', error);
    }
  };

  const loadKaderOptions = async () => {
    try {
      const result = await getKader(); // Fetch available kader options
      setKaderOptions(result.data);
    } catch (error) {
      console.error('Failed to load kader options:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      foto: file,
    });
    setFilePreview(URL.createObjectURL(file)); // Show file preview
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.judul) newErrors.judul = 'Judul Dokumentasi is required';
    if (!formData.tanggal) newErrors.tanggal = 'Tanggal Dokumentasi is required';
    if (!formData.kader) newErrors.kader = 'Kader is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });

    try {
      if (id) {
        await updateDokumentasi(id, submitData); // Update existing dokumentasi
      } else {
        await createDokumentasi(submitData); // Create new dokumentasi
      }
      navigate('/kader-dokumentasi');
    } catch (error) {
      console.error('Error submitting dokumentasi kader data:', error);
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
            <Link to="/kader-dokumentasi" className="hover:underline">Dokumentasi Kader List</Link> &gt; {id ? 'Edit Dokumentasi Kader' : 'Tambah Dokumentasi Kader'}
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Dokumentasi Kader' : 'Tambah Dokumentasi Kader'}</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold">Judul Dokumentasi</label>
                  <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.judul && <p className="text-red-500 text-sm">{errors.judul}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">Tanggal Dokumentasi</label>
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
                  <label className="block text-sm font-semibold">Kader</label>
                  <select
                    name="kader"
                    value={formData.kader}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Kader</option>
                    {kaderOptions.map((kader) => (
                      <option key={kader.id} value={kader.id}>
                        {kader.nama} - {kader.posyanduDetail?.nama}
                      </option>
                    ))}
                  </select>
                  {errors.kader && <p className="text-red-500 text-sm">{errors.kader}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">Deskripsi</label>
                  <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Upload Foto</label>
                  <input type="file" onChange={handleFileChange} accept="image/*" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                  {filePreview && (
                    <img src={filePreview} alt="Preview" className="mt-4 w-40 h-40 object-cover rounded-md shadow" />
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-white ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : id ? 'Update Dokumentasi' : 'Tambah Dokumentasi'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/kader-dokumentasi')}
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

export default DokumentasiKaderForm;
