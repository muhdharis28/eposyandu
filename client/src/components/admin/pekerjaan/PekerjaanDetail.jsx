import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from './PekerjaanService'; // API service to get pekerjaan by ID
import TopBar from '../TopBar'; // Adjust the path to your TopBar component
import SideBar from '../SideBar'; // Adjust the path to your SideBar component
import { useSidebar } from '../../SideBarContext'; // Sidebar context for state management

const PekerjaanDetail = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [pekerjaan, setPekerjaan] = useState(null); // State to hold pekerjaan details
  const [error, setError] = useState(''); // State for handling errors
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state
  const navigate = useNavigate(); // Navigation function

  useEffect(() => {
    loadPekerjaanDetail(); // Load pekerjaan details on component mount
  }, [id]);

  const loadPekerjaanDetail = async () => {
    try {
      const result = await getJobById(id); // Fetch pekerjaan details from API
      setPekerjaan(result.data); // Set pekerjaan data to state
    } catch (error) {
      setError('Failed to load pekerjaan details.'); // Handle errors
      console.error('Failed to load pekerjaan details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/pekerjaan'); // Navigate back to the list page
  };

  if (error) {
    return <div className="p-6">{error}</div>; // Display error if there's an issue
  }

  if (!pekerjaan) {
    return <div className="p-6">Loading...</div>; // Display loading state
  }

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with toggle button for sidebar */}
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar with collapsible functionality */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          {/* Breadcrumb navigation */}
          <nav className="text-sm text-gray-600 mb-4">
            <button
              onClick={handleBackToList}
              className="text-blue-500 hover:underline"
            >
              &lt; Kembali ke Daftar Pekerjaan
            </button>
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Detail Pekerjaan</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="col-span-1">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Nama Pekerjaan</h3>
                  <p className="text-gray-600">{pekerjaan.nama}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PekerjaanDetail;
