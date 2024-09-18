import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and URL parameters
import { createPosyandu, updatePosyandu, getPosyanduById } from '../../PosyanduService'; // API services
import TopBar from '../TopBar'; // Adjust the path as necessary
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext'; // Sidebar context for state management

const PosyanduForm = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state

  useEffect(() => {
    if (id) {
      loadPosyandu(); // Load posyandu data if editing
    }
  }, [id]);

  const loadPosyandu = async () => {
    try {
      const result = await getPosyanduById(id); // Fetch posyandu data by ID
      const posyandu = result.data;
      setNama(posyandu.nama);
      setAlamat(posyandu.alamat);
    } catch (error) {
      setError('Failed to load posyandu data.');
      console.error('Failed to load posyandu data:', error);
    }
  };

  const isUserAuthorized = () => {
    const userRole = localStorage.getItem('role'); // Assuming roles are stored in local storage
    return userRole === 'admin'; // Only admin can edit or add posyandus
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserAuthorized()) {
      alert('You are not authorized to perform this action.');
      return; // Prevent submission
    }

    const posyandu = { nama, alamat };

    try {
      if (id) {
        await updatePosyandu(id, posyandu); // Update posyandu if editing
      } else {
        await createPosyandu(posyandu); // Create new posyandu if no ID is provided
      }

      navigate('/posyandu'); // Navigate back to posyandu list
    } catch (error) {
      setError('Failed to save posyandu data.');
      console.error('Error saving posyandu:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/posyandu'); // Navigate back to the list
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
              &lt; Kembali ke Daftar Posyandu
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Posyandu' : 'Tambah Posyandu'}</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Nama Posyandu</label>
                <input
                  type="text"
                  name="nama"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Alamat Posyandu</label>
                <input
                  type="text"
                  name="alamat"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-500 px-4 py-2 rounded"
              >
                {id ? 'Update' : 'Tambah'}
              </button>
              <button
                type="button"
                onClick={handleBackToList}
                className="text-gray-700 px-4 py-2 ml-4 rounded"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PosyanduForm;
