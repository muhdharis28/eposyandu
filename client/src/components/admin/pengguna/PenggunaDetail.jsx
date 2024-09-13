import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPenggunaById } from './PenggunaService'; // Service to fetch pengguna by ID
import TopBar from '../TopBar'; // TopBar component
import SideBar from '../SideBar'; // SideBar component
import { useSidebar } from '../../SideBarContext'; // Sidebar state management
import { Dialog } from 'primereact/dialog'; // PrimeReact Dialog for image zoom

const PenggunaDetail = () => {
  const { id } = useParams(); // Get the ID from URL parameters
  const [pengguna, setPengguna] = useState(null); // State to hold pengguna details
  const [error, setError] = useState(''); // Error handling state
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state management
  const navigate = useNavigate(); // For navigation
  const [zoomedImage, setZoomedImage] = useState(null); // State for zooming in on images

  useEffect(() => {
    loadPenggunaDetail(); // Load pengguna details on component mount
  }, [id]);

  const loadPenggunaDetail = async () => {
    try {
      const result = await getPenggunaById(id); // Fetch pengguna details by ID
      setPengguna(result.data); // Set fetched data to state
    } catch (error) {
      setError('Failed to load pengguna details.'); // Handle errors
      console.error('Failed to load pengguna details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/pengguna'); // Navigate back to the pengguna list
  };

  const handleImageClick = (src) => {
    setZoomedImage(src); // Set the clicked image for zooming
  };

  const handleCloseZoom = () => {
    setZoomedImage(null); // Close the image zoom dialog
  };

  if (error) {
    return <div className="p-6">{error}</div>; // Display error if any
  }

  if (!pengguna) {
    return <div className="p-6">Loading...</div>; // Loading state
  }

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with sidebar toggle */}
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          {/* Breadcrumb navigation */}
          <nav className="text-sm text-gray-600 mb-4">
            <button
              onClick={handleBackToList}
              className="text-blue-500 hover:underline"
            >
              &lt; Kembali ke Daftar Pengguna
            </button>
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Detail Pengguna</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Pengguna Details */}
              <div className="space-y-4 text-gray-700">
                <DetailItem label="Nama" value={pengguna.nama} />
                <DetailItem label="Email" value={pengguna.email} />
                <DetailItem label="Role" value={pengguna.role} />
                <DetailItem label="No. HP" value={pengguna.no_hp} />
                <DetailItem label="No. KK" value={pengguna.no_kk} />
                <DetailItem label="No. KTP" value={pengguna.no_ktp} />
                <DetailItem label="Orang Tua" value={pengguna.orangTuaDetail.nama_ayah} />
                <DetailItem label="Wali" value={pengguna.wali.nama_wali} />
              </div>

              {/* Right Column: Image Previews */}
              <div className="flex flex-col items-center space-y-6">
                <ImagePreview
                  src={pengguna.foto_kk ? `${import.meta.env.VITE_API_URL}${pengguna.foto_kk}` : null}
                  alt="Foto KK"
                  placeholderText="Foto KK not available"
                  onClick={() => handleImageClick(`${import.meta.env.VITE_API_URL}${pengguna.foto_kk}`)}
                />
                {/* Add more images if needed */}
              </div>
            </div>
          </div>

          {/* Image Zoom Dialog */}
          {zoomedImage && (
            <Dialog
              visible={true}
              onHide={handleCloseZoom}
              style={{ width: '50vw' }}
              header="Preview Image"
            >
              <img
                src={encodeURI(zoomedImage)}
                alt="Zoomed Image"
                className="w-full h-full object-cover"
              />
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable component for displaying individual details
const DetailItem = ({ label, value }) => (
  <p className="flex items-center">
    <strong className="w-32 text-gray-600">{label}:</strong>
    <span>{value || '-'}</span>
  </p>
);

// Reusable component for image preview with click-to-zoom functionality
const ImagePreview = ({ src, alt, placeholderText, onClick }) => (
  <div
    className="w-48 h-48 rounded-lg overflow-hidden border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    onClick={src ? onClick : null}
  >
    {src ? (
      <img src={encodeURI(src)} alt={alt} className="object-cover w-full h-full" />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
        {placeholderText}
      </div>
    )}
  </div>
);

export default PenggunaDetail;
