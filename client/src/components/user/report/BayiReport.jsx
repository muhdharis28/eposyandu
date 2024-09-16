import React, { useEffect, useState, useRef } from 'react';
import { getBayi } from '../../BayiService'; // Assuming you have this service to get all Bayi data
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import posyandu from '@/assets/posyandu.png';

const ReportBayi = () => {
  const [bayiData, setBayiData] = useState([]); // Ensure bayiData is initialized as an array
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // For sidebar toggle
  const printRef = useRef(); // Ref for printing

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getBayi(); // Fetch all Bayi data
        if (Array.isArray(response.data)) {  // Ensure the response contains an array
          setBayiData(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Bayi data:', error);
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
    doc.text('Laporan Bayi', 14, 45);
  
    // Define the table columns and rows
    const columns = ["No", "Nama", "NIK", "Tanggal Lahir", "Jenis Kelamin", "Nama Ibu", "Nama Ayah"];
    
    const rows = bayiData.map((bayi, index) => [
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

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg" ref={printRef}>
            
          <div className="mt-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Laporan Bayi</h1>
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
                  <th className="px-4 py-2">Nama Ibu</th>
                  <th className="px-4 py-2">Nama Ayah</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bayiData) && bayiData.length > 0 ? (
                  bayiData.map((bayi, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{bayi.nama_balita}</td>
                      <td className="px-4 py-2">{bayi.nik_balita}</td>
                      <td className="px-4 py-2">{new Date(bayi.tanggal_lahir_balita).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{bayi.jenis_kelamin_balita === 'l' ? 'Laki-laki' : 'Perempuan'}</td>
                      <td className="px-4 py-2">{bayi.orangtuaDetail.nama_ibu}</td>
                      <td className="px-4 py-2">{bayi.orangtuaDetail.nama_ayah}</td>
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

export default ReportBayi;
