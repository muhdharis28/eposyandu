import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getPerkembanganBalitas } from '../../PerkembanganBalitaService'; // Replace with service to fetch Perkembangan Balita data
import { getBayi } from '../../BayiService'; // Replace with service to fetch Balita data
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaPrint } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import posyandu from '@/assets/silaba.png';

const PerkembanganBalitaCard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [perkembanganData, setPerkembanganData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBalita, setSelectedBalita] = useState('all'); // Default to "all"
  const [balitaOptions, setBalitaOptions] = useState([]); // Store all Balita data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerkembanganData = async () => {
      try {
        const perkembanganResponse = await getPerkembanganBalitas();
        setPerkembanganData(perkembanganResponse.data);
        setFilteredData(perkembanganResponse.data);
      } catch (error) {
        console.error('Error fetching Perkembangan Balita data:', error);
        setPerkembanganData([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchBalitaData = async () => {
      try {
        const balitaResponse = await getBayi();
        setBalitaOptions(balitaResponse.data); // Set the fetched Balita data
      } catch (error) {
        console.error('Error fetching Balita data:', error);
        setBalitaOptions([]);
      }
    };

    fetchPerkembanganData();
    fetchBalitaData(); // Fetch Balita when component mounts
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = perkembanganData.filter((perkembangan) =>
      perkembangan.balitaDetail.nama_balita.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleAddPerkembangan = () => {
    navigate('/kader-perkembangan-balita/baru');
  };

  const handleEditPerkembangan = (id) => {
    navigate(`/kader-perkembangan-balita/edit/${id}`);
  };

  const generatePDF = (balitaName, balitaId) => {
    const doc = new jsPDF();

    // Add the logo
    const imgWidth = 24;
    const imgHeight = 18;
    doc.addImage(posyandu, 'PNG', 14, 10, imgWidth, imgHeight);

    // Add title
    doc.setFontSize(18);
    doc.setTextColor('#007ACC');
    doc.text('SiLaBa Tanjungpinang', 40, 20);

    // Line under the header
    doc.setLineWidth(1);
    doc.setDrawColor(0, 122, 204);
    doc.line(14, 30, 196, 30);

    // Add report title
    doc.setFontSize(16);
    doc.setTextColor('#000000');
    doc.text(`Laporan Perkembangan Balita - ${balitaName}`, 14, 45);

    // Define table columns and rows
    const columns = ['No', 'Tanggal Kunjungan', 'Berat Badan', 'Tinggi Badan', 'Keterangan'];
    const rows = filteredData
      .filter((perkembangan) => balitaId === 'all' || perkembangan.balitaDetail.id === balitaId)
      .map((perkembangan, index) => [
        index + 1,
        new Date(perkembangan.tanggal_kunjungan).toLocaleDateString(),
        perkembangan.berat_badan,
        perkembangan.tinggi_badan,
        perkembangan.keterangan,
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
    doc.save(`Laporan_Perkembangan_Balita_${balitaName}.pdf`);
  };

  const handleDownloadPDFClick = () => {
    setIsModalOpen(true); // Show modal to choose Balita
  };

  const handlePrintPDF = () => {
    if (selectedBalita === 'all') {
      generatePDF('Semua Balita', 'all');
    } else {
      const selectedBalitaObj = balitaOptions.find((balita) => balita.id === Number(selectedBalita));
      if (selectedBalitaObj) {
        generatePDF(selectedBalitaObj.nama_balita, selectedBalitaObj.id);
      } else {
        alert('Balita not found');
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
                onClick={handleAddPerkembangan}
                className="flex items-center px-6 py-2 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
              >
                <FaPlus className="mr-2" />
                Tambah Perkembangan Balita
              </button>

              <input
                type="text"
                placeholder="Cari Nama Balita"
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

          {/* Modal for Balita Selection */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
              <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 p-8 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out">
                {/* Modal Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Pilih Balita</h2>

                {/* Dropdown for selecting Balita */}
                <div className="mb-4">
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => setSelectedBalita(e.target.value)}
                  >
                    <option value="">Pilih Balita</option>
                    <option value="all">Semua Balita</option>
                    {/* Option to print all */}
                    {balitaOptions.map((balita) => (
                      <option key={balita.id} value={balita.id}>
                        {balita.nama_balita}
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
            <h3 className="text-xl font-bold text-gray-700 mb-4">Data Perkembangan Balita</h3>

            {filteredData.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Belum ada data perkembangan balita yang tersedia.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((perkembangan) => (
                  <Link key={perkembangan.id} to={`/kader-perkembangan-balita/${perkembangan.id}`}>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      <h4 className="text-lg font-semibold text-gray-800">{perkembangan.balitaDetail.nama_balita}</h4>
                      <p className="text-gray-600">
                        Tanggal Kunjungan: {new Date(perkembangan.tanggal_kunjungan).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">Berat Badan: {perkembangan.berat_badan} kg</p>
                      <p className="text-gray-600">Tinggi Badan: {perkembangan.tinggi_badan} cm</p>
                      <p className="text-gray-600">Keterangan: {perkembangan.keterangan}</p>

                      <div className="flex justify-end mt-4">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditPerkembangan(perkembangan.id);
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

export default PerkembanganBalitaCard;
