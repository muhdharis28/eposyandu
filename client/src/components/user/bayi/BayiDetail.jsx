import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBayiById } from '../../BayiService'; // Assuming you have this service for bayi data
import { getPerkembanganByBalitaId } from '../../PerkembanganBalitaService'; // Service to get pemeriksaan details
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { FaUser, FaPhone, FaEnvelope, FaTransgender, FaHome, FaCalendar, FaTimes } from 'react-icons/fa';
import Modal from 'react-modal'; // Modal for pemeriksaan pop-up

// Custom styles for the Modal pop-up
Modal.setAppElement('#root');

const BayiDetail = () => {
  const { id } = useParams(); // Get the bayi ID from the URL
  const [bayi, setBayi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pemeriksaanList, setPemeriksaanList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal open/close
  const [selectedPemeriksaan, setSelectedPemeriksaan] = useState(null); // Store selected pemeriksaan details
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchBayiDetail = async () => {
      try {
        const response = await getBayiById(id);
        setBayi(response.data);

        // Fetch Pemeriksaan Bayi data
        const pemeriksaanResponse = await getPerkembanganByBalitaId(id);
        setPemeriksaanList(pemeriksaanResponse.data);
      } catch (error) {
        console.error('Error fetching bayi or pemeriksaan details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBayiDetail();
  }, [id]);

  const openModal = (pemeriksaan) => {
    setSelectedPemeriksaan(pemeriksaan);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPemeriksaan(null);
  };

  const customModalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
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
      maxWidth: '600px',
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
          {/* Breadcrumb Navigation */}
          <nav className="text-gray-600 mb-4">
            <Link to="/user-balita" className="hover:underline">Bayi List</Link> &gt; Detail Bayi
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Detail Bayi</h1>

            {bayi ? (
              <div className="space-y-4">
                {/* Bayi details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-3" />
                    <strong className="mr-2">Nama:</strong> {bayi.nama_bayi}
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="text-blue-500 mr-3" />
                    <strong className="mr-2">Tanggal Lahir:</strong> {new Date(bayi.tanggal_lahir_bayi).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-blue-500 mr-3" />
                    <strong className="mr-2">No HP:</strong> {bayi.no_hp_bayi}
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-500 mr-3" />
                    <strong className="mr-2">Email:</strong> {bayi.email_bayi || 'N/A'}
                  </div>
                  <div className="flex items-center">
                    <FaTransgender className="text-blue-500 mr-3" />
                    <strong className="mr-2">Jenis Kelamin:</strong> {bayi.jenis_kelamin_bayi === 'l' ? 'Laki-laki' : 'Perempuan'}
                  </div>
                  <div className="flex items-center">
                    <FaHome className="text-blue-500 mr-3" />
                    <strong className="mr-2">Alamat:</strong> {bayi.alamat_ktp_bayi} / {bayi.alamat_domisili_bayi}
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="text-blue-500 mr-3" />
                    <strong className="mr-2">NIK:</strong> {bayi.nik_bayi}
                  </div>
                </div>

                {/* Pemeriksaan Bayi Section */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Pemeriksaan Bayi</h2>
                {pemeriksaanList.length > 0 ? (
                  <div className="space-y-4">
                    {pemeriksaanList.map((pemeriksaan) => (
                      <div key={pemeriksaan.id} className="bg-blue-50 p-4 rounded-md shadow-md cursor-pointer" onClick={() => openModal(pemeriksaan)}>
                        <p className="text-lg font-semibold text-blue-700">
                          <strong>Tanggal Pemeriksaan:</strong> {new Date(pemeriksaan.tanggal_kunjungan).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                          <strong>Hasil Pemeriksaan:</strong> {pemeriksaan.keterangan}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500">Belum ada pemeriksaan untuk bayi ini.</p>
                )}
              </div>
            ) : (
              <p>No details available for this Bayi.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for pemeriksaan details */}
      {selectedPemeriksaan && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customModalStyles} contentLabel="Pemeriksaan Details">
          <div className="relative bg-white p-6 ">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
              <FaTimes className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Detail Pemeriksaan</h2>
            <p>
              <strong>Tanggal Pemeriksaan:</strong> {new Date(selectedPemeriksaan.tanggal_kunjungan).toLocaleDateString()}
            </p>
            <p>
              <strong>Kader:</strong> {selectedPemeriksaan.penggunaDetail?.nama || 'Tidak ada data'}
            </p>
            <p>
              <strong>Berat Badan:</strong> {selectedPemeriksaan.berat_badan || 'Tidak ada catatan'}
            </p>
            <p>
              <strong>Tinggi Badan:</strong> {selectedPemeriksaan.tinggi_badan || 'Tidak ada catatan'}
            </p>
            <p>
              <strong>Riwayat Penyakit:</strong> {selectedPemeriksaan.riwayat_penyakit || 'Tidak ada catatan'}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BayiDetail;
