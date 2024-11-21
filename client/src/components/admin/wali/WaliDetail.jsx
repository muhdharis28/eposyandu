import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWaliById } from '../../WaliService';
import { getJobById } from '../../PekerjaanService';
import { getPendidikanById } from '../../PendidikanService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const WaliDetail = () => {
  const { id } = useParams();
  const [wali, setWali] = useState(null);
  const [pekerjaan, setPekerjaan] = useState('');
  const [pendidikan, setPendidikan] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchWaliDetail();
    }
  }, [id]);

  const fetchWaliDetail = async () => {
    try {
      const result = await getWaliById(id);
      setWali(result.data);
    
      if (result.data.pekerjaan_wali) {
        const pekerjaanResult = await getJobById(result.data.pekerjaan_wali);
        setPekerjaan(pekerjaanResult.data.nama);
      }
      if (result.data.pendidikan_wali) {
        const pendidikanResult = await getPendidikanById(result.data.pendidikan_wali);
        setPendidikan(pendidikanResult.data.nama);
      }
    } catch (error) {
      console.error('Failed to fetch wali details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/wali');
  };

  if (!wali) {
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
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Wali
            </button>
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Detail Wali</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="col-span-1">
                <div className="mb-4">
                  <label className="block font-semibold">Posyandu:</label>
                  <p>{wali.posyanduDetail?.nama}</p>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">No KK:</label>
                  <p>{wali.no_kk}</p>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">NIK Wali:</label>
                  <p>{wali.nik_wali}</p>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Nama Wali:</label>
                  <p>{wali.nama_wali}</p>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Tempat Lahir:</label>
                  <p>{wali.tempat_lahir_wali}</p>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Tanggal Lahir:</label>
                  <p>{wali.tanggal_lahir_wali}</p>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Jenis Kelamin:</label>
                  <p>{wali.jenis_kelamin_wali === 'l' ? 'Laki-laki' : 'Perempuan'}</p>
                </div>

                {/* Alamat KTP */}
                <div className="mb-4">
                  <label className="block font-semibold">Alamat KTP:</label>
                  <p>{wali.alamat_ktp_wali}</p>
                  <p>{wali.kelurahan_ktp_wali}, {wali.kecamatan_ktp_wali}, {wali.kota_ktp_wali}, {wali.provinsi_ktp_wali}</p>
                </div>

                {/* Alamat Domisili */}
                <div className="mb-4">
                  <label className="block font-semibold">Alamat Domisili:</label>
                  <p>{wali.alamat_domisili_wali}</p>
                  <p>{wali.kelurahan_domisili_wali}, {wali.kecamatan_domisili_wali}, {wali.kota_domisili_wali}, {wali.provinsi_domisili_wali}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-1">
                <div className="mb-4">
                  <label className="block font-semibold">No HP Wali:</label>
                  <p>{wali.no_hp_wali || 'N/A'}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-semibold">Email Wali:</label>
                  <p>{wali.email_wali || 'N/A'}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-semibold">Pekerjaan Wali:</label>
                  <p>{pekerjaan || 'N/A'}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-semibold">Pendidikan Wali:</label>
                  <p>{pendidikan || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaliDetail;
