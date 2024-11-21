import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getKegiatanById } from '../../KegiatanService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

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
      const result = await getKegiatanById(id);
      setKegiatan(result.data);
    } catch (error) {
      setError('Failed to load kegiatan details.');
      console.error('Failed to load kegiatan details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/kegiatan');
  };

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!kegiatan) {
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
              &lt; Kembali ke Daftar Kegiatan
            </button>
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Detail Kegiatan</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Nama Kegiatan</h3>
                  <p className="text-gray-600">{kegiatan.nama}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Tanggal</h3>
                  <p className="text-gray-600">{kegiatan.tanggal}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Kader</h3>
                  <p className="text-gray-600">{kegiatan.kaderDetail?.nama || 'N/A'}</p>
                </div>
              </div>

              <div className="col-span-1">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Jenis Kegiatan</h3>
                  <p className="text-gray-600">{kegiatan.jenis}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Deskripsi</h3>
                  <p className="text-gray-600">{kegiatan.deskripsi}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Posyandu</h3>
                  <p className="text-gray-600">
                    {kegiatan.posyanduDetail?.nama || '-'}
                  </p>
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
