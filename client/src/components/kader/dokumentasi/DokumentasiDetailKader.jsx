import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getDokumentasiById } from '../../DokumentasiService'; // Adjust the path as necessary
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { FaCalendar, FaTag, FaUser } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DokumentasiDetailKader = () => {
  const { id } = useParams();
  const [dokumentasi, setDokumentasi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDokumentasiDetail = async () => {
      try {
        const response = await getDokumentasiById(id);
        setDokumentasi(response.data);
      } catch (error) {
        console.error('Error fetching Dokumentasi details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDokumentasiDetail();
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
            <Link to="/kader-dokumentasi" className="hover:underline">Dokumentasi List</Link> &gt; Detail Dokumentasi
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{dokumentasi.judul}</h1>
              <span
                className={`ml-2 px-4 py-1 rounded-full text-white text-sm font-medium ${
                  dokumentasi.kader ? 'bg-blue-500' : 'bg-gray-500'
                }`}
              >
                {dokumentasi.kader ? dokumentasi.kader.nama : 'No Kader Assigned'}
              </span>
            </div>

            {dokumentasi ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <FaCalendar className="text-blue-500 mr-3" />
                    <strong className="mr-2">Tanggal Dokumentasi:</strong>{' '}
                    {new Date(dokumentasi.tanggal).toLocaleDateString()}
                  </div>

                  <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-3" />
                    <strong className="mr-2">Kader:</strong>{' '}
                    {dokumentasi.kader ? dokumentasi.kader.nama : 'Tidak ada kader'}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <FaTag className="text-blue-500 mr-3" />
                    <strong className="mr-2">Posyandu:</strong>{' '}
                    {dokumentasi.kader && dokumentasi.kader.posyanduDetail
                      ? dokumentasi.kader.posyanduDetail.nama
                      : 'Tidak ada posyandu'}
                  </div>
                </div>

                {/* Deskripsi Section */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Deskripsi Dokumentasi</h2>
                  <p className="text-gray-700">
                    {dokumentasi.deskripsi || 'Tidak ada deskripsi yang tersedia.'}
                  </p>
                </div>

                {/* Foto Section */}
                {dokumentasi.foto && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Foto Dokumentasi</h2>
                    <img
                      src={`${import.meta.env.VITE_API_URL}${dokumentasi.foto}`}
                      alt={dokumentasi.judul}
                      className="w-full h-auto max-w-xs object-contain rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            ) : (
              <p>No details available for this Dokumentasi.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DokumentasiDetailKader;
