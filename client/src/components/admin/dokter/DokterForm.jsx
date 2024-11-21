import React, { useState, useEffect } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { createDoctor, updateDoctor, getDoctorById } from '../../DokterService';
import { useNavigate, useParams } from 'react-router-dom';

const DokterForm = () => {
  const { id } = useParams();
  const [nama, setNama] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadDoctor();
    }
  }, [id]);

  const loadDoctor = async () => {
    try {
      const result = await getDoctorById(id);
      setNama(result.data.nama);
    } catch (error) {
      console.error('Failed to load doctor data:', error);
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

    const doctor = { nama };
    try {
      if (id) {
        await updateDoctor(id, doctor);
      } else {
        await createDoctor(doctor);
      }
      
      setNama('');
      navigate('/dokter');
    } catch (error) {
      console.error('Error submitting doctor data:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/dokter');
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Dokter
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Dokter' : 'Tambah Dokter'}</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Nama Dokter</label>
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

export default DokterForm;
