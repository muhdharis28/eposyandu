import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPendidikanById } from './PendidikanService'; // API service to get pendidikan by ID
import TopBar from '../TopBar'; // Adjust the path to your TopBar component
import SideBar from '../SideBar'; // Adjust the path to your SideBar component
import { useSidebar } from '../../SideBarContext'; // Sidebar context for state management

const PendidikanDetail = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [pendidikan, setPendidikan] = useState(null); // State to hold pendidikan details
  const [error, setError] = useState(''); // State for handling errors
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state
  const navigate = useNavigate(); // Navigation function

  useEffect(() => {
    loadPendidikanDetail(); // Load pendidikan details on component mount
  }, [id]);

  const loadPendidikanDetail = async () => {
    try {
      const result = await getPendidikanById(id); // Fetch pendidikan details from API
      setPendidikan(result.data); // Set pendidikan data to state
    } catch (error) {
      setError('Failed to load pendidikan details.'); // Handle errors
      console.error('Failed to load pendidikan details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/pendidikan'); // Navigate back to the list page
  };

  if (error) {
    return <div className="p-6">{error}</div>; // Display error if there's an issue
  }

  if (!pendidikan) {
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
              &lt; Kembali ke Daftar Pendidikan
            </button>
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Detail Pendidikan</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="col-span-1">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Nama Pendidikan</h3>
                  <p className="text-gray-600">{pendidikan.nama}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendidikanDetail;
