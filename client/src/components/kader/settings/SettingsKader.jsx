import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useSidebar } from '../../SideBarContext';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { getPenggunaById, updatePengguna } from '../../PenggunaService';
import user from '@/assets/user-avatar.png';
import axios from 'axios';

const SettingsKader = () => {
  const userId = localStorage.getItem('userId');
  const [pengguna, setPengguna] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [fotoKKPreview, setFotoKKPreview] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const [userDetails, setUserDetails] = useState({
    no_ktp: '',
    no_kk: '',
    nama: '',
    no_hp: '',
    foto_kk: '',
    email: '',
  });

  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  useEffect(() => {
    const fetchPengguna = async () => {
      try {
        const response = await getPenggunaById(userId);
        setUploadedFileUrl(`${import.meta.env.VITE_API_URL}${response.data.foto_kk}`);
        setPengguna(response.data);

        // Initialize form fields with fetched data
        setUserDetails({
          no_ktp: response.data.no_ktp || '',
          nama: response.data.nama || '',
          no_hp: response.data.no_hp || '',
          no_kk: response.data.no_kk || '',
          email: response.data.email || '',
        });
      } catch (error) {
        console.error('Error fetching pengguna:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPengguna();
  }, [userId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a preview URL for the selected file
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setFotoKKPreview(previewUrl);
    }
  };

  const handlePreviewClick = () => {
    setIsPreviewOpen(true);
  };

  const uploadFile = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData);
      const filePath = `/uploads/${response.data.fileName}`;
      setUploadedFileUrl(`${import.meta.env.VITE_API_URL}${filePath}`);
      return filePath;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleUpdateUser = async () => {
    try {
      const uploadedFilePath = await uploadFile();
      if (uploadedFilePath) {
        userDetails.foto_kk = uploadedFilePath;
      }
      await updatePengguna(userId, userDetails);
      alert('User details updated successfully.');
    } catch (error) {
      alert('Error updating user details.');
    }
  };

  if (isLoading) return <div>Loading...</div>;

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
                    className={`mt-2 px-4 py-1 rounded-full text-sm ${
                      pengguna.verifikasi
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {pengguna.verifikasi ? 'Terverifikasi' : 'Belum Diverifikasi'}
                  </span>
                </div>
              </div>

              {/* Right Side: Tabs for Form Fields */}
              <div className="bg-white p-6 rounded-xl shadow-lg w-2/3">
                <Tabs>
                  <TabList>
                    <Tab>Data Pengguna</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold">NIK</label>
                        <input
                          type="text"
                          value={userDetails.no_ktp}
                          onChange={(e) => setUserDetails({ ...userDetails, no_ktp: e.target.value })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">No Kartu Keluarga</label>
                        <input
                          type="text"
                          value={userDetails.no_kk}
                          onChange={(e) => setUserDetails({ ...userDetails, no_kk: e.target.value })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Nama</label>
                        <input
                          type="text"
                          value={userDetails.nama}
                          onChange={(e) => setUserDetails({ ...userDetails, nama: e.target.value })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">No Handphone</label>
                        <input
                          type="text"
                          value={userDetails.no_hp}
                          onChange={(e) => setUserDetails({ ...userDetails, no_hp: e.target.value })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Email</label>
                        <input
                          type="text"
                          value={userDetails.email}
                          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Foto KK</label>
                        <input
                          type="file"
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                        {(fotoKKPreview || uploadedFileUrl) && (
                          <div className="mt-4">
                            <img
                              src={fotoKKPreview || uploadedFileUrl}
                              alt="Foto KK Preview"
                              className="w-40 h-auto rounded-md shadow-md"
                              onClick={handlePreviewClick}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleUpdateUser}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Update User
                    </button>
                  </TabPanel>
                </Tabs>

                {isPreviewOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="relative">
                      <button className="absolute top-2 right-2 text-white text-2xl" onClick={handleClosePreview}>
                        &times;
                      </button>
                      <img src={fotoKKPreview || uploadedFileUrl} alt="Full Preview" className="max-w-full max-h-screen" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsKader;