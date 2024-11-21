import React from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import DokumentasiList from './DokumentasiList';
import { useSidebar } from '../../SideBarContext';

const DokumentasiDashboard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" isCollapsed={isSidebarCollapsed} />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div
          className={`flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out`}
        >
          <h1 className="text-3xl font-bold mb-4">Dokumentasi Dashboard</h1>
          <DokumentasiList/>
        </div>
      </div>
    </div>
  );
};

export default DokumentasiDashboard;
