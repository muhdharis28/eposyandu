import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getLansiaById } from '../../LansiaService';
import { getPemeriksaanByLansiaId } from '../../PemeriksaanLansiaService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { FaUser, FaPhone, FaEnvelope, FaTransgender, FaBriefcase, FaGraduationCap, FaHome, FaCalendar, FaTimes, FaUserTie } from 'react-icons/fa';
import Modal from 'react-modal';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

Modal.setAppElement('#root');

const LansiaDetailKader = () => {
  const { id } = useParams();
  const [lansia, setLansia] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pemeriksaanList, setPemeriksaanList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPemeriksaan, setSelectedPemeriksaan] = useState(null);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState('pemeriksaan'); 
  const [chartTab, setChartTab] = useState('weight'); 

  useEffect(() => {
    const fetchLansiaDetail = async () => {
      try {
        const response = await getLansiaById(id);
        setLansia(response.data);

        const pemeriksaanResponse = await getPemeriksaanByLansiaId(id);
        setPemeriksaanList(pemeriksaanResponse.data);
      } catch (error) {
        console.error('Error fetching Lansia or pemeriksaan details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLansiaDetail();
  }, [id]);

  const openModal = (pemeriksaan) => {
    setSelectedPemeriksaan(pemeriksaan);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPemeriksaan(null);
  };

  const chartData = {
    weight: {
      labels: pemeriksaanList.map(p => new Date(p.tanggal_kunjungan).toLocaleDateString()),
      datasets: [
        {
          label: 'Berat Badan (kg)',
          data: pemeriksaanList.map(p => p.berat_badan),
          borderColor: '#007ACC',
          backgroundColor: 'rgba(0, 122, 204, 0.2)',
        },
      ],
    },
    height: {
      labels: pemeriksaanList.map(p => new Date(p.tanggal_kunjungan).toLocaleDateString()),
      datasets: [
        {
          label: 'Tinggi Badan (cm)',
          data: pemeriksaanList.map(p => p.tinggi_badan),
          borderColor: '#28A745',
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
        },
      ],
    },
    bloodSugar: {
      labels: pemeriksaanList.map(p => new Date(p.tanggal_kunjungan).toLocaleDateString()),
      datasets: [
        {
          label: 'Gula Darah (mg/dL)',
          data: pemeriksaanList.map(p => p.gula_darah),
          borderColor: '#FFC107',
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
        },
      ],
    },
    cholesterol: {
      labels: pemeriksaanList.map(p => new Date(p.tanggal_kunjungan).toLocaleDateString()),
      datasets: [
        {
          label: 'Kolesterol (mg/dL)',
          data: pemeriksaanList.map(p => p.kolestrol),
          borderColor: '#DC3545',
          backgroundColor: 'rgba(220, 53, 69, 0.2)',
        },
      ],
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-gray-600 mb-4">
            <Link to="/kader-lansia" className="hover:underline">Lansia List</Link> &gt; Detail Lansia
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Detail Lansia</h1>

            {lansia ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-3" />
                    <strong className="mr-2">Nama:</strong> {lansia.nama_lansia}
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="text-blue-500 mr-3" />
                    <strong className="mr-2">Tanggal Lahir:</strong> {new Date(lansia.tanggal_lahir_lansia).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-blue-500 mr-3" />
                    <strong className="mr-2">No HP:</strong> {lansia.no_hp_lansia}
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-500 mr-3" />
                    <strong className="mr-2">Email:</strong> {lansia.email_lansia || 'N/A'}
                  </div>

                  {/* Adding Wali Details */}
                  <div className="flex items-center">
                    <FaUserTie className="text-blue-500 mr-3" />
                    <strong className="mr-2">Wali:</strong> {lansia.waliDetail?.nama_wali || 'Tidak ada data wali'}
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-blue-500 mr-3" />
                    <strong className="mr-2">No HP Wali:</strong> {lansia.waliDetail?.no_hp_wali || 'Tidak ada data'}
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-500 mr-3" />
                    <strong className="mr-2">Email Wali:</strong> {lansia.waliDetail?.email_wali || 'Tidak ada data'}
                  </div>
                </div>

                {/* Tabs for Pemeriksaan and Charts */}
                <div className="mt-6">
                  <div className="border-b border-gray-200 mb-4">
                    <nav className="flex space-x-4">
                      <button
                        onClick={() => setActiveTab('pemeriksaan')}
                        className={`py-2 px-4 text-sm font-medium ${activeTab === 'pemeriksaan' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}>
                        Pemeriksaan Lansia
                      </button>
                      <button
                        onClick={() => setActiveTab('chart')}
                        className={`py-2 px-4 text-sm font-medium ${activeTab === 'chart' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}>
                        Grafik
                      </button>
                    </nav>
                  </div>

                  {/* Conditional rendering based on active tab */}
                  {activeTab === 'pemeriksaan' ? (
                    <div>
                      {pemeriksaanList.length > 0 ? (
                        <div className="space-y-4">
                          {pemeriksaanList.map((pemeriksaan) => (
                            <div
                              key={pemeriksaan.id}
                              className="bg-blue-50 p-4 rounded-md shadow-md cursor-pointer"
                              onClick={() => openModal(pemeriksaan)}>
                              <p className="text-lg font-semibold text-blue-700">
                                <strong>Tanggal Pemeriksaan: </strong>
                                {new Date(pemeriksaan.tanggal_kunjungan).toLocaleDateString()}
                              </p>
                              <p className="text-gray-600">
                                <strong>Kader: </strong>
                                {pemeriksaan.kaderDetail?.nama || 'N/A'}
                              </p>
                              <p className="text-gray-600">
                                <strong>Hasil Pemeriksaan: </strong>
                                {pemeriksaan.keterangan}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-red-500">Belum ada pemeriksaan untuk lansia ini.</p>
                      )}
                    </div>
                  ) : (
                    <div className="mt-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">Grafik Pemeriksaan</h2>
                      <div className="flex mb-4">
                        <button
                          className={`px-4 py-2 mr-2 ${chartTab === 'weight' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                          onClick={() => setChartTab('weight')}>
                          Berat Badan
                        </button>
                        <button
                          className={`px-4 py-2 mr-2 ${chartTab === 'height' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                          onClick={() => setChartTab('height')}>
                          Tinggi Badan
                        </button>
                        <button
                          className={`px-4 py-2 mr-2 ${chartTab === 'bloodSugar' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                          onClick={() => setChartTab('bloodSugar')}>
                          Gula Darah
                        </button>
                        <button
                          className={`px-4 py-2 ${chartTab === 'cholesterol' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                          onClick={() => setChartTab('cholesterol')}>
                          Kolesterol
                        </button>
                      </div>

                      {/* Chart Display based on selected tab */}
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        {chartTab === 'weight' && <Line data={chartData.weight} />}
                        {chartTab === 'height' && <Line data={chartData.height} />}
                        {chartTab === 'bloodSugar' && <Line data={chartData.bloodSugar} />}
                        {chartTab === 'cholesterol' && <Line data={chartData.cholesterol} />}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p>No details available for this Lansia.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LansiaDetailKader;
