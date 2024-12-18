import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPerkembanganBalitaById } from '../../PerkembanganBalitaService'; // Adjust the service path as needed
import TopBar from '../TopBar'; // Adjust the path if necessary
import SideBar from '../SideBar'; // Adjust the path if necessary
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context

const PerkembanganBalitaDetailKader = () => {
  const { id } = useParams();
  const [perkembanganBalita, setPerkembanganBalita] = useState(null);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state
  const navigate = useNavigate();

  useEffect(() => {
    loadPerkembanganBalitaDetail();
  }, [id]);

  const loadPerkembanganBalitaDetail = async () => {
    try {
      const result = await getPerkembanganBalitaById(id); // Fetch Perkembangan Balita data by ID
      setPerkembanganBalita(result.data); // Set the retrieved data
    } catch (error) {
      console.error('Failed to load perkembangan balita details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/kader-perkembangan-balita'); // Navigate back to perkembangan balita list
  };

  if (!perkembanganBalita) {
    return <div>Loading...</div>;
  }

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
              &lt; Kembali ke Daftar Perkembangan Balita
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-6">Detail Perkembangan Balita</h2>

          {/* Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
            {/* Left Column - Main Perkembangan Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Informasi Balita</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>Nama Balita:</strong> {perkembanganBalita.balitaDetail?.nama_balita || 'Tidak ada data'}
                </p>
                <p className="text-gray-700">
                  <strong>NIK Balita:</strong> {perkembanganBalita.balitaDetail?.nik_balita || 'Tidak ada data'}
                </p>
                <p className="text-gray-700">
                  <strong>Jenis Kelamin:</strong> {perkembanganBalita.balitaDetail?.jenis_kelamin === 'l' ? 'Laki-laki' : 'Perempuan'}
                </p>
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
              </div>
            </div>

            {/* Right Column - Additional Health Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Detail Kesehatan Tambahan</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>Status Gizi:</strong> {perkembanganBalita.status_gizi || 'Tidak ada data'}
                </p>
                <p className="text-gray-700">
                  <strong>Tipe Imunisasi:</strong> {perkembanganBalita.tipe_imunisasi || 'Tidak ada data'}
                </p>
                <p className="text-gray-700">
                  <strong>Tipe Vitamin:</strong> {perkembanganBalita.tipe_vitamin || 'Tidak ada data'}
                </p>
                <p className="text-gray-700">
                  <strong>Riwayat Penyakit:</strong> {perkembanganBalita.riwayat_penyakit || 'Tidak ada'}
                </p>
                <p className="text-gray-700">
                  <strong>Keterangan Tambahan:</strong> {perkembanganBalita.keterangan || 'Tidak ada'}
                </p>
              </div>

              {/* Information on Kader (Pengguna) and Dokter */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-2">Informasi Kader dan Dokter</h4>
                <p className="text-gray-700">
                  <strong>Kader (Pengguna):</strong> {perkembanganBalita.kaderDetail?.nama || 'Tidak ada data'}
                </p>
                <p className="text-gray-700">
                  <strong>Dokter:</strong> {perkembanganBalita.dokterDetail?.nama || 'Tidak ada data'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerkembanganBalitaDetailKader;
