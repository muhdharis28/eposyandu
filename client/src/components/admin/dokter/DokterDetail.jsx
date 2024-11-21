import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctorById } from '../../DokterService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const DokterDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    loadDoctorDetail();
  }, [id]);

  const loadDoctorDetail = async () => {
    try {
      const result = await getDoctorById(id);
      setDoctor(result.data);
    } catch (error) {
      setError('Failed to load doctor details.');
      console.error('Failed to load doctor details:', error);
    }
  };

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!doctor) {
    return <div className="p-6">Loading...</div>;
  }

  const handleBackToList = () => {
    navigate('/dokter');
  };

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with toggle button for sidebar */}
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar with collapsible functionality */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button
              onClick={handleBackToList}
              className="text-blue-500 hover:underline"
            >
              &lt; Kembali ke Daftar Dokter
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-6">Detail Dokter</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
            {/* Left Column - Main Doctor Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt={doctor.nama}
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
                <div>
                  <h3 className="text-xl font-semibold">{doctor.nama}</h3>
                  <p className="text-gray-500">{doctor.spesialis}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>Email:</strong> {doctor.email}
                </p>
                <p className="text-gray-700">
                  <strong>Nomor Telepon:</strong> {doctor.telepon}
                </p>
                {/* Add more details as needed */}
              </div>
            </div>

            {/* Right Column - Additional Information or Actions */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-2">Additional Details</h4>
                <p className="text-gray-700">
                  {/* Replace with relevant additional information */}
                  <strong>Experience:</strong> 10 years
                </p>
                <p className="text-gray-700">
                  <strong>Location:</strong> Jakarta, Indonesia
                </p>
                {/* Add more sections as needed */}
              </div>
              <button
                className="w-full text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                onClick={() => alert('Contact this doctor')}
              >
                Contact Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DokterDetail;
