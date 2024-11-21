import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPemeriksaanLansiaById } from '../../PemeriksaanLansiaService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const PemeriksaanLansiaDetail = () => {
  const { id } = useParams();
  const [pemeriksaanLansia, setPemeriksaanLansia] = useState(null);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    loadPemeriksaanLansiaDetail();
  }, [id]);

  const loadPemeriksaanLansiaDetail = async () => {
    try {
      const result = await getPemeriksaanLansiaById(id);
      setPemeriksaanLansia(result.data);
    } catch (error) {
      console.error('Failed to load pemeriksaan lansia details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/pemeriksaan-lansia');
  };

  if (!pemeriksaanLansia) {
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
              &lt; Kembali ke Daftar Pemeriksaan Lansia
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-6">Detail Pemeriksaan Lansia</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Informasi Lansia</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>Nama Lansia:</strong> {pemeriksaanLansia.lansiaDetail?.nama_lansia || 'Tidak ada data'}
                </p>
                <p className="text-gray-700">
                  <strong>Tanggal Kunjungan:</strong> {pemeriksaanLansia.tanggal_kunjungan}
                </p>
                <p className="text-gray-700">
                  <strong>Berat Badan:</strong> {pemeriksaanLansia.berat_badan} kg
                </p>
                <p className="text-gray-700">
                  <strong>Tinggi Badan:</strong> {pemeriksaanLansia.tinggi_badan} cm
                </p>
                <p className="text-gray-700">
                  <strong>Lingkar Perut:</strong> {pemeriksaanLansia.lingkar_perut} cm
                </p>
                <p className="text-gray-700">
                  <strong>Tekanan Darah:</strong> {pemeriksaanLansia.tekanan_darah} mmHg
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-2">Informasi Lainnya</h4>
                <p className="text-gray-700">
                  <strong>Kader:</strong> {pemeriksaanLansia.kaderDetail?.nama || 'Tidak ada data'}
                </p>
                <p className="text-gray-700">
                  <strong>Dokter:</strong> {pemeriksaanLansia.dokterDetail?.nama || 'Tidak ada data'}
                </p>
                <p className="text-gray-700">
                  <strong>Posyandu:</strong> {pemeriksaanLansia.posyanduDetail?.nama || 'Tidak ada data'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Detail Tambahan</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>Gula Darah:</strong> {pemeriksaanLansia.gula_darah} mg/dL
                </p>
                <p className="text-gray-700">
                  <strong>Kolestrol:</strong> {pemeriksaanLansia.kolestrol} mg/dL
                </p>
                <p className="text-gray-700">
                  <strong>Asam Urat:</strong> {pemeriksaanLansia.asam_urat} mg/dL
                </p>
                <p className="text-gray-700">
                  <strong>Kesehatan Mata:</strong> {pemeriksaanLansia.kesehatan_mata} /10
                </p>
                <p className="text-gray-700">
                  <strong>Riwayat Obat:</strong> {pemeriksaanLansia.riwayat_obat || 'Tidak ada'}
                </p>
                <p className="text-gray-700">
                  <strong>Riwayat Penyakit:</strong> {pemeriksaanLansia.riwayat_penyakit || 'Tidak ada'}
                </p>
                <p className="text-gray-700">
                  <strong>Keterangan Tambahan:</strong> {pemeriksaanLansia.keterangan || 'Tidak ada'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PemeriksaanLansiaDetail;
