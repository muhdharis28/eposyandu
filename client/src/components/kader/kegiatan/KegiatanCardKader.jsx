import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getKegiatan } from '../../KegiatanService'; // Updated service path
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaPrint } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import posyandu from '@/assets/posyandu.png';

const KegiatanCardKader = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [kegiatanData, setKegiatanData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For storing the filtered data
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // For storing the search term
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKegiatanData = async () => {
      try {
        const kegiatanResponse = await getKegiatan(); // Fetch all kegiatan data from API
        setKegiatanData(kegiatanResponse.data);
        setFilteredData(kegiatanResponse.data); // Initialize with all data
      } catch (error) {
        console.error('Error fetching Kegiatan Kader data:', error);
        setKegiatanData([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKegiatanData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = kegiatanData.filter((kegiatan) =>
      kegiatan.nama.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleAddKegiatan = () => {
    navigate('/kader-kegiatan/baru');
  };

  const handleEditKegiatan = (id) => {
    navigate(`/kader-kegiatan/edit/${id}`);
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
    doc.text('ePosyandu Tanjungpinang', 40, 20); // Title beside logo

    // Line under the header
    doc.setLineWidth(1);
    doc.setDrawColor(0, 122, 204);
    doc.line(14, 30, 196, 30);

    // Add another title for the report
    doc.setFontSize(16);
    doc.setTextColor('#000000');
    doc.text('Laporan Kegiatan Kader', 14, 45);

    // Define the table columns and rows
    const columns = ['No', 'Nama Kegiatan', 'Tanggal', 'Jenis', 'Deskripsi'];

    const rows = filteredData.map((kegiatan, index) => [
      index + 1, // Add row number
      kegiatan.nama,
      new Date(kegiatan.tanggal).toLocaleDateString(),
      kegiatan.jenis.charAt(0).toUpperCase() + kegiatan.jenis.slice(1), // Capitalize the first letter
      kegiatan.deskripsi || 'Tidak ada deskripsi',
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
    doc.save('Laporan_Kegiatan_Kader.pdf');
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
                onClick={handleAddKegiatan}
                className="flex items-center px-6 py-2 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
              >
                <FaPlus className="mr-2" /> Tambah Data Kegiatan
              </button>

              <input
                type="text"
                placeholder="Cari Nama Kegiatan"
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
            <h3 className="text-xl font-bold text-gray-700 mb-4">Data Kegiatan</h3>

            {filteredData.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Belum ada data kegiatan kader yang tersedia.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((kegiatan) => (
                  <Link key={kegiatan.id} to={`/kader-kegiatan/${kegiatan.id}`}>
                  <div className="relative bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    
                    {/* Badge for Jenis Kegiatan on the top right */}
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white ${
                        kegiatan.jenis === 'lansia' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {kegiatan.jenis === 'lansia' ? 'Lansia' : 'Balita'}
                    </span>
                    
                    {/* Kegiatan content */}
                    <h4 className="text-lg font-semibold text-gray-800">{kegiatan.nama}</h4>
                    <p className="text-gray-600">
                      Tanggal Kegiatan: {new Date(kegiatan.tanggal).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">Deskripsi: {kegiatan.deskripsi}</p>
                
                    <div className="flex justify-end mt-4">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent Link click propagation
                          handleEditKegiatan(kegiatan.id);
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

export default KegiatanCardKader;
