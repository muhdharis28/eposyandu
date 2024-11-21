import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getLansia } from '../../LansiaService'; // Replace with service to get all Lansia data
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaPrint } from 'react-icons/fa'; // Icon for the Add button
import ClipLoader from 'react-spinners/ClipLoader'; // Import a spinner for loading state
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import posyandu from '@/assets/silaba.png';

const LansiaCard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [lansiaData, setLansiaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For storing the filtered data
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // For storing the search term
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLansiaData = async () => {
      try {
        const lansiaResponse = await getLansia(); // Fetch all lansia data from API
        setLansiaData(lansiaResponse.data);
        setFilteredData(lansiaResponse.data); // Initialize with all data
      } catch (error) {
        console.error('Error fetching Lansia data:', error);
        setLansiaData([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLansiaData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = lansiaData.filter((lansia) =>
      lansia.nama_lansia.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleAddLansia = () => {
    navigate('/kader-lansia/baru');
  };

  const handleEditBayi = (id) => {
    navigate(`/kader-lansia/edit/${id}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add the logo (assuming headerLogo is a base64 encoded image)
    const imgWidth = 24; // Width of the logo
    const imgHeight = 18; // Height of the logo
    doc.addImage(posyandu, 'PNG', 14, 10, imgWidth, imgHeight); // Add the logo to PDF

    // Add title next to the logo
    doc.setFontSize(18);
    doc.setTextColor('#007ACC'); // Set color similar to the blue in the header
    doc.text('SiLaBa Tanjungpinang', 40, 20); // Title beside logo

    // Line under the header
    doc.setLineWidth(1);
    doc.setDrawColor(0, 122, 204); // Line color
    doc.line(14, 30, 196, 30); // Draw line below the title

    // Add another title for the report
    doc.setFontSize(16);
    doc.setTextColor('#000000'); // Set black text color for the report title
    doc.text('Laporan Lansia', 14, 45);

    // Define the table columns and rows
    const columns = ['No', 'Nama', 'NIK', 'Tanggal Lahir', 'Jenis Kelamin', 'Alamat KTP', 'Alamat Domisili'];

    const rows = filteredData.map((lansia, index) => [
      index + 1, // Add row number
      lansia.nama_lansia,
      lansia.nik_lansia,
      new Date(lansia.tanggal_lahir_lansia).toLocaleDateString(),
      lansia.jenis_kelamin_lansia === 'l' ? 'Laki-laki' : 'Perempuan',
      lansia.alamat_ktp_lansia,
      lansia.alamat_domisili_lansia,
    ]);

    // Use autoTable to generate the table
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 55, // Start the table below the header
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] }, // Customize header color
      styles: { cellPadding: 2, fontSize: 10, halign: 'center' }, // Customize cell styles
    });

    // Save the PDF
    doc.save('Laporan_Lansia.pdf');
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
                onClick={handleAddLansia}
                className="flex items-center px-6 py-2 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
              >
                <FaPlus className="mr-2" /> Tambah Data Lansia
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
              onClick={generatePDF}
              className="flex items-center px-6 py-2 rounded-lg shadow-md transition-all duration-300 bg-blue-500 hover:bg-blue-600 text-white"
              aria-label="Download PDF"
            >
              <FaPrint className="mr-2" /> Download PDF
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Data Lansia</h3>

            {filteredData.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Belum ada data lansia yang tersedia.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((lansia) => (
                  <Link key={lansia.id} to={`/kader-lansia/${lansia.id}`}>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      <h4 className="text-lg font-semibold text-gray-800">{lansia.nama_lansia}</h4>
                      <p className="text-gray-600">
                        Tanggal Lahir: {new Date(lansia.tanggal_lahir_lansia).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">Alamat: {lansia.alamat_lansia}</p>
                      <p className="text-gray-600">Nomor HP: {lansia.no_hp_lansia}</p>
                      <p className="text-gray-600">
                        Jenis Kelamin: {lansia.jenis_kelamin_lansia === 'l' ? 'Laki-laki' : 'Perempuan'}
                      </p>

                      <div className="flex justify-end mt-4">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent Link click propagation
                            handleEditBayi(lansia.id);
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

export default LansiaCard;
