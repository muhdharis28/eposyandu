import React from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import DokterList from './DokterList';
import { useSidebar } from '../../SideBarContext';

const DokterDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" isCollapsed={isSidebarCollapsed} />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div
          className={`flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out`}
        >
          <h1 className="text-3xl font-bold mb-4">Dokter Dashboard</h1>
          <DokterList/>
        </div>
      </div>
    </div>
  );
};

export default DokterDashboard;
