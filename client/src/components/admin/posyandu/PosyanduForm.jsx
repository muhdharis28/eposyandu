import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPosyandu, updatePosyandu, getPosyanduById } from '../../PosyanduService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const PosyanduForm = () => {
  const { id } = useParams();
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  useEffect(() => {
    if (id) {
      loadPosyandu();
    }
  }, [id]);

  const loadPosyandu = async () => {
    try {
      const result = await getPosyanduById(id);
      const posyandu = result.data;
      setNama(posyandu.nama);
      setAlamat(posyandu.alamat);
    } catch (error) {
      setError('Failed to load posyandu data.');
      console.error('Failed to load posyandu data:', error);
    }
  };

  const isUserAuthorized = () => {
    const userRole = localStorage.getItem('role');
    return userRole === 'admin';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserAuthorized()) {
      alert('You are not authorized to perform this action.');
      return;
    }

    const posyandu = { nama, alamat };

    try {
      if (id) {
        await updatePosyandu(id, posyandu);
      } else {
        await createPosyandu(posyandu);
      }

      navigate('/posyandu');
    } catch (error) {
      setError('Failed to save posyandu data.');
      console.error('Error saving posyandu:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/posyandu');
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
                {id ? 'Edit' : 'Tambah'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PosyanduForm;
