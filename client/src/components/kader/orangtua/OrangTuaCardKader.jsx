import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getOrangTua } from '../../OrangTuaService'; // Import the service to get OrangTua data
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaPrint } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import posyandu from '@/assets/posyandu.png';

const OrangTuaCardKader = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [orangTuaData, setOrangTuaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrangTuaData = async () => {
      try {
        const orangTuaResponse = await getOrangTua(); // Fetch all OrangTua data from API
        setOrangTuaData(orangTuaResponse.data);
        setFilteredData(orangTuaResponse.data);
      } catch (error) {
        console.error('Error fetching OrangTua data:', error);
        setOrangTuaData([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrangTuaData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = orangTuaData.filter((orangTua) =>
      orangTua.nama_ibu.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleAddOrangTua = () => {
    navigate('/kader-orangtua/baru');
  };

  const handleEditOrangTua = (id) => {
    navigate(`/kader-orangtua/edit/${id}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const imgWidth = 24;
    const imgHeight = 18;
    doc.addImage(posyandu, 'PNG', 14, 10, imgWidth, imgHeight);

    doc.setFontSize(18);
    doc.setTextColor('#007ACC');
    doc.text('ePosyandu Tanjungpinang', 40, 20);

    doc.setLineWidth(1);
    doc.setDrawColor(0, 122, 204);
    doc.line(14, 30, 196, 30);

    doc.setFontSize(16);
    doc.setTextColor('#000000');
    doc.text('Laporan Data Orang Tua', 14, 45);

    const columns = ['No', 'Nama Ibu', 'Nama Ayah', 'Alamat', 'No HP'];

    const rows = filteredData.map((orangTua, index) => [
      index + 1,
      orangTua.nama_ibu,
      orangTua.nama_ayah,
      orangTua.alamat_domisili_ibu || 'Tidak ada alamat',
      orangTua.no_hp_ibu || orangTua.no_hp_ayah || 'Tidak ada no hp',
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 55,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { cellPadding: 2, fontSize: 10, halign: 'center' },
    });

    doc.save('Laporan_OrangTua.pdf');
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
                onClick={handleAddOrangTua}
                className="flex items-center px-6 py-2 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
              >
                <FaPlus className="mr-2" /> Tambah Data Orang Tua
              </button>

              <input
                type="text"
                placeholder="Cari Nama Ibu"
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
            <h3 className="text-xl font-bold text-gray-700 mb-4">Data Orang Tua</h3>

            {filteredData.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Belum ada data orang tua yang tersedia.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((orangTua) => (
                  <Link key={orangTua.id} to={`/kader-orangtua/${orangTua.id}`}>
                    <div className="relative bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">

                      <h4 className="text-lg font-semibold text-gray-800">{orangTua.nama_ibu}</h4>
                      <p className="text-gray-600">Nama Ayah: {orangTua.nama_ayah}</p>
                      <p className="text-gray-600">Alamat: {orangTua.alamat_domisili_ibu || 'Tidak ada alamat'}</p>
                      <p className="text-gray-600">No HP: {orangTua.no_hp_ibu || orangTua.no_hp_ayah || 'Tidak ada no hp'}</p>

                      <div className="flex justify-end mt-4">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditOrangTua(orangTua.id);
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

export default OrangTuaCardKader;
