import React, { useState, useEffect } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { createDokumentasi, updateDokumentasi, getDokumentasiById } from './DokumentasiService';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Axios to handle the file upload

const DokumentasiForm = () => {
  const [dokumentasi, setDokumentasi] = useState({
    judul: '',
    deskripsi: '',
    tanggal: '',
    foto: null,
  });
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadDokumentasi();
    }
  }, [id]);

  const loadDokumentasi = async () => {
    try {
      const result = await getDokumentasiById(id);
      const doc = result.data;

      // Format the date properly for the input field (yyyy-MM-dd)
      const formattedDate = new Date(doc.tanggal).toISOString().split('T')[0];

      setDokumentasi({ ...doc, tanggal: formattedDate });
      setUploadedFileUrl(`${import.meta.env.VITE_API_URL}${doc.foto}`);
    } catch (error) {
      setError('Failed to load dokumentasi data');
      console.error('Failed to load dokumentasi data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dokumentasiToSubmit = { ...dokumentasi };

    try {
      const uploadedFilePath = await uploadFile();
      if (uploadedFilePath) {
        dokumentasiToSubmit.foto = uploadedFilePath;
      }
      console.log(dokumentasiToSubmit)
      if (id) {
        await updateDokumentasi(id, dokumentasiToSubmit);
      } else {
        await createDokumentasi(dokumentasiToSubmit);
      }
      navigate('/dokumentasi');
    } catch (error) {
      setError('Failed to save dokumentasi');
      console.error('Error saving dokumentasi:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDokumentasi((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(previewUrl);
  };

  const uploadFile = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData);
      const filePath = `/uploads/${response.data.fileName}`;
      setUploadedFileUrl(`${import.meta.env.VITE_API_URL}${filePath}`);
      return filePath;
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload file');
      return null;
    }
  };

  const handlePreviewClick = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleBackToList = () => {
    navigate('/dokumentasi');
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Dokumentasi
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Dokumentasi' : 'Tambah Dokumentasi'}</h2>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Column */}
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Judul Dokumentasi</label>
                <input
                  type="text"
                  name="judul"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={dokumentasi.judul}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Tanggal Dokumentasi</label>
                <input
                  type="date"
                  name="tanggal"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={dokumentasi.tanggal}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={dokumentasi.deskripsi}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Upload Foto</label>
                <input type="file" onChange={handleFileChange} accept="image/*" />
                {(previewUrl || uploadedFileUrl) && (
                  <div className="mt-4">
                    <p className="text-gray-700">Preview:</p>
                    <img
                      src={previewUrl || uploadedFileUrl}
                      alt="Dokumentasi Preview"
                      className="w-48 h-48 object-cover border cursor-pointer"
                      onClick={handlePreviewClick}
                    />
                  </div>
                )}
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

          {/* Modal for Image Preview */}
          {isPreviewOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative">
                <button className="absolute top-2 right-2 text-white text-2xl" onClick={handleClosePreview}>
                  &times;
                </button>
                <img src={previewUrl || uploadedFileUrl} alt="Full Preview" className="max-w-full max-h-screen" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DokumentasiForm;
