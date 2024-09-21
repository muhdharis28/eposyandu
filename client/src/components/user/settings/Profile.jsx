import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useSidebar } from '../../SideBarContext';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import user from '@/assets/user-avatar.png';
import DataIbu from './DataIbu';
import DataAyah from './DataAyah';
import DataWali from './DataWali';

const Profile = ({ pengguna, isSidebarCollapsed, toggleSidebar }) => {
  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} isCollapsed={isSidebarCollapsed} />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className={`flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out`}>
          <div className="container mx-auto py-10">
            <div className="mt-5 flex space-x-5 px-10">
              {/* Left Side: User Profile Info */}
              <div className="bg-white p-6 rounded-xl shadow-lg w-1/3">
                <div className="flex flex-col items-center">
                  <img src={user} alt="User Avatar" className="w-24 h-24 rounded-full mb-4" />
                  <h2 className="text-xl font-bold">{pengguna.nama}</h2>
                  <p className="text-gray-500">{pengguna.email}</p>

                  <span
                    className={`mt-2 px-4 py-1 rounded-full text-sm ${pengguna.verifikasi
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'}`}>
                    {pengguna.verifikasi ? 'Terverifikasi' : 'Belum Diverifikasi'}
                  </span>
                </div>
              </div>

              {/* Right Side: Tabs for Info, Orangtua, and Wali */}
              <div className="bg-white p-6 rounded-xl shadow-lg w-2/3">
                <Tabs>
                  <TabList>
                    <Tab>Orangtua</Tab>
                    <Tab>Wali</Tab>
                  </TabList>

                  <TabPanel>
                    <DataIbu pengguna={pengguna} />
                    <DataAyah pengguna={pengguna} />
                  </TabPanel>

                  <TabPanel>
                    <DataWali pengguna={pengguna} />
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
