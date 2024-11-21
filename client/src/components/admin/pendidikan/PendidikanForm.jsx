import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPendidikan, updatePendidikan, getPendidikanById } from '../../PendidikanService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const PendidikanForm = () => {
  const { id } = useParams();
  const [nama, setNama] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  useEffect(() => {
    if (id) {
      loadJob();
    }
  }, [id]);

  const loadJob = async () => {
    try {
      const result = await getPendidikanById(id);
      const job = result.data;
      setNama(job.nama);
    } catch (error) {
      setError('Failed to load job data.');
      console.error('Failed to load job data:', error);
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

    const job = { nama };

    try {
      if (id) {
        await updatePendidikan(id, job);
      } else {
        await createPendidikan(job);
      }

      navigate('/pendidikan');
    } catch (error) {
      setError('Failed to save job data.');
      console.error('Error saving job:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/pendidikan');
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Pendidikan
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Pendidikan' : 'Tambah Pendidikan'}</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Nama Pendidikan</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
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

export default PendidikanForm;
