// KegiatanDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getKegiatanById } from './KegiatanService'; // Assume this service fetches kegiatan details
import TopBar from '../TopBar'; // Adjust the path if necessary
import SideBar from '../SideBar'; // Adjust the path if necessary
import { useSidebar } from '../../SideBarContext'; // Use context for sidebar state

const KegiatanDetail = () => {
  const { id } = useParams();
  const [kegiatan, setKegiatan] = useState(null);
  const [error, setError] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    loadKegiatanDetail();
  }, [id]);

  const loadKegiatanDetail = async () => {
    try {
      const result = await getKegiatanById(id); // API call to get kegiatan details
      setKegiatan(result.data);
    } catch (error) {
      setError('Failed to load kegiatan details.');
      console.error('Failed to load kegiatan details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/kegiatan'); // Navigate back to kegiatan list
  };

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!kegiatan) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col mt-16">
      {/* TopBar with toggle button for sidebar */}
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar with collapsible functionality */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out">
          {/* Breadcrumb navigation */}
          <nav className="text-sm text-gray-600 mb-4">
            <button
              onClick={handleBackToList}
              className="text-blue-500 hover:underline"
            >
              &lt; Kembali ke Daftar Kegiatan
            </button>
          </nav>

          {/* Detail section with two-column layout */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Detail Kegiatan</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="col-span-1">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Nama Kegiatan</h3>
                  <p className="text-gray-600">{kegiatan.nama}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Tanggal</h3>
                  <p className="text-gray-600">{kegiatan.tanggal}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-1">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Jenis Kegiatan</h3>
                  <p className="text-gray-600">{kegiatan.jenis}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Deskripsi</h3>
                  <p className="text-gray-600">{kegiatan.deskripsi}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KegiatanDetail;
