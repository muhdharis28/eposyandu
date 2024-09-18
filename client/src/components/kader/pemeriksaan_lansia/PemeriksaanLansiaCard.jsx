import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getPemeriksaanLansia } from '../../PemeriksaanLansiaService';
import { getLansia } from '../../LansiaService'; // Assuming this is the service to fetch Lansia
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaPrint } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import posyandu from '@/assets/posyandu.png';

const PemeriksaanLansiaCard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [pemeriksaanData, setPemeriksaanData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // For showing the modal
  const [selectedLansia, setSelectedLansia] = useState('all'); // Default to "all"
  const [lansiaOptions, setLansiaOptions] = useState([]); // Store all Lansia from Lansia service
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPemeriksaanData = async () => {
      try {
        const pemeriksaanResponse = await getPemeriksaanLansia();
        setPemeriksaanData(pemeriksaanResponse.data);
        setFilteredData(pemeriksaanResponse.data);
      } catch (error) {
        console.error('Error fetching Pemeriksaan Lansia data:', error);
        setPemeriksaanData([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLansiaData = async () => {
      try {
        const lansiaResponse = await getLansia(); // Fetch Lansia from Lansia service
        setLansiaOptions(lansiaResponse.data); // Set the fetched Lansia data
      } catch (error) {
        console.error('Error fetching Lansia data:', error);
        setLansiaOptions([]);
      }
    };

    fetchPemeriksaanData();
    fetchLansiaData(); // Fetch Lansia when component mounts
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = pemeriksaanData.filter((pemeriksaan) =>
      pemeriksaan.lansiaDetail.nama_lansia.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleAddPemeriksaan = () => {
    navigate('/kader-pemeriksaan-lansia/baru');
  };

  const handleEditPemeriksaan = (id) => {
    navigate(`/kader-pemeriksaan-lansia/edit/${id}`);
  };

  const generatePDF = (lansiaName, lansiaId) => {
    const doc = new jsPDF();

    // Add the logo
    const imgWidth = 24;
    const imgHeight = 18;
    doc.addImage(posyandu, 'PNG', 14, 10, imgWidth, imgHeight);

    // Add title
    doc.setFontSize(18);
    doc.setTextColor('#007ACC');
    doc.text('ePosyandu Tanjungpinang', 40, 20);

    // Line under the header
    doc.setLineWidth(1);
    doc.setDrawColor(0, 122, 204);
    doc.line(14, 30, 196, 30);

    // Add report title
    doc.setFontSize(16);
    doc.setTextColor('#000000');
    doc.text(`Laporan Pemeriksaan Lansia - ${lansiaName}`, 14, 45);

    // Define table columns and rows
    const columns = ['No', 'Tanggal Pemeriksaan', 'Tekanan Darah', 'Berat Badan', 'Keterangan'];
    const rows = filteredData
      .filter((pemeriksaan) => lansiaId === 'all' || pemeriksaan.lansiaDetail.id === lansiaId)
      .map((pemeriksaan, index) => [
        index + 1,
        new Date(pemeriksaan.tanggal_kunjungan).toLocaleDateString(),
        pemeriksaan.tekanan_darah,
        pemeriksaan.berat_badan,
        pemeriksaan.keterangan,
      ]);

    // Generate the table
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 55,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { cellPadding: 2, fontSize: 10, halign: 'center' },
    });

    // Save the PDF
    doc.save(`Laporan_Pemeriksaan_Lansia_${lansiaName}.pdf`);
  };

  const handleDownloadPDFClick = () => {
    setIsModalOpen(true); // Show modal to choose Lansia
  };

  const handlePrintPDF = () => {
    if (selectedLansia === 'all') {
      generatePDF('Semua Lansia', 'all');
    } else {
      const selectedLansiaObj = lansiaOptions.find((lansia) => lansia.id === Number(selectedLansia));
      if (selectedLansiaObj) {
        generatePDF(selectedLansiaObj.nama_lansia, selectedLansiaObj.id);
      } else {
        alert("Lansia not found");
      }
    }
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={50} color={'#3498db'} loading={true} />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className={`flex-1 bg-gray-50 p-6 transition-all duration-500 ease-in-out mt-16`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddPemeriksaan}
                className="flex items-center px-6 py-2 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
              >
                <FaPlus className="mr-2" />
                Tambah Pemeriksaan Lansia
              </button>

              <input
                type="text"
                placeholder="Cari Nama Lansia"
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleDownloadPDFClick}
              className="flex items-center px-6 py-2 rounded-lg shadow-md transition-all duration-300 bg-blue-500 hover:bg-blue-600 text-white"
              aria-label="Download PDF"
            >
              <FaPrint className="mr-2" />
              Download PDF
            </button>
          </div>

          {/* Modal for Lansia Selection */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
              <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 p-8 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out">
                {/* Modal Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Pilih Lansia</h2>

                {/* Dropdown for selecting Lansia */}
                <div className="mb-4">
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => setSelectedLansia(e.target.value)}
                  >
                    <option value="">Pilih Lansia</option>
                    <option value="all">Semua Lansia</option>
                    {/* Option to print all */}
                    {lansiaOptions.map((lansia) => (
                      <option key={lansia.id} value={lansia.id}>
                        {lansia.nama_lansia}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center mt-6">
                  <button
                    className="mr-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-200 ease-in-out"
                    onClick={handlePrintPDF}
                  >
                    Print PDF
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-200 ease-in-out"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Data Pemeriksaan Lansia</h3>

            {filteredData.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Belum ada data pemeriksaan lansia yang tersedia.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((pemeriksaan) => (
                  <Link key={pemeriksaan.id} to={`/kader-pemeriksaan-lansia/${pemeriksaan.id}`}>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      <h4 className="text-lg font-semibold text-gray-800">{pemeriksaan.lansiaDetail.nama_lansia}</h4>
                      <p className="text-gray-600">
                        Tanggal Pemeriksaan: {new Date(pemeriksaan.tanggal_kunjungan).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">Tekanan Darah: {pemeriksaan.tekanan_darah}</p>
                      <p className="text-gray-600">Berat Badan: {pemeriksaan.berat_badan} kg</p>
                      <p className="text-gray-600">Keterangan: {pemeriksaan.keterangan}</p>

                      <div className="flex justify-end mt-4">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditPemeriksaan(pemeriksaan.id);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PemeriksaanLansiaCard;
