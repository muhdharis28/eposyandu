import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getWaliById } from '../../WaliService'; // Import the service to get Wali data
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBriefcase } from 'react-icons/fa';

const WaliDetailKader = () => {
  const { id } = useParams();
  const [wali, setWali] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWaliDetail = async () => {
      try {
        const response = await getWaliById(id);
        setWali(response.data);
      } catch (error) {
        console.error('Error fetching Wali details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWaliDetail();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-gray-600 mb-4">
            <Link to="/kader-wali" className="hover:underline">Wali List</Link> &gt; Detail Wali
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{wali.nama_wali}</h1>
            </div>

            {wali ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-3" />
                    <strong className="mr-2">Nama Wali:</strong> {wali.nama_wali}
                  </div>

                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-blue-500 mr-3" />
                    <strong className="mr-2">Alamat Domisili:</strong>{' '}
                    {wali.alamat_domisili_wali || 'Tidak tersedia'}
                  </div>

                  <div className="flex items-center">
                    <FaPhone className="text-blue-500 mr-3" />
                    <strong className="mr-2">No HP:</strong>{' '}
                    {wali.no_hp_wali || 'Tidak tersedia'}
                  </div>

                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-500 mr-3" />
                    <strong className="mr-2">Email:</strong>{' '}
                    {wali.email_wali || 'Tidak tersedia'}
                  </div>
                </div>

                {/* Additional Section */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Detail Tambahan</h2>
                  <p className="text-gray-700">
                    Pekerjaan Wali: {wali.pekerjaan_wali || 'Tidak tersedia'}
                  </p>
                  <p className="text-gray-700">
                    Pendidikan Wali: {wali.pendidikan_wali || 'Tidak tersedia'}
                  </p>
                </div>
              </div>
            ) : (
              <p>No details available for this Wali.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaliDetailKader;
