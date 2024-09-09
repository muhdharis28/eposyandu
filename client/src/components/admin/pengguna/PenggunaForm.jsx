import React, { useState, useEffect } from 'react';
import { createPengguna, updatePengguna, getPengguna } from './PenggunaService'; // Adjust paths as necessary
import axios from 'axios';

const PenggunaForm = ({ id, onClose, refreshList }) => {
  const [pengguna, setPengguna] = useState({
    nama: '',
    email: '',
    role: 'user',
    no_hp: '',
    no_kk: '',
    no_ktp: '',
    foto_kk: null,
    kata_sandi: '',
  });
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState(''); // State to hold the preview URL
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (id) {
      loadPengguna();
    }
  }, [id]);

  const loadPengguna = async () => {
    try {
      const result = await getPengguna();
      const user = result.data.find((user) => user.id === id);
      if (user) {
        setPengguna(user);
        setUploadedFileUrl(encodeURI(`${import.meta.env.VITE_API_URL}${user.foto_kk}`));
      }
    } catch (error) {
      setError('Failed to load pengguna data');
      console.error('Failed to load pengguna data:', error);
    }
  };

  const isUserAuthorized = () => {
    const userRole = localStorage.getItem('role');
    return userRole === 'admin'; // Only admin can edit or add pengguna
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserAuthorized()) {
      alert('You are not authorized to perform this action.');
      return;
    }

    const fieldsToConvert = ['no_kk', 'no_hp', 'no_ktp'];
    const penggunaToSubmit = { ...pengguna };

    fieldsToConvert.forEach((field) => {
      if (penggunaToSubmit[field]) {
        penggunaToSubmit[field] = parseInt(penggunaToSubmit[field], 10) || penggunaToSubmit[field];
      }
    });

    try {
      const uploadedFilePath = await uploadFile();
      if (uploadedFilePath) {
        penggunaToSubmit.foto_kk = uploadedFilePath;
      }

      if (id) {
        await updatePengguna(id, penggunaToSubmit);
      } else {
        await createPengguna(penggunaToSubmit);
      }

      refreshList();
      onClose();
    } catch (error) {
      setError('Failed to save pengguna');
      console.error('Error saving pengguna:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPengguna((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a URL for preview
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Pengguna' : 'Tambah Pengguna'}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Form fields remain the same */}
        <div className="mb-4">
          <label className="block text-gray-700">Nama</label>
          <input
            type="text"
            name="nama"
            className="w-full p-2 border border-gray-300 rounded"
            value={pengguna.nama}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={pengguna.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            className="w-full p-2 border border-gray-300 rounded"
            value={pengguna.role}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="kader">Kader</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">No. HP</label>
          <input
            type="tel"
            name="no_hp"
            className="w-full p-2 border border-gray-300 rounded"
            value={pengguna.no_hp}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">No. KK</label>
          <input
            type="text"
            name="no_kk"
            className="w-full p-2 border border-gray-300 rounded"
            value={pengguna.no_kk}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">No. KTP</label>
          <input
            type="text"
            name="no_ktp"
            className="w-full p-2 border border-gray-300 rounded"
            value={pengguna.no_ktp}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Kata Sandi</label>
          <input
            type="password"
            name="kata_sandi"
            className="w-full p-2 border border-gray-300 rounded"
            value={pengguna.kata_sandi}
            onChange={handleChange}
            required={!id}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Foto KK</label>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          {(previewUrl || uploadedFileUrl) && (
            <div className="mt-4">
              <p className="text-gray-700">Preview:</p>
              <img
                src={previewUrl || uploadedFileUrl}
                alt="Foto KK Preview"
                className="w-48 h-48 object-cover border cursor-pointer"
                onClick={handlePreviewClick}
              />
            </div>
          )}
        </div>
        <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">
          {id ? 'Update' : 'Tambah'}
        </button>
        <button type="button" onClick={onClose} className="text-gray-700 px-4 py-2 ml-4 rounded">
          Batal
        </button>
      </form>

      {/* Modal for Image Preview */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={handleClosePreview}
            >
              &times;
            </button>
            <img src={previewUrl || uploadedFileUrl} alt="Full Preview" className="max-w-full max-h-screen" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PenggunaForm;
