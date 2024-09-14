import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPerkembanganBalitaById } from './PerkembanganBalitaService'; // Fetching the Perkembangan Balita details
import TopBar from '../TopBar'; // Adjust the path as needed
import SideBar from '../SideBar'; // Adjust the path as needed
import { useSidebar } from '../../SideBarContext'; // Sidebar context for state

const PerkembanganBalitaDetail = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [perkembanganBalita, setPerkembanganBalita] = useState(null); // State for storing perkembangan balita details
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    loadPerkembanganBalitaDetail(); // Fetch data on component mount
  }, [id]);

  const loadPerkembanganBalitaDetail = async () => {
    try {
      const result = await getPerkembanganBalitaById(id); // Fetch perkembangan balita by ID
      setPerkembanganBalita(result.data); // Set the retrieved data
    } catch (error) {
      console.error('Failed to load perkembangan balita details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/perkembangan-balita'); // Navigate back to the list
  };

  if (!perkembanganBalita) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with sidebar toggle button */}
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
              &lt; Kembali ke Daftar Perkembangan Balita
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-6">Detail Perkembangan Balita</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
            {/* Left Column - Main Perkembangan Information */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>Tanggal Kunjungan:</strong> {perkembanganBalita.tanggal_kunjungan}
                </p>
                <p className="text-gray-700">
                  <strong>Berat Badan:</strong> {perkembanganBalita.berat_badan} kg
                </p>
                <p className="text-gray-700">
                  <strong>Tinggi Badan:</strong> {perkembanganBalita.tinggi_badan} cm
                </p>
                <p className="text-gray-700">
                  <strong>Lingkar Kepala:</strong> {perkembanganBalita.lingkar_kepala} cm
                </p>
                <p className="text-gray-700">
                  <strong>Status Gizi:</strong> {perkembanganBalita.status_gizi}
                </p>
              </div>
            </div>

            {/* Right Column - Additional Health Information */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-2">Additional Health Details</h4>
                <p className="text-gray-700">
                  <strong>Tipe Imunisasi:</strong> {perkembanganBalita.tipe_imunisasi}
                </p>
                <p className="text-gray-700">
                  <strong>Tipe Vitamin:</strong> {perkembanganBalita.tipe_vitamin}
                </p>
                <p className="text-gray-700">
                  <strong>Keterangan:</strong> {perkembanganBalita.keterangan || 'Tidak ada'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>Kader:</strong> {perkembanganBalita.penggunaDetail ? perkembanganBalita.penggunaDetail.nama : 'Tidak ada'}
                </p>
                <p className="text-gray-700">
                  <strong>Dokter:</strong> {perkembanganBalita.dokterDetail ? perkembanganBalita.dokterDetail.nama : 'Tidak ada'}
                </p>
                <p className="text-gray-700">
                  <strong>Balita:</strong> {perkembanganBalita.balitaDetail ? perkembanganBalita.balitaDetail.nama_balita : 'Tidak ada'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerkembanganBalitaDetail;
