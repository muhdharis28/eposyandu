import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getBayi } from '../../BayiService'; // Import bayi data service to fetch all bayi
import { getPenggunaById } from '../../PenggunaService';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate for programmatic navigation
import { FaPlus, FaPrint } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader'; // Loading spinner
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import posyandu from '@/assets/posyandu.png';

const BayiCardKader = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [bayiData, setBayiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For storing the filtered data
  const [searchTerm, setSearchTerm] = useState(''); // For storing the search term
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchUserAndBayi = async () => {
      try {
        const userResponse = await getPenggunaById(userId);
        const userData = userResponse.data;
        setUser(userData);

        // Fetch all bayi data without filtering by orangtua
        const bayiResponse = await getBayi();
        setBayiData(bayiResponse.data);
        setFilteredData(bayiResponse.data); // Initialize filtered data with all bayi data
      } catch (error) {
        console.error('Error fetching Bayi or user data:', error);
        setBayiData([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndBayi();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = bayiData.filter((bayi) =>
      bayi.nama_balita.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleAddBayi = () => {
    navigate('/kader-balita/baru');
  };

  const handleEditBayi = (id) => {
    navigate(`/kader-balita/edit/${id}`);
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
    doc.text('ePosyandu Tanjungpinang', 40, 20); // Title beside logo
  
    // Line under the header
    doc.setLineWidth(1);
    doc.setDrawColor(0, 122, 204); // Line color
    doc.line(14, 30, 196, 30); // Draw line below the title
  
    // Add another title for the report
    doc.setFontSize(16);
    doc.setTextColor('#000000'); // Set black text color for the report title
    doc.text('Laporan Bayi', 14, 45);
  
    // Define the table columns and rows
    const columns = ["No", "Nama", "NIK", "Tanggal Lahir", "Jenis Kelamin", "Nama Ibu", "Nama Ayah"];
    
    const rows = filteredData.map((bayi, index) => [
      index + 1, // Add row number
      bayi.nama_balita,
      bayi.nik_balita,
      new Date(bayi.tanggal_lahir_balita).toLocaleDateString(),
      bayi.jenis_kelamin_balita === 'l' ? 'Laki-laki' : 'Perempuan',
      bayi.orangtuaDetail.nama_ibu,
      bayi.orangtuaDetail.nama_ayah,
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
    doc.save('Laporan_Bayi.pdf');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={50} color={"#3498db"} loading={true} />
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
                onClick={handleAddBayi}
                className='flex items-center px-6 py-2 rounded-lg shadow-md transition-all duration-300 bg-blue-500 hover:bg-blue-600 text-white'
              >
                <FaPlus className="mr-2" /> Tambah Data Bayi
              </button>

              <input
                type="text"
                placeholder="Cari Nama Bayi"
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
            <h3 className="text-xl font-bold text-gray-700 mb-4">Data Bayi</h3>

            {filteredData.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Belum ada data bayi yang tersedia.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((balita) => (
                  <Link key={balita.id} to={`/kader-balita/${balita.id}`}>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      <h4 className="text-lg font-semibold text-gray-800">{balita.nama_balita}</h4>
                      <p className="text-gray-600">
                        Tanggal Lahir: {new Date(balita.tanggal_lahir_balita).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        Jenis Kelamin: {balita.jenis_kelamin_balita === 'l' ? 'Laki-laki' : 'Perempuan'}
                      </p>

                      <div className="flex justify-end mt-4">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent Link click propagation
                            handleEditBayi(balita.id);
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

export default BayiCardKader;
