import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBayiById } from '../../BayiService';
import { getPerkembanganByBalitaId } from '../../PerkembanganBalitaService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { FaUser, FaTransgender, FaCalendar, FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Modal setup
Modal.setAppElement('#root');
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BayiDetailKader = () => {
  const { id } = useParams();
  const [balita, setBalita] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [perkembanganList, setPerkembanganList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPerkembangan, setSelectedPerkembangan] = useState(null);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState('perkembangan');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBayiDetail = async () => {
      try {
        const response = await getBayiById(id);
        setBalita(response.data);

        // Fetch Perkembangan Bayi data
        const perkembanganResponse = await getPerkembanganByBalitaId(id);
        setPerkembanganList(perkembanganResponse.data);
      } catch (error) {
        console.error('Error fetching bayi or perkembangan details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBayiDetail();
  }, [id]);

  const openModal = (perkembangan) => {
    setSelectedPerkembangan(perkembangan);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPerkembangan(null);
  };

  const customModalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '10px',
      width: '90%',
      maxWidth: '600px'
    }
  };

  const barChartData = {
    labels: perkembanganList.map((perkembangan) =>
      new Date(perkembangan.tanggal_kunjungan).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Berat Badan',
        data: perkembanganList.map((perkembangan) => perkembangan.berat_badan),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Tinggi Badan',
        data: perkembanganList.map((perkembangan) => perkembangan.tinggi_badan),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Grafik Perkembangan Bayi'
      }
    }
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
            <Link to="/kader-balita" className="hover:underline">Bayi List</Link>
            &gt; Detail Bayi
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Detail Bayi</h1>

            {balita ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-3" />
                    <strong className="mr-2">Nama:</strong>
                    {balita.nama_balita}
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="text-blue-500 mr-3" />
                    <strong className="mr-2">Tanggal Lahir:</strong>
                    {new Date(balita.tanggal_lahir_balita).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FaTransgender className="text-blue-500 mr-3" />
                    <strong className="mr-2">Jenis Kelamin:</strong>
                    {balita.jenis_kelamin_balita === 'l' ? 'Laki-laki' : 'Perempuan'}
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="text-blue-500 mr-3" />
                    <strong className="mr-2">NIK:</strong>
                    {balita.nik_balita}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-2xl font-bold mb-4">Orangtua</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <strong>Nama Ibu:</strong> {balita.orangtuaDetail?.nama_ibu || 'N/A'}
                    </div>
                    <div>
                      <strong>Nama Ayah:</strong> {balita.orangtuaDetail?.nama_ayah || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="border-b border-gray-200 mb-4">
                    <nav className="flex space-x-4">
                      <button
                        onClick={() => setActiveTab('perkembangan')}
                        className={`py-2 px-4 text-sm font-medium ${
                          activeTab === 'perkembangan'
                            ? 'border-b-2 border-blue-500 text-blue-500'
                            : 'text-gray-600'
                        }`}
                      >
                        Perkembangan Bayi
                      </button>
                      <button
                        onClick={() => setActiveTab('chart')}
                        className={`py-2 px-4 text-sm font-medium ${
                          activeTab === 'chart'
                            ? 'border-b-2 border-blue-500 text-blue-500'
                            : 'text-gray-600'
                        }`}
                      >
                        Chart
                      </button>
                    </nav>
                  </div>

                  {activeTab === 'perkembangan' ? (
                    <div>
                      {perkembanganList.length > 0 ? (
                        <div className="space-y-4">
                          {perkembanganList.map((perkembangan) => (
                            <div
                              key={perkembangan.id}
                              className="bg-blue-50 p-4 rounded-md shadow-md cursor-pointer"
                              onClick={() => openModal(perkembangan)}
                            >
                              <p className="text-lg font-semibold text-blue-700">
                                <strong>Tanggal Perkembangan: </strong>
                                {new Date(perkembangan.tanggal_kunjungan).toLocaleDateString()}
                              </p>
                              <p className="text-gray-600">
                                <strong>Kader: </strong>
                                {perkembangan.kaderDetail.nama}
                              </p>
                              <p className="text-gray-600">
                                <strong>Hasil Perkembangan: </strong>
                                {perkembangan.keterangan}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-red-500">Belum ada perkembangan untuk bayi ini.</p>
                      )}
                    </div>
                  ) : (
                    <div className="mt-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">Grafik Perkembangan</h2>
                      <Bar data={barChartData} options={barChartOptions} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-red-500">Data bayi tidak ditemukan.</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detail Perkembangan Bayi"
        style={customModalStyles}
      >
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Detail Perkembangan Bayi
        </h2>
        {selectedPerkembangan && (
          <div>
            <p><strong>Tanggal Kunjungan:</strong> {new Date(selectedPerkembangan.tanggal_kunjungan).toLocaleDateString()}</p>
            <p><strong>Berat Badan:</strong> {selectedPerkembangan.berat_badan} kg</p>
            <p><strong>Tinggi Badan:</strong> {selectedPerkembangan.tinggi_badan} cm</p>
            <p><strong>Kader:</strong> {selectedPerkembangan.kaderDetail.nama}</p>
            <p><strong>Keterangan:</strong> {selectedPerkembangan.keterangan}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BayiDetailKader;
