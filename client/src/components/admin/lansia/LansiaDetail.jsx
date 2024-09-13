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
    <div className="h-screen flex flex-col bg-gray-50">
      {/* TopBar with toggle button for sidebar */}
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar with collapsible functionality */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <div className="flex-1 bg-white p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button
              onClick={handleBackToList}
              className="text-blue-500 hover:underline"
            >
              &lt; Kembali ke Daftar Lansia
            </button>
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Detail Lansia</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Main Lansia Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <img
                    src="https://via.placeholder.com/150" // Placeholder image, replace with actual image if available
                    alt={lansia.nama_lansia}
                    className="w-28 h-28 rounded-full object-cover shadow-md"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold">{lansia.nama_lansia}</h3>
                    <p className="text-gray-500">Jenis Kelamin: {lansia.jenis_kelamin_lansia === 'l' ? 'Laki-laki' : 'Perempuan'}</p>
                    <p className="text-gray-500">NIK: {lansia.nik_lansia}</p>
                    <p className="text-gray-500">Status Pernikahan: {lansia.status_pernikahan_lansia}</p>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="text-lg font-semibold">Alamat KTP:</h4>
                  <p className="text-gray-700">{lansia.alamat_ktp_lansia}</p>
                  <p className="text-gray-700">{lansia.kelurahan_ktp_lansia}, {lansia.kecamatan_ktp_lansia}</p>
                  <p className="text-gray-700">{lansia.kota_ktp_lansia}, {lansia.provinsi_ktp_lansia}</p>
                </div>

                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="text-lg font-semibold">Alamat Domisili:</h4>
                  <p className="text-gray-700">{lansia.alamat_domisili_lansia}</p>
                  <p className="text-gray-700">{lansia.kelurahan_domisili_lansia}, {lansia.kecamatan_domisili_lansia}</p>
                  <p className="text-gray-700">{lansia.kota_domisili_lansia}, {lansia.provinsi_domisili_lansia}</p>
                </div>
              </div>

              {/* Right Column - Wali and Additional Information */}
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="text-lg font-semibold">Wali Information</h4>
                  {lansia.waliDetail ? (
                    <>
                      <p className="text-gray-700"><strong>Nama Wali:</strong> {lansia.waliDetail.nama_wali}</p>
                      <p className="text-gray-700"><strong>No HP Wali:</strong> {lansia.waliDetail.no_hp_wali || 'N/A'}</p>
                      <p className="text-gray-700"><strong>Email Wali:</strong> {lansia.waliDetail.email_wali || 'N/A'}</p>
                    </>
                  ) : (
                    <p className="text-gray-700">No Wali Data</p>
                  )}
                </div>

                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="text-lg font-semibold">Pekerjaan & Pendidikan</h4>
                  <p className="text-gray-700"><strong>Pekerjaan:</strong> {lansia.pekerjaan ? lansia.pekerjaan.nama : 'Tidak ada'}</p>
                  <p className="text-gray-700"><strong>Pendidikan:</strong> {lansia.pendidikan ? lansia.pendidikan.nama : 'Tidak ada'}</p>
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
    </div>
  );
};

export default LansiaDetail;
