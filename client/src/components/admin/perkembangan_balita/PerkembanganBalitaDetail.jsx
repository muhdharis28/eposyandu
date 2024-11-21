import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPerkembanganBalitaById } from '../../PerkembanganBalitaService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const PerkembanganBalitaDetail = () => {
  const { id } = useParams();
  const [perkembanganBalita, setPerkembanganBalita] = useState(null);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    loadPerkembanganBalitaDetail();
  }, [id]);

  const loadPerkembanganBalitaDetail = async () => {
    try {
      const result = await getPerkembanganBalitaById(id);
      setPerkembanganBalita(result.data);
    } catch (error) {
      console.error('Failed to load perkembangan balita details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/perkembangan-balita');
  };

  if (!perkembanganBalita) {
    return <div>Loading...</div>;
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
              &lt; Kembali ke Daftar Perkembangan Balita
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-6">Detail Perkembangan Balita</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
            <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Informasi Balita</h3>
              <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700">
                  <strong>Nama Balita:</strong> {perkembanganBalita.balitaDetail?.nama_balita || 'Tidak ada data'}
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
                <p className="text-gray-700">
                  <strong>Status Gizi:</strong> {perkembanganBalita.status_gizi}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-lg font-semibold mb-2">Informasi Lainnya</h4>
                <p className="text-gray-700">
                  <strong>Kader:</strong> {perkembanganBalita.kaderDetail ? perkembanganBalita.kaderDetail.nama : 'Tidak ada'}
                </p>
                <p className="text-gray-700">
                  <strong>Dokter:</strong> {perkembanganBalita.dokterDetail ? perkembanganBalita.dokterDetail.nama : 'Tidak ada'}
                </p>
                <p className="text-gray-700">
                  <strong>Posyandu:</strong> {perkembanganBalita.posyanduDetail ? perkembanganBalita.posyanduDetail.nama : 'Tidak ada'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-2">Detail Tambahan</h4>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerkembanganBalitaDetail;
