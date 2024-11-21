import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getDokumentasi } from '../../DokumentasiService'; // Replace with service to get all Dokumentasi data
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaPrint } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import posyandu from '@/assets/silaba.png';

const DokumentasiCardKader = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [dokumentasiData, setDokumentasiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For storing the filtered data
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // For storing the search term
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDokumentasiData = async () => {
      try {
        const dokumentasiResponse = await getDokumentasi(); // Fetch all dokumentasi data from API
        setDokumentasiData(dokumentasiResponse.data);
        setFilteredData(dokumentasiResponse.data); // Initialize with all data
      } catch (error) {
        console.error('Error fetching Dokumentasi data:', error);
        setDokumentasiData([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDokumentasiData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = dokumentasiData.filter((dokumentasi) =>
      dokumentasi.judul.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleAddDokumentasi = () => {
    navigate('/kader-dokumentasi/baru');
  };

  const handleEditDokumentasi = (id) => {
    navigate(`/kader-dokumentasi/edit/${id}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add the logo
    const imgWidth = 24;
    const imgHeight = 18;
    doc.addImage(posyandu, 'PNG', 14, 10, imgWidth, imgHeight); // Add the logo to PDF

    // Add title next to the logo
    doc.setFontSize(18);
    doc.setTextColor('#007ACC');
    doc.text('SiLaBa Tanjungpinang', 40, 20); // Title beside logo

    // Line under the header
    doc.setLineWidth(1);
    doc.setDrawColor(0, 122, 204);
    doc.line(14, 30, 196, 30);

    // Add another title for the report
    doc.setFontSize(16);
    doc.setTextColor('#000000');
    doc.text('Laporan Dokumentasi', 14, 45);

    // Define the table columns and rows
    const columns = ['No', 'Judul', 'Tanggal', 'Deskripsi'];

    const rows = filteredData.map((dokumentasi, index) => [
      index + 1, // Add row number
      dokumentasi.judul,
      new Date(dokumentasi.tanggal).toLocaleDateString(),
      dokumentasi.deskripsi || 'Tidak ada deskripsi',
    ]);

    // Use autoTable to generate the table
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 55,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] }, // Customize header color
      styles: { cellPadding: 2, fontSize: 10, halign: 'center' }, // Customize cell styles
    });

    // Save the PDF
    doc.save('Laporan_Dokumentasi.pdf');
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
                onClick={handleAddDokumentasi}
                className="flex items-center px-6 py-2 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
              >
                <FaPlus className="mr-2" /> Tambah Data Dokumentasi
              </button>

              <input
                type="text"
                placeholder="Cari Judul Dokumentasi"
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <button
              type="button"
              onClick={generatePDF}
              className="flex items-center px-6 py-2 rounded-lg shadow-md transition-all duration-300 bg-blue-500 hover:bg-blue-600 text-white"
              aria-label="Download PDF"
            >
              <FaPrint className="mr-2" /> Download PDF
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Data Dokumentasi</h3>

            {filteredData.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Belum ada data dokumentasi yang tersedia.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((dokumentasi) => (
                  <Link key={dokumentasi.id} to={`/kader-dokumentasi/${dokumentasi.id}`}>
                    <div className="relative bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      
                      {/* Dokumentasi content */}
                      <h4 className="text-lg font-semibold text-gray-800">{dokumentasi.judul}</h4>
                      <p className="text-gray-600">
                        Tanggal Dokumentasi: {new Date(dokumentasi.tanggal).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">Deskripsi: {dokumentasi.deskripsi}</p>
                  
                      <div className="flex justify-end mt-4">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent Link click propagation
                            handleEditDokumentasi(dokumentasi.id);
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

export default DokumentasiCardKader;
