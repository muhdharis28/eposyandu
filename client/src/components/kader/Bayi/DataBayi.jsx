import React, { useState } from 'react';
import TopBar from '../TopBar'; // Ensure the correct path to the TopBar component
import SideBar from '../SideBar'; // Ensure the correct path to the SideBar component
import { useSidebar } from '../../SideBarContext'; // Use sidebar context for collapsible sidebar
import BayiList from './BayiList'; // Component for displaying bayi data
import BayiForm from './BayiForm'; // Form component for adding/editing bayi data
import Modal from '../Modal'; // Modal component for showing the form
import { FaPlus, FaPrint } from 'react-icons/fa';

const DataBayi = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar(); // Sidebar state and toggler
  const [editingBayiId, setEditingBayiId] = useState(null); // State for tracking which bayi is being edited
  const [showForm, setShowForm] = useState(false); // State for showing/hiding the form
  const [bayiData, setBayiData] = useState([
    { id: '1', name: 'Setia Budi', parent: 'Ibu Budi' },
    { id: '2', name: 'Citra Lestari', parent: 'Ibu Citra' },
    { id: '3', name: 'Aris Munandar', parent: 'Ibu Aris' },
  ]); // Sample data

  
  const handleAddBayi = () => {
    setEditingBayiId(null);
    setShowForm(true);
  };

  // Function to handle editing an existing bayi
  const handleEditBayi = (id) => {
    setEditingBayiId(id);
    setShowForm(true);
  };

  // Function to handle deleting a bayi
  const handleDeleteBayi = (id) => {
    setBayiData(bayiData.filter((bayi) => bayi.id !== id));
  };

  // Function to close the form modal
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Function to handle form submission
  const handleFormSubmit = (newBayi) => {
    if (editingBayiId) {
      // Edit existing bayi
      setBayiData(bayiData.map((bayi) => (bayi.id === editingBayiId ? newBayi : bayi)));
    } else {
      // Add new bayi
      setBayiData([...bayiData, { ...newBayi, id: Date.now().toString() }]);
    }
    setShowForm(false);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with sidebar toggle button */}
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        {/* Sidebar with collapsible functionality */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out">
          <h1 className="text-3xl font-bold mb-4">Data Bayi</h1>

          {/* Search and action buttons */}
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Cari Data Bayi"
              className="p-2 border border-gray-300 rounded w-full max-w-xs"
            />
            <div className="flex items-center space-x-2">
              <button className="bg-blue-500 text-white p-2 rounded-full">
                <FaPrint />
              </button>
              <button className="bg-green-500 text-white p-2 rounded-full" onClick={handleAddBayi}>
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Display bayi data */}
          <BayiList
            bayiData={bayiData}
            onEditBayi={handleEditBayi}
            onDeleteBayi={handleDeleteBayi}
          />

          {/* Modal for adding/editing bayi */}
          {showForm && (
            <Modal onClose={handleCloseForm}>
              <BayiForm
                id={editingBayiId}
                bayiData={bayiData}
                onSubmit={handleFormSubmit}
                onClose={handleCloseForm}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataBayi;
