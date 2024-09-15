import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrangTuaById } from '../../OrangTuaService'; // Service to get orangtua details
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext'; // Sidebar state

const OrangtuaDetail = () => {
  const { id } = useParams();
  const [orangtua, setOrangtua] = useState(null);
  const [error, setError] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar context
  const navigate = useNavigate();

  useEffect(() => {
    loadOrangtuaDetail();
  }, [id]);

  const loadOrangtuaDetail = async () => {
    try {
      const result = await getOrangTuaById(id); // Fetch orangtua details by ID
      setOrangtua(result.data);
    } catch (error) {
      setError('Failed to load orangtua details.');
      console.error('Failed to load orangtua details:', error);
    }
  };

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!orangtua) {
    return <div className="p-6">Loading...</div>;
  }

  const handleBackToList = () => {
    navigate('/orangtua'); // Navigate back to the list of orangtua
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Orangtua
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-6">Detail Orangtua</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
            {/* Left Column - Mother's Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Informasi Ibu</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>No KK:</strong> {orangtua.no_kk}
                </p>
                <p className="text-gray-700">
                  <strong>NIK Ibu:</strong> {orangtua.nik_ibu}
                </p>
                <p className="text-gray-700">
                  <strong>Nama Ibu:</strong> {orangtua.nama_ibu}
                </p>
                <p className="text-gray-700">
                  <strong>Tempat Lahir Ibu:</strong> {orangtua.tempat_lahir_ibu}
                </p>
                <p className="text-gray-700">
                  <strong>Tanggal Lahir Ibu:</strong> {orangtua.tanggal_lahir_ibu}
                </p>
                <p className="text-gray-700">
                  <strong>Alamat KTP Ibu:</strong> {orangtua.alamat_ktp_ibu}
                </p>
                <p className="text-gray-700">
                  <strong>Kota KTP Ibu:</strong> {orangtua.kota_ktp_ibu}
                </p>
                <p className="text-gray-700">
                  <strong>No HP Ibu:</strong> {orangtua.no_hp_ibu}
                </p>
                <p className="text-gray-700">
                  <strong>Email Ibu:</strong> {orangtua.email_ibu}
                </p>
              </div>
            </div>

            {/* Right Column - Father's Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Informasi Ayah</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>NIK Ayah:</strong> {orangtua.nik_ayah}
                </p>
                <p className="text-gray-700">
                  <strong>Nama Ayah:</strong> {orangtua.nama_ayah}
                </p>
                <p className="text-gray-700">
                  <strong>Tempat Lahir Ayah:</strong> {orangtua.tempat_lahir_ayah}
                </p>
                <p className="text-gray-700">
                  <strong>Tanggal Lahir Ayah:</strong> {orangtua.tanggal_lahir_ayah}
                </p>
                <p className="text-gray-700">
                  <strong>Alamat KTP Ayah:</strong> {orangtua.alamat_ktp_ayah}
                </p>
                <p className="text-gray-700">
                  <strong>Kota KTP Ayah:</strong> {orangtua.kota_ktp_ayah}
                </p>
                <p className="text-gray-700">
                  <strong>No HP Ayah:</strong> {orangtua.no_hp_ayah}
                </p>
                <p className="text-gray-700">
                  <strong>Email Ayah:</strong> {orangtua.email_ayah}
                </p>
              </div>
            </div>
          </div>

          <button onClick={handleBackToList} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Kembali ke Daftar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrangtuaDetail;
