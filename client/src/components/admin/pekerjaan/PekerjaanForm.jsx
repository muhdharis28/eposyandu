import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and URL parameters
import { createJob, updateJob, getJobById } from './PekerjaanService'; // API services
import TopBar from '../TopBar'; // Adjust the path as necessary
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext'; // Sidebar context for state management

const PekerjaanForm = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [nama, setNama] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state

  useEffect(() => {
    if (id) {
      loadJob(); // Load job data if editing
    }
  }, [id]);

  const loadJob = async () => {
    try {
      const result = await getJobById(id); // Fetch job data by ID
      const job = result.data;
      setNama(job.nama);
    } catch (error) {
      setError('Failed to load job data.');
      console.error('Failed to load job data:', error);
    }
  };

  const isUserAuthorized = () => {
    const userRole = localStorage.getItem('role'); // Assuming roles are stored in local storage
    return userRole === 'admin'; // Only admin can edit or add jobs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserAuthorized()) {
      alert('You are not authorized to perform this action.');
      return; // Prevent submission
    }

    const job = { nama };

    try {
      if (id) {
        await updateJob(id, job); // Update job if editing
      } else {
        await createJob(job); // Create new job if no ID is provided
      }

      navigate('/pekerjaan'); // Navigate back to job list
    } catch (error) {
      setError('Failed to save job data.');
      console.error('Error saving job:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/pekerjaan'); // Navigate back to the list
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Pekerjaan
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Pekerjaan' : 'Tambah Pekerjaan'}</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Nama Pekerjaan</label>
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
              <button
                type="button"
                onClick={handleBackToList}
                className="text-gray-700 px-4 py-2 ml-4 rounded"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PekerjaanForm;
