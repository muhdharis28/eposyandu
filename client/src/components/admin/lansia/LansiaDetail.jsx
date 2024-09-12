// LansiaDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLansiaById } from './LansiaService'; // Assuming you have this API service
import TopBar from '../TopBar'; // Adjust the path as necessary
import SideBar from '../SideBar'; // Adjust the path as necessary
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context

const LansiaDetail = () => {
  const { id } = useParams();
  const [lansia, setLansia] = useState(null);
  const [error, setError] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state
  const navigate = useNavigate();

  useEffect(() => {
    loadLansiaDetail();
  }, [id]);

  const loadLansiaDetail = async () => {
    try {
      const result = await getLansiaById(id); // API call to get lansia details
      setLansia(result.data);
    } catch (error) {
      setError('Failed to load lansia details.');
      console.error('Failed to load lansia details:', error);
    }
  };

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!lansia) {
    return <div className="p-6">Loading...</div>;
  }

  const handleBackToList = () => {
    navigate('/lansia'); // Navigate back to the list
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
              &lt; Kembali ke Daftar Lansia
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-6">Detail Lansia</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
            {/* Left Column - Main Lansia Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://via.placeholder.com/150" // Placeholder image, replace with actual image if available
                  alt={lansia.nama}
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
                <div>
                  <h3 className="text-xl font-semibold">{lansia.nama}</h3>
                  <p className="text-gray-500">{lansia.jenisKelamin}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>Usia:</strong> {lansia.usia} tahun
                </p>
                <p className="text-gray-700">
                  <strong>Alamat:</strong> {lansia.alamat}
                </p>
                {/* Add more details as needed */}
              </div>
            </div>

            {/* Right Column - Additional Information or Actions */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-2">Additional Details</h4>
                <p className="text-gray-700">
                  <strong>Penyakit:</strong> {lansia.penyakit ? lansia.penyakit : 'Tidak ada'}
                </p>
                <p className="text-gray-700">
                  <strong>Tanggal Lahir:</strong> {lansia.tanggalLahir}
                </p>
                {/* Add more sections as needed */}
              </div>
              <button
                className="w-full text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                onClick={() => alert('Hubungi Lansia')}
              >
                Hubungi Lansia
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LansiaDetail;
