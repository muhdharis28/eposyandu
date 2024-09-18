import React, { useState, useEffect } from 'react';
import TopBar from '../TopBar'; // Adjust the path if necessary
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext'; // Import the sidebar context
import { createDoctor, updateDoctor, getDoctorById } from '../../DokterService';
import { useNavigate, useParams } from 'react-router-dom'; // Replace useHistory with useNavigate

const DokterForm = () => {
  const { id } = useParams();
  const [nama, setNama] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Use context for sidebar state
  const navigate = useNavigate(); // For breadcrumb navigation

  useEffect(() => {
    if (id) {
      loadDoctor(); // Load doctor data if an ID is provided (for editing)
    }
  }, [id]);

  const loadDoctor = async () => {
    try {
      const result = await getDoctorById(id); // Fetch the doctor data by ID
      setNama(result.data.nama); // Set the name of the doctor in the form input
    } catch (error) {
      console.error('Failed to load doctor data:', error);
    }
  };

  const isUserAuthorized = () => {
    const userRole = localStorage.getItem('role'); // Assuming roles are stored in local storage
    return userRole === 'admin'; // Only admin can edit or add doctors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserAuthorized()) {
      alert('You are not authorized to perform this action.');
      return; // Prevent submission if user is not authorized
    }

    const doctor = { nama };
    try {
      if (id) {
        await updateDoctor(id, doctor); // Update doctor if an ID is provided
      } else {
        await createDoctor(doctor); // Create a new doctor if no ID is provided
      }
      
      setNama(''); // Reset form fields after submission
      navigate('/dokter'); // Navigate back to doctor list after form submission
    } catch (error) {
      console.error('Error submitting doctor data:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/dokter'); // Navigate back to the list
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
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Dokter
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Dokter' : 'Tambah Dokter'}</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Nama Dokter</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-500 px-4 py-2 rounded"
              >
                {id ? 'Update' : 'Tambah'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DokterForm;
