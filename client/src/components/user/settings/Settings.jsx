// Settings.js
import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useSidebar } from '../../SideBarContext';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import Profile from './Profile';
import DataOrtu from './DataOrtu';
import DataWali from './DataWali';
import axios from 'axios';

const Settings = () => {

  const [pekerjaanOptions,
    setPekerjaanOptions] = useState([]);
  const [pendidikanOptions,
    setPendidikanOptions] = useState([]);

  // Separate states for user, orangtua, and wali fields

  const {isSidebarCollapsed, toggleSidebar} = useSidebar();

  useEffect(() => {
    const fetchPekerjaan = async() => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pekerjaan`); // Adjust the API path as needed
        setPekerjaanOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch Pekerjaan data:', error);
      }
    };

    const fetchPendidikan = async() => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pendidikan`); // Adjust the API path as needed
        setPendidikanOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch Pendidikan data:', error);
      }
    };

    fetchPekerjaan();
    fetchPendidikan();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} isCollapsed={isSidebarCollapsed} />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className={`flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out`}>
          <div className="container mx-auto py-10">
            <div className="mt-5 flex space-x-5 px-10">
              <Profile/>

              <div className="bg-white p-6 rounded-xl shadow-lg w-2/3">
                <Tabs>
                  <TabList>
                    <Tab>Orangtua</Tab>
                    <Tab>Wali</Tab>
                  </TabList>

                  <TabPanel>
                    <DataOrtu
                      pekerjaanOptions={pekerjaanOptions}
                      pendidikanOptions={pendidikanOptions}
                    />
                  </TabPanel>

                  <TabPanel>
                    <DataWali
                      pekerjaanOptions={pekerjaanOptions}
                      pendidikanOptions={pendidikanOptions}
                    />
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

export default Settings;
