import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPengguna, updatePengguna, getPenggunaById } from '../../PenggunaService';
import { getPosyandus } from '../../PosyanduService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import axios from 'axios';

const PenggunaForm = () => {
  const { id } = useParams();
  const [pengguna, setPengguna] = useState({
    nama: '',
    email: '',
    role: null,
    no_hp: '',
    no_kk: '',
    no_ktp: '',
    kata_sandi: '',
    verifikasi: true,
    posyandu: null,
  });
  const [error, setError] = useState('');
  const [posyanduOptions, setPosyanduOptions] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    if (id) {
      loadPengguna();
    }
    loadPosyandu();
  }, [id, userRole]);

  const loadPengguna = async () => {
    try {
      const result = await getPenggunaById(id);
      const fetchedPengguna = result.data;
      setPengguna(fetchedPengguna);
    } catch (error) {
      setError('Failed to load pengguna data.');
      console.error('Failed to load pengguna data:', error);
    }
  };

  const loadPosyandu = async () => {
    try {
      const result = await getPosyandus();
      console.log(result)
      setPosyanduOptions(result.data);
    } catch (error) {
      console.error('Failed to load posyandu data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePengguna(id, pengguna);
      } else {
        const uploadedFilePath = await uploadFile();
        pengguna.foto_kk = uploadedFilePath;
        await createPengguna(pengguna);
      }

      navigate('/pengguna');
    } catch (error) {
      setError('Failed to save pengguna data.');
      console.error('Error saving pengguna:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/pengguna');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPengguna((prevPengguna) => ({ ...prevPengguna, [name]: value }));
  };

  const uploadFile = async () => {
    if (!pengguna.foto_kk) return null;
    const formDataPengguna = new FormData();
    formDataPengguna.append('file', pengguna.foto_kk);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formDataPengguna);
      const filePath = `/uploads/${response.data.fileName}`;
      return filePath;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPengguna((prevPengguna) => ({ ...prevPengguna, foto_kk: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    const password = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setPengguna((prev) => ({ ...prev, kata_sandi: password }));
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Pengguna
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Pengguna' : 'Tambah Pengguna'}</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div>
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
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nomor Telepon</label>
                <input
                  type="tel"
                  name="no_hp"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={pengguna.no_hp}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nomor Kartu Keluarga</label>
                <input
                  type="text"
                  name="no_kk"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={pengguna.no_kk}
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
                  required
                >
                  <option value="kader">Kader</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Posyandu</label>
                <select
                  name="posyandu"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={pengguna.posyandu}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Posyandu</option>
                  {posyanduOptions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-gray-700">Nomor Induk Kependudukan</label>
                <input
                  type="text"
                  name="no_ktp"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={pengguna.no_ktp}
                  onChange={handleChange}
                  required
                />
              </div>
              {!id && pengguna.role !== 'kader' && (
                <div className="mb-4">
                  <label className="block text-gray-700">Foto Kartu Keluarga</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              )}
              {previewImage && (
                <div className="mb-4">
                  <img src={previewImage} alt="Preview" className="w-40 h-40 object-cover rounded-md shadow" />
                </div>
              )}
              {!id && (
                <div className="mb-4">
                  <label className="block text-gray-700">Kata Sandi</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="kata_sandi"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={pengguna.kata_sandi}
                      onChange={handleChange}
                      required
                      disabled
                    />
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="ml-2 px-3 py-2 text-white bg-gray-500 rounded"
                    >
                      Acak
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-4 flex space-x-4">
                <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">
                  {id ? 'Update' : 'Tambah'}
                </button>
                <button type="button" onClick={handleBackToList} className="text-gray-700 px-4 py-2 rounded">
                  Batal
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PenggunaForm;
