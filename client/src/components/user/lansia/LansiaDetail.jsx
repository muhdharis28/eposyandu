import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getLansiaById } from '../../LansiaService'; // Assuming you have this service
import { getPemeriksaanByLansiaId } from '../../PemeriksaanLansiaService'; // Assuming you have this service
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { FaUser, FaPhone, FaEnvelope, FaTransgender, FaBriefcase, FaGraduationCap, FaHome, FaCalendar, FaTimes } from 'react-icons/fa';
import Modal from 'react-modal'; // Import Modal for pop-up

// Custom styles for the Modal pop-up
Modal.setAppElement('#root');

const LansiaDetail = () => {
  const { id } = useParams(); // Get the Lansia ID from the URL
  const [lansia, setLansia] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pemeriksaanList, setPemeriksaanList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal open/close
  const [selectedPemeriksaan, setSelectedPemeriksaan] = useState(null); // Store selected pemeriksaan details
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchLansiaDetail = async () => {
      try {
        const response = await getLansiaById(id);
        setLansia(response.data);

        // Fetch Pemeriksaan Lansia data
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
            <Link to="/user-lansia" className="hover:underline">Lansia List</Link> &gt; Detail Lansia
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Detail Lansia</h1>

            {lansia ? (
              <div className="space-y-4">
                {/* Lansia details */}
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
                  <div className="flex items-center">
                    <FaTransgender className="text-blue-500 mr-3" />
                    <strong className="mr-2">Jenis Kelamin:</strong> {lansia.jenis_kelamin_lansia === 'l' ? 'Laki-laki' : 'Perempuan'}
                  </div>
                  <div className="flex items-center">
                    <FaBriefcase className="text-blue-500 mr-3" />
                    <strong className="mr-2">Pekerjaan:</strong> {lansia.pekerjaan?.nama || 'N/A'}
                  </div>
                  <div className="flex items-center">
                    <FaGraduationCap className="text-blue-500 mr-3" />
                    <strong className="mr-2">Pendidikan:</strong> {lansia.pendidikan?.nama || 'N/A'}
                  </div>
                  <div className="flex items-center">
                    <FaHome className="text-blue-500 mr-3" />
                    <strong className="mr-2">Alamat:</strong> {lansia.alamat_ktp_lansia} / {lansia.alamat_domisili_lansia}
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="text-blue-500 mr-3" />
                    <strong className="mr-2">NIK:</strong> {lansia.nik_lansia}
                  </div>
                  <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-3" />
                    <strong className="mr-2">Status Pernikahan:</strong> {lansia.status_pernikahan_lansia || 'N/A'}
                  </div>
                </div>

                {/* Pemeriksaan Lansia Section */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Pemeriksaan Lansia</h2>
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
                        <p className="text-gray-600">
                          <strong>Riwayat Obat:</strong> {pemeriksaan.riwayat_obat}
                        </p>
                        <p className="text-gray-600">
                          <strong>Riwayat Penyakit:</strong> {pemeriksaan.riwayat_penyakit}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500">Belum ada pemeriksaan untuk lansia ini.</p>
                )}
              </div>
            ) : (
              <p>No details available for this Lansia.</p>
            )}
          </div>
        </div>
      </div>

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
              <strong>Dokter:</strong> {selectedPemeriksaan.dokterDetail?.nama || 'Tidak ada data'}
            </p>
            <p>
              <strong>Berat Badan:</strong> {selectedPemeriksaan.berat_badan || 'Tidak ada catatan'}
            </p>
            <p>
              <strong>Tinggi Badan:</strong> {selectedPemeriksaan.tinggi_badan || 'Tidak ada catatan'}
            </p>
            <p>
              <strong>Lingkar Perut:</strong> {selectedPemeriksaan.lingkar_perut || 'Tidak ada catatan'}
            </p>
            <p>
              <strong>Tekanan Darah:</strong> {selectedPemeriksaan.tekanan_darah || 'Tidak ada catatan'}
            </p>
            <p>
              <strong>Gula Darah:</strong> {selectedPemeriksaan.gula_darah || 'Tidak ada catatan'}
            </p>
            <p>
              <strong>Kolestrol:</strong> {selectedPemeriksaan.kolestrol || 'Tidak ada catatan'}
            </p>
            <p>
              <strong>Asam Urat:</strong> {selectedPemeriksaan.asam_urat || 'Tidak ada catatan'}
            </p>
            <p>
              <strong>Kesehatan Mata:</strong> {selectedPemeriksaan.kesehatan_mata || 'Tidak ada catatan'}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LansiaDetail;
