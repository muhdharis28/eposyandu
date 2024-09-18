import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDokumentasiById } from '../../DokumentasiService'; // Assuming you have this API service
import TopBar from '../TopBar'; // Adjust the path as necessary
import SideBar from '../SideBar'; // Adjust the path as necessary
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context

const DokumentasiDetail = () => {
  const { id } = useParams();
  const [dokumentasi, setDokumentasi] = useState(null);
  const [error, setError] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state
  const navigate = useNavigate();

  useEffect(() => {
    loadDokumentasiDetail();
  }, [id]);

  const loadDokumentasiDetail = async () => {
    try {
      const result = await getDokumentasiById(id); // API call to get dokumentasi details
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
    navigate('/dokumentasi'); // Navigate back to the list
  };

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with toggle button for sidebar */}
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar with collapsible functionality */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
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
            {/* Left Column - Main Dokumentasi Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={`${import.meta.env.VITE_API_URL}${dokumentasi.foto}` || 'https://via.placeholder.com/150'} // Replace with actual image path
                  alt={dokumentasi.judul}
                  className="w-24 h-24 rounded object-cover shadow-md"
                />
                <div>
                  <h3 className="text-xl font-semibold">{dokumentasi.judul}</h3>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>Tanggal:</strong> {new Date(dokumentasi.tanggal).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Right Column - Additional Information or Actions */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-2">Deskripsi</h4>
                <p className="text-gray-700">
                  {dokumentasi.deskripsi || 'Tidak ada deskripsi tersedia.'}
                </p>
              </div>
              <button
                className="w-full text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                onClick={() => alert('Contact or action placeholder')}
              >
                Contact/Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DokumentasiDetail;
