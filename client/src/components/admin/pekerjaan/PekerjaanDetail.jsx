import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../../PekerjaanService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const PekerjaanDetail = () => {
  const { id } = useParams();
  const [pekerjaan, setPekerjaan] = useState(null);
  const [error, setError] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    loadPekerjaanDetail();
  }, [id]);

  const loadPekerjaanDetail = async () => {
    try {
      const result = await getJobById(id);
      setPekerjaan(result.data);
    } catch (error) {
      setError('Failed to load pekerjaan details.');
      console.error('Failed to load pekerjaan details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/pekerjaan');
  };

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!pekerjaan) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button
              onClick={handleBackToList}
              className="text-blue-500 hover:underline"
            >
              &lt; Kembali ke Daftar Pekerjaan
            </button>
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Detail Pekerjaan</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Nama Pekerjaan</h3>
                  <p className="text-gray-600">{pekerjaan.nama}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PekerjaanDetail;
