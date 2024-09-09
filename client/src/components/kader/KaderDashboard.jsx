import React from 'react';
import TopBar from './TopBar'; // Assuming TopBar is used similarly in UserDashboard
import SideBar from './SideBar'; // Assuming the SideBar component is reusable
import { useSidebarKader } from './SideBarContext'; // Sidebar context for toggling
import { useNavigate } from 'react-router-dom';

// Main User Dashboard Component
const KaderDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebarKader(); // Access sidebar state and toggler
  const navigate = useNavigate();

  // Retrieve user's data from localStorage
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    // Clear stored data and redirect to login
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="h-screen flex flex-col">
      {/* TopBar with toggle functionality */}
      <TopBar onToggle={toggleSidebar} />

      {/* Main layout with sidebar and content area */}
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6">
          {/* Welcome Section */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-2xl font-bold">Welcome, {userName}!</h2>
            <p className="text-gray-700">Email: {userEmail}</p>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Upcoming Appointments</h2>
              <p className="text-4xl">2</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Reports</h2>
              <p className="text-4xl">7</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Notifications</h2>
              <p className="text-4xl">3</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Health Stats</h2>
              <p className="text-4xl">Normal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KaderDashboard;
