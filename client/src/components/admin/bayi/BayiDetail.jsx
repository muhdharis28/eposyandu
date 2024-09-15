import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBayiById } from '../../BayiService'; // Assuming you have this API service
import TopBar from '../TopBar'; // Adjust the path as necessary
import SideBar from '../SideBar'; // Adjust the path as necessary
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context

const BayiDetail = () => {
  const { id } = useParams();
  const [bayi, setBayi] = useState(null);
  const [error, setError] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state
  const navigate = useNavigate();

  useEffect(() => {
    loadBayiDetail();
  }, [id]);

  const loadBayiDetail = async () => {
    try {
      const result = await getBayiById(id); // API call to get bayi details
      setBayi(result.data);
    } catch (error) {
      setError('Failed to load bayi details.');
      console.error('Failed to load bayi details:', error);
    }
  };

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!bayi) {
    return <div className="p-6">Loading...</div>;
  }

  const handleBackToList = () => {
    navigate('/balita'); // Navigate back to the bayi list
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
              &lt; Kembali ke Daftar Balita
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-6">Detail Balita</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
            {/* Left Column - Main Baby Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://via.placeholder.com/150" // Placeholder image, replace with actual image if available
                  alt={bayi.nama}
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
                <div>
                  <h3 className="text-xl font-semibold">{bayi.nama_balita}</h3>
                  <div className="flex items-center">
                    <label className="font-semibold text-gray-700 mr-2">Ayah:</label>
                    <p className="text-gray-500">{bayi.orangtuaDetail ? bayi.orangtuaDetail.nama_ayah : 'N/A'}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="font-semibold text-gray-700 mr-2">Ibu:</label>
                    <p className="text-gray-500">{bayi.orangtuaDetail ? bayi.orangtuaDetail.nama_ibu : 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>Tanggal Lahir:</strong> {new Date(bayi.tanggal_lahir_balita).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <strong>Jenis Kelamin:</strong> {bayi.jenis_kelamin_balita === 'l' ? 'Laki-laki' : 'Perempuan'}
                </p>
                <p className="text-gray-700">
                  <strong>NIK:</strong> {bayi.nik_balita}
                </p>
                <p className="text-gray-700">
                  <strong>Berat Badan Awal:</strong> {bayi.berat_badan_awal_balita} kg
                </p>
                <p className="text-gray-700">
                  <strong>Tinggi Badan Awal:</strong> {bayi.tinggi_badan_awal_balita} cm
                </p>
              </div>
            </div>

            {/* Right Column - Additional Information or Actions */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-2">Riwayat</h4>
                <p className="text-gray-700">
                  <strong>Riwayat Penyakit:</strong> {bayi.riwayat_penyakit_balita || 'Tidak ada'}
                </p>
                <p className="text-gray-700">
                  <strong>Riwayat Kelahiran:</strong> {bayi.riwayat_kelahiran_balita || 'Tidak ada'}
                </p>
                <p className="text-gray-700">
                  <strong>Keterangan:</strong> {bayi.keterangan_balita || 'Tidak ada'}
                </p>
              </div>
              <button
                className="w-full text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                onClick={handleBackToList}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BayiDetail;
