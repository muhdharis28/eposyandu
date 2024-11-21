import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDokumentasiById } from '../../DokumentasiService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const DokumentasiDetail = () => {
  const { id } = useParams();
  const [dokumentasi, setDokumentasi] = useState(null);
  const [error, setError] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    loadDokumentasiDetail();
  }, [id]);

  const loadDokumentasiDetail = async () => {
    try {
      const result = await getDokumentasiById(id);
      setDokumentasi(result.data);
    } catch (error) {
      setError('Failed to load dokumentasi details.');
      console.error('Failed to load dokumentasi details:', error);
    }
  };

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!dokumentasi) {
    return <div className="p-6">Loading...</div>;
  }

  const handleBackToList = () => {
    navigate('/dokumentasi');
  };

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
              &lt; Kembali ke Daftar Dokumentasi
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-6">Detail Dokumentasi</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={`${import.meta.env.VITE_API_URL}${dokumentasi.foto}` || 'https://via.placeholder.com/150'}
                  alt={dokumentasi.judul}
                  className="w-24 h-24 rounded object-cover shadow-md"
                />
                <div>
                  <h3 className="text-xl font-semibold">{dokumentasi.judul}</h3>
                </div>
              </div>
              <div className="bg-gray-50 rounded-md">
                <p className="text-gray-700">
                  <strong>Tanggal:</strong> {new Date(dokumentasi.tanggal).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 rounded-md">
                <p className="text-gray-700">
                  <strong>Kader:</strong> {dokumentasi.kaderDetail?.nama}
                </p>
              </div>
              <div className="bg-gray-50 rounded-md">
                <p className="text-gray-700">
                  <strong>Posyandu:</strong> {dokumentasi.kaderDetail?.posyanduDetail?.nama}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-2">Deskripsi</h4>
                <p className="text-gray-700">
                  {dokumentasi.deskripsi || 'Tidak ada deskripsi tersedia.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DokumentasiDetail;
