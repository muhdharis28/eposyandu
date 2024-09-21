import React, {useEffect, useState} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {useSidebar} from '../../SideBarContext';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import {getPenggunaById, updatePengguna, updatePenggunaOrtu, updatePenggunaWali} from '../../PenggunaService';
import {updateWali, createWali} from '../../WaliService'; // Import your WaliService
import {updateOrangTua, createOrangTua} from '../../OrangTuaService'; // Import your WaliService
import user from '@/assets/user-avatar.png';
import axios from 'axios';

const Settings = () => {
  const userId = localStorage.getItem('userId');
  const [isLoading,
    setIsLoading] = useState(true);
  const [file,
    setFile] = useState(null);
  const [fotoKKPreview,
    setFotoKKPreview] = useState(null);
  const [uploadedFileUrl,
    setUploadedFileUrl] = useState('');
  const [isPreviewOpen,
    setIsPreviewOpen] = useState(false);
  const [pekerjaanOptions,
    setPekerjaanOptions] = useState([]);
  const [pendidikanOptions,
    setPendidikanOptions] = useState([]);

  // Separate states for user, orangtua, and wali fields
  
  
  const [waliDetails,
    setWaliDetails] = useState({
    id: '',
    nik_wali: '',
    nama_wali: '',
    no_kk: '',
    tempat_lahir_wali: '',
    tanggal_lahir_wali: '',
    jenis_kelamin_wali: '',
    alamat_ktp_wali: '',
    kelurahan_ktp_wali: '',
    kecamatan_ktp_wali: '',
    kota_ktp_wali: '',
    provinsi_ktp_wali: '',
    alamat_domisili_wali: '',
    kelurahan_domisili_wali: '',
    kecamatan_domisili_wali: '',
    kota_domisili_wali: '',
    provinsi_domisili_wali: '',
    no_hp_wali: '',
    email_wali: '',
    pekerjaan_wali: '',
    pendidikan_wali: ''
  });

  const {isSidebarCollapsed, toggleSidebar} = useSidebar();

  useEffect(() => {
    const fetchPengguna = async() => {
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
          email: response.data.email || ''
        });

        if (response.data.orangTuaDetail) {
          setOrangTuaDetails({
            id: response.data.orangTuaDetail.id || '',
            no_kk: response.data.orangTuaDetail.no_kk || '',
            nik_ibu: response.data.orangTuaDetail.nik_ibu || '',
            nama_ibu: response.data.orangTuaDetail.nama_ibu || '',
            tempat_lahir_ibu: response.data.orangTuaDetail.tempat_lahir_ibu || '',
            tanggal_lahir_ibu: response.data.orangTuaDetail.tanggal_lahir_ibu || '',
            jenis_kelamin_ibu: response.data.orangTuaDetail.jenis_kelamin_ibu || '',
            alamat_ktp_ibu: response.data.orangTuaDetail.alamat_ktp_ibu || '',
            kelurahan_ktp_ibu: response.data.orangTuaDetail.kelurahan_ktp_ibu || '',
            kecamatan_ktp_ibu: response.data.orangTuaDetail.kecamatan_ktp_ibu || '',
            kota_ktp_ibu: response.data.orangTuaDetail.kota_ktp_ibu || '',
            provinsi_ktp_ibu: response.data.orangTuaDetail.provinsi_ktp_ibu || '',
            alamat_domisili_ibu: response.data.orangTuaDetail.alamat_domisili_ibu || '',
            kelurahan_domisili_ibu: response.data.orangTuaDetail.kelurahan_domisili_ibu || '',
            kecamatan_domisili_ibu: response.data.orangTuaDetail.kecamatan_domisili_ibu || '',
            kota_domisili_ibu: response.data.orangTuaDetail.kota_domisili_ibu || '',
            provinsi_domisili_ibu: response.data.orangTuaDetail.provinsi_domisili_ibu || '',
            no_hp_ibu: response.data.orangTuaDetail.no_hp_ibu || '',
            email_ibu: response.data.orangTuaDetail.email_ibu || '',
            pekerjaan_ibu: response.data.orangTuaDetail.pekerjaan_ibu || '',
            pendidikan_ibu: response.data.orangTuaDetail.pendidikan_ibu || '',
            nik_ayah: response.data.orangTuaDetail.nik_ayah || '',
            nama_ayah: response.data.orangTuaDetail.nama_ayah || '',
            tempat_lahir_ayah: response.data.orangTuaDetail.tempat_lahir_ayah || '',
            tanggal_lahir_ayah: response.data.orangTuaDetail.tanggal_lahir_ayah || '',
            jenis_kelamin_ayah: response.data.orangTuaDetail.jenis_kelamin_ayah || '',
            alamat_ktp_ayah: response.data.orangTuaDetail.alamat_ktp_ayah || '',
            kelurahan_ktp_ayah: response.data.orangTuaDetail.kelurahan_ktp_ayah || '',
            kecamatan_ktp_ayah: response.data.orangTuaDetail.kecamatan_ktp_ayah || '',
            kota_ktp_ayah: response.data.orangTuaDetail.kota_ktp_ayah || '',
            provinsi_ktp_ayah: response.data.orangTuaDetail.provinsi_ktp_ayah || '',
            alamat_domisili_ayah: response.data.orangTuaDetail.alamat_domisili_ayah || '',
            kelurahan_domisili_ayah: response.data.orangTuaDetail.kelurahan_domisili_ayah || '',
            kecamatan_domisili_ayah: response.data.orangTuaDetail.kecamatan_domisili_ayah || '',
            kota_domisili_ayah: response.data.orangTuaDetail.kota_domisili_ayah || '',
            provinsi_domisili_ayah: response.data.orangTuaDetail.provinsi_domisili_ayah || '',
            no_hp_ayah: response.data.orangTuaDetail.no_hp_ayah || '',
            email_ayah: response.data.orangTuaDetail.email_ayah || '',
            pekerjaan_ayah: response.data.orangTuaDetail.pekerjaan_ayah || '',
            pendidikan_ayah: response.data.orangTuaDetail.pendidikan_ayah || ''
          });
        }

        if (response.data.waliDetail) {
          setWaliDetails({
            id: response.data.waliDetail.id || '',
            no_kk: response.data.waliDetail.no_kk || '',
            nik_wali: response.data.waliDetail.nik_wali || '',
            nama_wali: response.data.waliDetail.nama_wali || '',
            tempat_lahir_wali: response.data.waliDetail.tempat_lahir_wali || '',
            tanggal_lahir_wali: response.data.waliDetail.tanggal_lahir_wali || '',
            jenis_kelamin_wali: response.data.waliDetail.jenis_kelamin_wali || '',
            alamat_ktp_wali: response.data.waliDetail.alamat_ktp_wali || '',
            kelurahan_ktp_wali: response.data.waliDetail.kelurahan_ktp_wali || '',
            kecamatan_ktp_wali: response.data.waliDetail.kecamatan_ktp_wali || '',
            kota_ktp_wali: response.data.waliDetail.kota_ktp_wali || '',
            provinsi_ktp_wali: response.data.waliDetail.provinsi_ktp_wali || '',
            alamat_domisili_wali: response.data.waliDetail.alamat_domisili_wali || '',
            kelurahan_domisili_wali: response.data.waliDetail.kelurahan_domisili_wali || '',
            kecamatan_domisili_wali: response.data.waliDetail.kecamatan_domisili_wali || '',
            kota_domisili_wali: response.data.waliDetail.kota_domisili_wali || '',
            provinsi_domisili_wali: response.data.waliDetail.provinsi_domisili_wali || '',
            no_hp_wali: response.data.waliDetail.no_hp_wali || '',
            email_wali: response.data.waliDetail.email_wali || '',
            pekerjaan_wali: response.data.waliDetail.pekerjaan_wali || '',
            pendidikan_wali: response.data.waliDetail.pendidikan_wali || ''
          });
        }
      } catch (error) {
        console.error('Error fetching pengguna:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPengguna();
  }, [userId]);

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

  const [errorsWali,
    setErrorsWali] = useState({});

  const validateFormWali = () => {
    let formErrors = {};

    if (!waliDetails.nik_wali) {
      formErrors.nik_wali = 'NIK Wali is required';
    } else if (!/^\d{16}$/.test(waliDetails.nik_wali)) {
      formErrors.nik_wali = 'NIK Wali must be 16 digits';
    }

    if (!waliDetails.nama_wali) {
      formErrors.nama_wali = 'Nama Wali is required';
    }

    if (!waliDetails.tempat_lahir_wali) {
      formErrors.tempat_lahir_wali = 'Tempat Lahir Wali is required';
    }

    if (!waliDetails.tanggal_lahir_wali) {
      formErrors.tanggal_lahir_wali = 'Tanggal Lahir Wali is required';
    }

    if (!waliDetails.email_wali) {
      formErrors.email_wali = 'Email Wali is required';
    } else if (!/\S+@\S+\.\S+/.test(waliDetails.email_wali)) {
      formErrors.email_wali = 'Email Wali is invalid';
    }

    if (!waliDetails.no_hp_wali) {
      formErrors.no_hp_wali = 'No HP Wali is required';
    } else if (!/^\d+$/.test(waliDetails.no_hp_wali)) {
      formErrors.no_hp_wali = 'No HP Wali must be a valid number';
    }

    if (!waliDetails.alamat_ktp_wali) {
      formErrors.alamat_ktp_wali = 'Alamat KTP Wali is required';
    }

    if (!waliDetails.kelurahan_ktp_wali) {
      formErrors.kelurahan_ktp_wali = 'Kelurahan KTP Wali is required';
    }

    if (!waliDetails.kecamatan_ktp_wali) {
      formErrors.kecamatan_ktp_wali = 'Kecamatan KTP Wali is required';
    }

    if (!waliDetails.kota_ktp_wali) {
      formErrors.kota_ktp_wali = 'Kota KTP Wali is required';
    }

    if (!waliDetails.provinsi_ktp_wali) {
      formErrors.provinsi_ktp_wali = 'Provinsi KTP Wali is required';
    }

    if (!waliDetails.alamat_domisili_wali) {
      formErrors.alamat_domisili_wali = 'Alamat Domisili Wali is required';
    }

    if (!waliDetails.kelurahan_domisili_wali) {
      formErrors.kelurahan_domisili_wali = 'Kelurahan Domisili Wali is required';
    }

    if (!waliDetails.kecamatan_domisili_wali) {
      formErrors.kecamatan_domisili_wali = 'Kecamatan Domisili Wali is required';
    }

    if (!waliDetails.kota_domisili_wali) {
      formErrors.kota_domisili_wali = 'Kota Domisili Wali is required';
    }

    if (!waliDetails.provinsi_domisili_wali) {
      formErrors.provinsi_domisili_wali = 'Provinsi Domisili Wali is required';
    }

    if (!waliDetails.pekerjaan_wali) {
      formErrors.pekerjaan_wali = 'Pekerjaan Wali is required';
    }

    if (!waliDetails.pendidikan_wali) {
      formErrors.pendidikan_wali = 'Pendidikan Wali is required';
    }

    setErrorsWali(formErrors);
    return Object
      .keys(formErrors)
      .length === 0;
  };

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

  const uploadFile = async() => {
    if (!file) 
      return null;
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

  const handleUpdateUser = async() => {
    try {
      const uploadedFilePath = await uploadFile();
      if (uploadedFilePath) {
        userDetails.foto_kk = uploadedFilePath;
      }
      console.log(userDetails)
      await updatePengguna(userId, userDetails);
      alert('User details updated successfully.');
    } catch (error) {
      alert('Error updating user details.');
    }
  };

  const handleUpdateOrangtua = async(id) => {
    console.log(orangTuaDetails)
    if (!validateForm()) {
      return; // If validation fails, stop execution
    }
    try {
      if(id){
        await updateOrangTua(id, orangTuaDetails);  
      } else {
        
        const orangtua = await createOrangTua(orangTuaDetails);
        console.log('createeee', orangtua)
        await updatePenggunaOrtu(userId, {orangtua: orangtua.data.id});
      }
      
      alert('Orangtua details updated successfully.');
    } catch (error) {
      alert('Error updating user details.');
    }
  };

  const handleUpdateWali = async(id) => {
    if (!validateFormWali()) {
      return; // If validation fails, stop execution
    }
    try {
      if(id){
        await updateWali(id, waliDetails);
      } else {
        const wali = await createWali(waliDetails);

        await updatePenggunaWali(userId, {wali: wali.data.id});
      }
      
      alert('Wali details updated successfully.');
    } catch (error) {
      alert('Error updating wali details.');
    }
  };

  if (isLoading) 
    return <div>Loading...</div>;
  
  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} isCollapsed={isSidebarCollapsed}/>

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed}/>

        <div
          className={`flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out`}>
          <div className="container mx-auto py-10">
            <div className="mt-5 flex space-x-5 px-10">
              {/* Left Side: User Profile Info */}
              <div className="bg-white p-6 rounded-xl shadow-lg w-1/3">
                <div className="flex flex-col items-center">
                  <img src={user} alt="User Avatar" className="w-24 h-24 rounded-full mb-4"/>
                  <h2 className="text-xl font-bold">{pengguna.nama}</h2>
                  <p className="text-gray-500">{pengguna.email}</p>

                  <span
                    className={`mt-2 px-4 py-1 rounded-full text-sm ${pengguna.verifikasi
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'}`}>
                    {pengguna.verifikasi
                      ? 'Terverifikasi'
                      : 'Belum Diverifikasi'}
                  </span>
                </div>

                {/* Account (Akun) Fields */}
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold">NIK</label>
                    <input
                      type="text"
                      value={userDetails.no_ktp}
                      onChange={(e) => setUserDetails({
                      ...userDetails,
                      no_ktp: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">No Kartu Keluarga</label>
                    <input
                      type="text"
                      value={userDetails.no_kk}
                      onChange={(e) => setUserDetails({
                      ...userDetails,
                      no_kk: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Nama</label>
                    <input
                      type="text"
                      value={userDetails.nama}
                      onChange={(e) => setUserDetails({
                      ...userDetails,
                      nama: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">No Handphone</label>
                    <input
                      type="text"
                      value={userDetails.no_hp}
                      onChange={(e) => setUserDetails({
                      ...userDetails,
                      no_hp: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Email</label>
                    <input
                      type="text"
                      value={userDetails.email}
                      onChange={(e) => setUserDetails({
                      ...userDetails,
                      email: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Foto KK</label>
                    <input
                      type="file"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      onChange={handleFileChange}
                      accept="image/*"/> {(fotoKKPreview || uploadedFileUrl) && (
                      <div className="mt-4">
                        <img
                          src={fotoKKPreview || uploadedFileUrl}
                          alt="Foto KK Preview"
                          className="w-40 h-auto rounded-md shadow-md"
                          onClick={handlePreviewClick}/>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleUpdateUser}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Update User
                  </button>

                  {isPreviewOpen && (
                    <div
                      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                      <div className="relative">
                        <button
                          className="absolute top-2 right-2 text-white text-2xl"
                          onClick={handleClosePreview}>
                          &times;
                        </button>
                        <img
                          src={fotoKKPreview || uploadedFileUrl}
                          alt="Full Preview"
                          className="max-w-full max-h-screen"/>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Tabs for Info, Orangtua, and Wali */}
              <div className="bg-white p-6 rounded-xl shadow-lg w-2/3">
                <Tabs>
                  <TabList>
                    <Tab>Orangtua</Tab>
                    <Tab>Wali</Tab>
                  </TabList>

                  {/* Orangtua Tab */}
                  <TabPanel>
                    
                  </TabPanel>

                  {/* Wali Tab */}
                  <TabPanel>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-sm font-semibold">No KK</label>
                        <input
                          type="text"
                          name="no_kk"
                          value={waliDetails.no_kk}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          no_kk: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">NIK Wali</label>
                        <input
                          type="text"
                          name="nik_wali"
                          value={waliDetails.nik_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          nik_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-sm font-semibold">Nama Wali</label>
                        <input
                          type="text"
                          name="nama_wali"
                          value={waliDetails.nama_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          nama_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Tempat Lahir Wali</label>
                        <input
                          type="text"
                          name="tempat_lahir_wali"
                          value={waliDetails.tempat_lahir_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          tempat_lahir_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-sm font-semibold">Tanggal Lahir Wali</label>
                        <input
                          type="date"
                          name="tanggal_lahir_wali"
                          value={waliDetails.tanggal_lahir_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          tanggal_lahir_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Jenis Kelamin Wali</label>
                        <select
                          name="jenis_kelamin_wali"
                          className="w-full p-2 border border-gray-300 rounded"
                          value={waliDetails.jenis_kelamin_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          jenis_kelamin_wali: e.target.value
                        })}
                          required>
                          <option value="">Pilih</option>
                          <option value="l">Laki-laki</option>
                          <option value="p">Perempuan</option>
                        </select>
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-sm font-semibold">Alamat KTP Wali</label>
                        <input
                          type="text"
                          name="alamat_ktp_wali"
                          value={waliDetails.alamat_ktp_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          alamat_ktp_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Kelurahan KTP Wali</label>
                        <input
                          type="text"
                          name="kelurahan_ktp_wali"
                          value={waliDetails.kelurahan_ktp_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          kelurahan_ktp_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-sm font-semibold">Kecamatan KTP Wali</label>
                        <input
                          type="text"
                          name="kecamatan_ktp_wali"
                          value={waliDetails.kecamatan_ktp_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          kecamatan_ktp_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Kota KTP Wali</label>
                        <input
                          type="text"
                          name="kota_ktp_wali"
                          value={waliDetails.kota_ktp_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          kota_ktp_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-sm font-semibold">Provinsi KTP Wali</label>
                        <input
                          type="text"
                          name="provinsi_ktp_wali"
                          value={waliDetails.provinsi_ktp_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          provinsi_ktp_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Alamat Domisili Wali</label>
                        <input
                          type="text"
                          name="alamat_domisili_wali"
                          value={waliDetails.alamat_domisili_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          alamat_domisili_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-sm font-semibold">Kelurahan Domisili Wali</label>
                        <input
                          type="text"
                          name="kelurahan_domisili_wali"
                          value={waliDetails.kelurahan_domisili_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          kelurahan_domisili_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Kecamatan Domisili Wali</label>
                        <input
                          type="text"
                          name="kecamatan_domisili_wali"
                          value={waliDetails.kecamatan_domisili_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          kecamatan_domisili_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-sm font-semibold">Kota Domisili Wali</label>
                        <input
                          type="text"
                          name="kota_domisili_wali"
                          value={waliDetails.kota_domisili_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          kota_domisili_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Provinsi Domisili Wali</label>
                        <input
                          type="text"
                          name="provinsi_domisili_wali"
                          value={waliDetails.provinsi_domisili_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          provinsi_domisili_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-sm font-semibold">No Handphone Wali</label>
                        <input
                          type="text"
                          name="no_hp_wali"
                          value={waliDetails.no_hp_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          no_hp_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Email Wali</label>
                        <input
                          type="text"
                          name="email_wali"
                          value={waliDetails.email_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          email_wali: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-gray-700">Pekerjaan Wali</label>
                        <select
                          name="pekerjaan_wali"
                          value={waliDetails.pekerjaan_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          pekerjaan_wali: e.target.value
                        })}
                          className="w-full p-2 border border-gray-300 rounded">
                          <option value="">Pilih Pekerjaan Wali</option>
                          {pekerjaanOptions.map((pekerjaan) => (
                            <option key={pekerjaan.id} value={pekerjaan.id}>
                              {pekerjaan.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Pendidikan Wali</label>
                        <select
                          name="pendidikan_wali"
                          value={waliDetails.pendidikan_wali}
                          onChange={(e) => setWaliDetails({
                          ...waliDetails,
                          pendidikan_wali: e.target.value
                        })}
                          className="w-full p-2 border border-gray-300 rounded">
                          <option value="">Pilih Pendidikan Wali</option>
                          {pendidikanOptions.map((pendidikan) => (
                            <option key={pendidikan.id} value={pendidikan.id}>
                              {pendidikan.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpdateWali(waliDetails.id)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                      Update Wali
                    </button>
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
