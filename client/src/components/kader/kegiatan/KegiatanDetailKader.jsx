import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getKegiatanById } from '../../KegiatanService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { FaCalendar, FaMapMarkerAlt, FaInfoCircle, FaTag } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const KegiatanDetailKader = () => {
  const { id } = useParams();
  const [kegiatan, setKegiatan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKegiatanDetail = async () => {
      try {
        const response = await getKegiatanById(id);
        setKegiatan(response.data);
      } catch (error) {
        console.error('Error fetching Kegiatan details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKegiatanDetail();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-gray-600 mb-4">
            <Link to="/kader-kegiatan" className="hover:underline">Kegiatan List</Link> &gt; Detail Kegiatan
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{kegiatan.nama}</h1>
              <span
                className={`ml-2 px-4 py-1 rounded-full text-white text-sm font-medium ${
                  kegiatan.jenis === 'lansia' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {kegiatan.jenis === 'lansia' ? 'Lansia' : 'Balita'}
              </span>
            </div>

            {kegiatan ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <FaCalendar className="text-blue-500 mr-3" />
                    <strong className="mr-2">Tanggal Kegiatan:</strong>{' '}
                    {new Date(kegiatan.tanggal).toLocaleDateString()}
                  </div>

                  <div className="flex items-center">
                    <FaTag className="text-blue-500 mr-3" />
                    <strong className="mr-2">Jenis Kegiatan:</strong>{' '}
                    {kegiatan.jenis.charAt(0).toUpperCase() + kegiatan.jenis.slice(1)}
                  </div>
                </div>

                {/* Deskripsi Section */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Deskripsi Kegiatan</h2>
                  <p className="text-gray-700">
                    {kegiatan.deskripsi || 'Tidak ada deskripsi yang tersedia.'}
                  </p>
                </div>
              </div>
            ) : (
              <p>No details available for this Kegiatan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KegiatanDetailKader;
