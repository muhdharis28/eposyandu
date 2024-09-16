import React, { useEffect, useState, useRef } from 'react';
import { getLansia } from '../../LansiaService'; // Assuming you have this service to get all Lansia data
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import posyandu from '@/assets/posyandu.png';

const ReportLansia = () => {
  const [lansiaData, setLansiaData] = useState([]); // Ensure lansiaData is initialized as an array
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // For sidebar toggle
  const printRef = useRef(); // Ref for printing

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getLansia(); // Fetch all Lansia data
        if (Array.isArray(response.data)) {  // Ensure the response contains an array
          setLansiaData(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Lansia data:', error);
      }
    };
    fetchReports();
  }, []);

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
    doc.text('Laporan Lansia', 14, 45);
  
    // Define the table columns and rows
    const columns = ["No", "Nama", "NIK", "Tanggal Lahir", "Jenis Kelamin", "Alamat KTP", "Alamat Domisili"];
    
    const rows = lansiaData.map((lansia, index) => [
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

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg" ref={printRef}>
            
          <div className="mt-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Laporan Lansia</h1>
            <button
              type="button"
              onClick={generatePDF}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
              aria-label="Download PDF"
            >
              Download PDF
            </button>
          </div>

            <table className="table-auto w-full mb-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">NIK</th>
                  <th className="px-4 py-2">Tanggal Lahir</th>
                  <th className="px-4 py-2">Jenis Kelamin</th>
                  <th className="px-4 py-2">Alamat KTP</th>
                  <th className="px-4 py-2">Alamat Domisili</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(lansiaData) && lansiaData.length > 0 ? (
                  lansiaData.map((lansia, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{lansia.nama_lansia}</td>
                      <td className="px-4 py-2">{lansia.nik_lansia}</td>
                      <td className="px-4 py-2">{new Date(lansia.tanggal_lahir_lansia).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{lansia.jenis_kelamin_lansia === 'l' ? 'Laki-laki' : 'Perempuan'}</td>
                      <td className="px-4 py-2">{lansia.alamat_ktp_lansia}</td>
                      <td className="px-4 py-2">{lansia.alamat_domisili_lansia}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportLansia;
