import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and URL parameters
import { createPengguna, updatePengguna, getPenggunaById } from './PenggunaService'; // API services
import TopBar from '../TopBar'; // Adjust the path as necessary
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext'; // Sidebar context for state management

const PenggunaForm = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [pengguna, setPengguna] = useState({
    nama: '',
    email: '',
    role: 'user',
    no_hp: '',
    no_kk: '',
    no_ktp: '',
    kata_sandi: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state

  useEffect(() => {
    if (id) {
      loadPengguna(); // Load pengguna data if editing
    }
  }, [id]);

  const loadPengguna = async () => {
    try {
      const result = await getPenggunaById(id); // Fetch pengguna data by ID
      const fetchedPengguna = result.data;
      setPengguna(fetchedPengguna);
    } catch (error) {
      setError('Failed to load pengguna data.');
      console.error('Failed to load pengguna data:', error);
    }
  };

  const isUserAuthorized = () => {
    const userRole = localStorage.getItem('role'); // Assuming roles are stored in local storage
    return userRole === 'admin'; // Only admin can edit or add pengguna
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserAuthorized()) {
      alert('You are not authorized to perform this action.');
      return; // Prevent submission
    }

    try {
      if (id) {
        await updatePengguna(id, pengguna); // Update pengguna if editing
      } else {
        await createPengguna(pengguna); // Create new pengguna if no ID is provided
      }

      navigate('/pengguna'); // Navigate back to pengguna list
    } catch (error) {
      setError('Failed to save pengguna data.');
      console.error('Error saving pengguna:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/pengguna'); // Navigate back to the list
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPengguna((prevPengguna) => ({ ...prevPengguna, [name]: value }));
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Pengguna
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Pengguna' : 'Tambah Pengguna'}</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
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

              {!id && (
                <div className="mb-4">
                  <label className="block text-gray-700">Kata Sandi</label>
                  <input
                    type="password"
                    name="kata_sandi"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={pengguna.kata_sandi}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">
                {id ? 'Update' : 'Tambah'}
              </button>
              <button type="button" onClick={handleBackToList} className="text-gray-700 px-4 py-2 ml-4 rounded">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PenggunaForm;
