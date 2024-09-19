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
  const [pengguna,
    setPengguna] = useState(null);
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
  const [userDetails,
    setUserDetails] = useState({
    no_ktp: '',
    no_kk: '',
    nama: '',
    no_hp: '',
    foto_kk: '',
    email: ''
  });
  const [orangTuaDetails,
    setOrangTuaDetails] = useState({
    id: '',
    no_kk: '',
    nik_ibu: '',
    nama_ibu: '',
    tempat_lahir_ibu: '',
    tanggal_lahir_ibu: '',
    jenis_kelamin_ibu: '',
    alamat_ktp_ibu: '',
    kelurahan_ktp_ibu: '',
    kecamatan_ktp_ibu: '',
    kota_ktp_ibu: '',
    provinsi_ktp_ibu: '',
    alamat_domisili_ibu: '',
    kelurahan_domisili_ibu: '',
    kecamatan_domisili_ibu: '',
    kota_domisili_ibu: '',
    provinsi_domisili_ibu: '',
    no_hp_ibu: '',
    email_ibu: '',
    pekerjaan_ibu: '',
    pendidikan_ibu: '',
    nik_ayah: '',
    nama_ayah: '',
    tempat_lahir_ayah: '',
    tanggal_lahir_ayah: '',
    jenis_kelamin_ayah: '',
    alamat_ktp_ayah: '',
    kelurahan_ktp_ayah: '',
    kecamatan_ktp_ayah: '',
    kota_ktp_ayah: '',
    provinsi_ktp_ayah: '',
    alamat_domisili_ayah: '',
    kelurahan_domisili_ayah: '',
    kecamatan_domisili_ayah: '',
    kota_domisili_ayah: '',
    provinsi_domisili_ayah: '',
    no_hp_ayah: '',
    email_ayah: '',
    pekerjaan_ayah: '',
    pendidikan_ayah: ''
  });
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
  const [errors,
    setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!orangTuaDetails.no_kk) {
      formErrors.no_kk = 'No KK is required';
    } else if (!/^\d{16}$/.test(orangTuaDetails.no_kk)) {
      formErrors.no_kk = 'No KK must be 16 digits';
    }

    if (!orangTuaDetails.nik_ibu) {
      formErrors.nik_ibu = 'NIK Ibu is required';
    } else if (!/^\d{16}$/.test(orangTuaDetails.nik_ibu)) {
      formErrors.nik_ibu = 'NIK Wali must be 16 digits';
    }

    if (!orangTuaDetails.nama_ibu) {
      formErrors.nama_ibu = 'Nama Ibu is required';
    }

    if (!orangTuaDetails.tempat_lahir_ibu) {
      formErrors.tempat_lahir_ibu = 'Tempat Lahir Ibu is required';
    }

    if (!orangTuaDetails.tanggal_lahir_ibu) {
      formErrors.tanggal_lahir_ibu = 'Tanggal Lahir Ibu is required';
    }

    if (!orangTuaDetails.email_ibu) {
      formErrors.email_ibu = 'Email Ibu is required';
    } else if (!/\S+@\S+\.\S+/.test(orangTuaDetails.email_ibu)) {
      formErrors.email_ibu = 'Email Ibu is invalid';
    }

    if (!orangTuaDetails.no_hp_ibu) {
      formErrors.no_hp_ibu = 'No HP Ibu is required';
    } else if (!/^\d+$/.test(orangTuaDetails.no_hp_ibu)) {
      formErrors.no_hp_ibu = 'No HP Wali must be a valid number';
    }

    if (!orangTuaDetails.alamat_ktp_ibu) {
      formErrors.alamat_ktp_ibu = 'Alamat KTP Ibu is required';
    }

    if (!orangTuaDetails.kelurahan_ktp_ibu) {
      formErrors.kelurahan_ktp_ibu = 'Kelurahan KTP Ibu is required';
    }

    if (!orangTuaDetails.kecamatan_ktp_ibu) {
      formErrors.kecamatan_ktp_ibu = 'Kecamatan KTP Ibu is required';
    }

    if (!orangTuaDetails.kota_ktp_ibu) {
      formErrors.kota_ktp_ibu = 'Kota KTP Ibu is required';
    }

    if (!orangTuaDetails.provinsi_ktp_ibu) {
      formErrors.provinsi_ktp_ibu = 'Provinsi KTP Ibu is required';
    }

    if (!orangTuaDetails.alamat_domisili_ibu) {
      formErrors.alamat_domisili_ibu = 'Alamat Domisili Ibu is required';
    }

    if (!orangTuaDetails.kelurahan_domisili_ibu) {
      formErrors.kelurahan_domisili_ibu = 'Kelurahan Domisili Ibu is required';
    }

    if (!orangTuaDetails.kecamatan_domisili_ibu) {
      formErrors.kecamatan_domisili_ibu = 'Kecamatan Domisili Ibu is required';
    }

    if (!orangTuaDetails.kota_domisili_ibu) {
      formErrors.kota_domisili_ibu = 'Kota Domisili Ibu is required';
    }

    if (!orangTuaDetails.provinsi_domisili_ibu) {
      formErrors.provinsi_domisili_ibu = 'Provinsi Domisili Ibu is required';
    }

    if (!orangTuaDetails.pekerjaan_ibu) {
      formErrors.pekerjaan_ibu = 'Pekerjaan Ibu is required';
    }

    if (!orangTuaDetails.pendidikan_ibu) {
      formErrors.pendidikan_ibu = 'Pendidikan Ibu is required';
    }

    // ------------------

    if (!orangTuaDetails.nik_ayah) {
      formErrors.nik_ayah = 'NIK Ayah is required';
    } else if (!/^\d{16}$/.test(orangTuaDetails.nik_ayah)) {
      formErrors.nik_ayah = 'NIK Wali must be 16 digits';
    }

    if (!orangTuaDetails.nama_ayah) {
      formErrors.nama_ayah = 'Nama Ayah is required';
    }

    if (!orangTuaDetails.tempat_lahir_ayah) {
      formErrors.tempat_lahir_ayah = 'Tempat Lahir Ayah is required';
    }

    if (!orangTuaDetails.tanggal_lahir_ayah) {
      formErrors.tanggal_lahir_ayah = 'Tanggal Lahir Ayah is required';
    }

    if (!orangTuaDetails.email_ayah) {
      formErrors.email_ayah = 'Email Ayah is required';
    } else if (!/\S+@\S+\.\S+/.test(orangTuaDetails.email_ayah)) {
      formErrors.email_ayah = 'Email Ayah is invalid';
    }

    if (!orangTuaDetails.no_hp_ayah) {
      formErrors.no_hp_ayah = 'No HP Ayah is required';
    } else if (!/^\d+$/.test(orangTuaDetails.no_hp_ayah)) {
      formErrors.no_hp_ayah = 'No HP Wali must be a valid number';
    }

    if (!orangTuaDetails.alamat_ktp_ayah) {
      formErrors.alamat_ktp_ayah = 'Alamat KTP Ayah is required';
    }

    if (!orangTuaDetails.kelurahan_ktp_ayah) {
      formErrors.kelurahan_ktp_ayah = 'Kelurahan KTP Ayah is required';
    }

    if (!orangTuaDetails.kecamatan_ktp_ayah) {
      formErrors.kecamatan_ktp_ayah = 'Kecamatan KTP Ayah is required';
    }

    if (!orangTuaDetails.kota_ktp_ayah) {
      formErrors.kota_ktp_ayah = 'Kota KTP Ayah is required';
    }

    if (!orangTuaDetails.provinsi_ktp_ayah) {
      formErrors.provinsi_ktp_ayah = 'Provinsi KTP Ayah is required';
    }

    if (!orangTuaDetails.alamat_domisili_ayah) {
      formErrors.alamat_domisili_ayah = 'Alamat Domisili Ayah is required';
    }

    if (!orangTuaDetails.kelurahan_domisili_ayah) {
      formErrors.kelurahan_domisili_ayah = 'Kelurahan Domisili Ayah is required';
    }

    if (!orangTuaDetails.kecamatan_domisili_ayah) {
      formErrors.kecamatan_domisili_ayah = 'Kecamatan Domisili Ayah is required';
    }

    if (!orangTuaDetails.kota_domisili_ayah) {
      formErrors.kota_domisili_ayah = 'Kota Domisili Ayah is required';
    }

    if (!orangTuaDetails.provinsi_domisili_ayah) {
      formErrors.provinsi_domisili_ayah = 'Provinsi Domisili Ayah is required';
    }

    if (!orangTuaDetails.pekerjaan_ayah) {
      formErrors.pekerjaan_ayah = 'Pekerjaan Ayah is required';
    }

    if (!orangTuaDetails.pendidikan_ayah) {
      formErrors.pendidikan_ayah = 'Pendidikan Ayah is required';
    }

    setErrors(formErrors);
    return Object
      .keys(formErrors)
      .length === 0;
  };

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

  const [provinsiIbu,
    setProvinsiIbu] = useState([]); // Initialize as an array
  const [regenciesIbu,
    setRegenciesIbu] = useState([]);
  const [districtsIbu,
    setDistrictsIbu] = useState([]);
  const [villagesIbu,
    setVillagesIbu] = useState([]);
  const [provinsiIbuDom,
    setProvinsiIbuDom] = useState([]); // Initialize as an array
  const [regenciesIbuDom,
    setRegenciesIbuDom] = useState([]);
  const [districtsIbuDom,
    setDistrictsIbuDom] = useState([]);
  const [villagesIbuDom,
    setVillagesIbuDom] = useState([]);
  
  const [provinsiAyah,
    setProvinsiAyah] = useState([]); // Initialize as an array
  const [regenciesAyah,
    setRegenciesAyah] = useState([]);
  const [districtsAyah,
    setDistrictsAyah] = useState([]);
  const [villagesAyah,
    setVillagesAyah] = useState([]);
  const [provinsiAyahDom,
    setProvinsiAyahDom] = useState([]); // Initialize as an array
  const [regenciesAyahDom,
    setRegenciesAyahDom] = useState([]);
  const [districtsAyahDom,
    setDistrictsAyahDom] = useState([]);
  const [villagesAyahDom,
    setVillagesAyahDom] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi`)
      .then(response => {
        setProvinsiIbu(response.data);
        setProvinsiIbuDom(response.data);
        setProvinsiAyah(response.data);
        setProvinsiAyahDom(response.data);
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });

  }, []);

  const handleProvinsiIbuChange = (e) => {
    const selectedProvinsiId = e.target.value;
    setOrangTuaDetails({
      ...orangTuaDetails,
      provinsi_ktp_ibu: selectedProvinsiId
    })

    // Fetch regencies when a province is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiId}/regencies`)
      .then((response) => {
        setRegenciesIbu(response.data);
        setDistrictsIbu([]); // Reset districts and villages when province changes
        setVillagesIbu([]);
      })
      .catch((error) => console.error('Error fetching regencies:', error));
  };

  const handleProvinsiIbuChangeDom = (e) => {
    const selectedProvinsiDomId = e.target.value;
    setOrangTuaDetails({
      ...orangTuaDetails,
      provinsi_domisili_ibu: selectedProvinsiDomId
    })

    // Fetch regencies when a province is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiDomId}/regencies`)
      .then((response) => {
        setRegenciesIbuDom(response.data);
        setDistrictsIbuDom([]); // Reset districts and villages when province changes
        setVillagesIbuDom([]);
      })
      .catch((error) => console.error('Error fetching regencies dom:', error));
  };

  const handleRegencyIbuChange = (e) => {
    const selectedRegencyId = e.target.value;
    setOrangTuaDetails({...orangTuaDetails, kota_ktp_ibu: selectedRegencyId});

    // Fetch districts when a regency is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyId}/districts`)
      .then((response) => {
        setDistrictsIbu(response.data);
        setVillagesIbu([]); // Reset villages when regency changes
      })
      .catch((error) => console.error('Error fetching districts:', error));
  };

  const handleRegencyIbuChangeDom = (e) => {
    const selectedRegencyDomId = e.target.value;
    setOrangTuaDetails({...orangTuaDetails, kota_domisili_ibu: selectedRegencyDomId});

    // Fetch districts when a regency is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyDomId}/districts`)
      .then((response) => {
        setDistrictsIbuDom(response.data);
        setVillagesIbuDom([]); // Reset villages when regency changes
      })
      .catch((error) => console.error('Error fetching districts dom:', error));
  };

  const handleDistrictIbuChange = (e) => {
    const selectedDistrictId = e.target.value;
    setOrangTuaDetails({...orangTuaDetails, kecamatan_ktp_ibu: selectedDistrictId});

    // Fetch villages when a district is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictId}/villages`)
      .then((response) => {
        setVillagesIbu(response.data);
      })
      .catch((error) => console.error('Error fetching villages:', error));
  };

  const handleDistrictIbuChangeDom = (e) => {
    const selectedDistrictDomId = e.target.value;
    setOrangTuaDetails({ ...orangTuaDetails,kecamatan_domisili_ibu: selectedDistrictDomId});

    // Fetch villages when a district is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictDomId}/villages`)
      .then((response) => {
        setVillagesIbuDom(response.data);
      })
      .catch((error) => console.error('Error fetching villages dom:', error));
  };

  // --------------

  const handleProvinsiAyahChange = (e) => {
    const selectedProvinsiId = e.target.value;
    setOrangTuaDetails({
      ...orangTuaDetails,
      provinsi_ktp_ayah: selectedProvinsiId
    })

    // Fetch regencies when a province is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiId}/regencies`)
      .then((response) => {
        setRegenciesAyah(response.data);
        setDistrictsAyah([]); // Reset districts and villages when province changes
        setVillagesAyah([]);
      })
      .catch((error) => console.error('Error fetching regencies:', error));
  };

  const handleProvinsiAyahChangeDom = (e) => {
    const selectedProvinsiDomId = e.target.value;
    setOrangTuaDetails({...orangTuaDetails, provinsi_domisili_ayah: selectedProvinsiDomId});

    // Fetch regencies when a province is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiDomId}/regencies`)
      .then((response) => {
        setRegenciesAyahDom(response.data);
        setDistrictsAyahDom([]); // Reset districts and villages when province changes
        setVillagesAyahDom([]);
      })
      .catch((error) => console.error('Error fetching regencies dom:', error));
  };

  const handleRegencyAyahChange = (e) => {
    const selectedRegencyId = e.target.value;
    setOrangTuaDetails({...orangTuaDetails, kota_ktp_ayah: selectedRegencyId});

    // Fetch districts when a regency is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyId}/districts`)
      .then((response) => {
        setDistrictsAyah(response.data);
        setVillagesAyah([]); // Reset villages when regency changes
      })
      .catch((error) => console.error('Error fetching districts:', error));
  };

  const handleRegencyAyahChangeDom = (e) => {
    const selectedRegencyDomId = e.target.value;
    setOrangTuaDetails({...orangTuaDetails, kota_domisili_ayah: selectedRegencyDomId});

    // Fetch districts when a regency is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyDomId}/districts`)
      .then((response) => {
        setDistrictsAyahDom(response.data);
        setVillagesAyahDom([]); // Reset villages when regency changes
      })
      .catch((error) => console.error('Error fetching districts dom:', error));
  };

  const handleDistrictAyahChange = (e) => {
    const selectedDistrictId = e.target.value;
    setOrangTuaDetails({...orangTuaDetails, kecamatan_ktp_ayah: selectedDistrictId});

    // Fetch villages when a district is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictId}/villages`)
      .then((response) => {
        setVillagesAyah(response.data);
      })
      .catch((error) => console.error('Error fetching villages:', error));
  };

  const handleDistrictAyahChangeDom = (e) => {
    const selectedDistrictDomId = e.target.value;
    setOrangTuaDetails({...orangTuaDetails, kecamatan_domisili_ayah: selectedDistrictDomId});

    // Fetch villages when a district is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictDomId}/villages`)
      .then((response) => {
        setVillagesAyahDom(response.data);
      })
      .catch((error) => console.error('Error fetching villages dom:', error));
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
                    <div>
                      <h3 className="text-xl font-bold text-gray-700 mt-5 mb-3">Data Ibu</h3>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">No KK</label>
                          <input
                            type="text"
                            name="no_kk"
                            value={orangTuaDetails.no_kk}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            no_kk: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.no_kk && <p className="text-red-500 text-sm mt-1">{errors.no_kk}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">NIK Ibu</label>
                          <input
                            type="text"
                            name="nik_ibu"
                            value={orangTuaDetails.nik_ibu}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            nik_ibu: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.nik_ibu && <p className="text-red-500 text-sm mt-1">{errors.nik_ibu}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Nama Ibu</label>
                          <input
                            type="text"
                            name="nama_ibu"
                            value={orangTuaDetails.nama_ibu}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            nama_ibu: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.nama_ibu && <p className="text-red-500 text-sm mt-1">{errors.nama_ibu}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Tempat Lahir Ibu</label>
                          <input
                            type="text"
                            name="tempat_lahir_ibu"
                            value={orangTuaDetails.tempat_lahir_ibu}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            tempat_lahir_ibu: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.tempat_lahir_ibu && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_ibu}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Tanggal Lahir Ibu</label>
                          <input
                            type="date"
                            name="tanggal_lahir_ibu"
                            value={orangTuaDetails.tanggal_lahir_ibu}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            tanggal_lahir_ibu: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.tanggal_lahir_ibu && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_ibu}</p>}
                        </div>
                        
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Alamat KTP Ibu</label>
                          <input
                            type="text"
                            name="alamat_ktp_ibu"
                            value={orangTuaDetails.alamat_ktp_ibu}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            alamat_ktp_ibu: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.alamat_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.alamat_ktp_ibu}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Provinsi KTP Ibu</label>
                          <select
                            name="provinsi_ktp_ibu"
                            value={orangTuaDetails.provinsi_ktp_ibu}
                            onChange={handleProvinsiIbuChange}
                            className="w-full py-3 px-6 border rounded-full shadow-md">
                            <option value="">Pilih Provinsi</option>
                            {provinsiIbu.length > 0 && provinsiIbu.map(p => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                          {errors.provinsi_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.provinsi_ktp_ibu}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Kota KTP Ibu</label>
                          <select
                            name="kota_ktp_ibu"
                            value={orangTuaDetails.kota_ktp_ibu}
                            onChange={handleRegencyIbuChange}
                            className="w-full py-3 px-6 border rounded-full shadow-md"
                            disabled={!regenciesIbu.length}>
                            <option value="">Pilih Kota</option>
                            {regenciesIbu.length > 0 && regenciesIbu.map(r => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                          {errors.kota_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.kota_ktp_ibu}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Kecamatan KTP Ibu</label>
                          <select
                            name="kecamatan_ktp_ibu"
                            value={orangTuaDetails.kecamatan_ktp_ibu}
                            onChange={handleDistrictIbuChange}
                            className="w-full py-3 px-6 border rounded-full shadow-md"
                            disabled={!districtsIbu.length}>
                            <option value="">Pilih Kecamatan</option>
                            {districtsIbu.length > 0 && districtsIbu.map(d => (
                              <option key={d.id} value={d.id}>
                                {d.name}
                              </option>
                            ))}
                          </select>
                          {errors.kecamatan_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.kecamatan_ktp_ibu}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Kelurahan KTP Ibu</label>
                          <select
                            name="kelurahan_ktp_ibu"
                            value={orangTuaDetails.kelurahan_ktp_ibu}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            kelurahan_ktp_ibu: e.target.value
                          })}
                            className="w-full py-3 px-6 border rounded-full shadow-md"
                            disabled={!villagesIbu.length}>
                            <option value="">Pilih Kelurahan</option>
                            {villagesIbu.length > 0 && villagesIbu.map(v => (
                              <option key={v.id} value={v.id}>
                                {v.name}
                              </option>
                            ))}
                          </select>
                          {errors.kelurahan_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.kelurahan_ktp_ibu}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Alamat Domisili Ibu</label>
                          <input
                            type="text"
                            name="alamat_domisili_ibu"
                            value={orangTuaDetails.alamat_domisili_ibu}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            alamat_domisili_ibu: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Provinsi Domisili Ibu</label>
                          <select
                            name="provinsi_domisili_ibu"
                            value={orangTuaDetails.provinsi_domisili_ibu}
                            onChange={handleProvinsiIbuChangeDom}
                            className="w-full py-3 px-6 border rounded-full shadow-md">
                            <option value="">Pilih Provinsi</option>
                            {provinsiIbuDom.length > 0 && provinsiIbuDom.map(p => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                          {errors.provinsi_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.provinsi_domisili_ibu}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Kota Domisili Ibu</label>
                          <select
                            name="kota_domisili_ibu"
                            value={orangTuaDetails.kota_domisili_ibu}
                            onChange={handleRegencyIbuChangeDom}
                            className="w-full py-3 px-6 border rounded-full shadow-md"
                            disabled={!regenciesIbuDom.length}>
                            <option value="">Pilih Kota</option>
                            {regenciesIbuDom.length > 0 && regenciesIbuDom.map(r => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                          {errors.kota_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.kota_domisili_ibu}</p>}
                        </div>
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-sm font-semibold">Kecamatan Domisili Ibu</label>
                        <select
                          name="kecamatan_domisili_ibu"
                          value={orangTuaDetails.kecamatan_domisili_ibu}
                          onChange={handleDistrictIbuChangeDom}
                          className="w-full py-3 px-6 border rounded-full shadow-md"
                          disabled={!districtsIbuDom.length}>
                          <option value="">Pilih Kecamatan</option>
                          {districtsIbuDom.length > 0 && districtsIbuDom.map(d => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                        {errors.kecamatan_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.kecamatan_domisili_ibu}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Kelurahan Domisili Ibu</label>
                        <select
                          name="kelurahan_domisili_ibu"
                          value={orangTuaDetails.kelurahan_domisili_ibu}
                          onChange={(e) => setOrangTuaDetails({
                          ...orangTuaDetails,
                          kelurahan_domisili_ibu: e.target.value
                        })}
                          className="w-full py-3 px-6 border rounded-full shadow-md"
                          disabled={!villagesIbuDom.length}>
                          <option value="">Pilih Kelurahan</option>
                          {villagesIbuDom.length > 0 && villagesIbuDom.map(v => (
                            <option key={v.id} value={v.id}>
                              {v.name}
                            </option>
                          ))}
                        </select>
                        {errors.kelurahan_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.kelurahan_domisili_ibu}</p>}
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-sm font-semibold">No Handphone Ibu</label>
                        <input
                          type="text"
                          name="no_hp_ibu"
                          value={orangTuaDetails.no_hp_ibu}
                          onChange={(e) => setOrangTuaDetails({
                          ...orangTuaDetails,
                          no_hp_ibu: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                        {errors.no_hp_ibu && <p className="text-red-500 text-sm mt-1">{errors.no_hp_ibu}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Email Ibu</label>
                        <input
                          type="text"
                          name="email_ibu"
                          value={orangTuaDetails.email_ibu}
                          onChange={(e) => setOrangTuaDetails({
                          ...orangTuaDetails,
                          email_ibu: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                        {errors.email_ibu && <p className="text-red-500 text-sm mt-1">{errors.email_ibu}</p>}
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                      <div>
                        <label className="block text-gray-700">Pekerjaan Ibu</label>
                        <select
                          name="pekerjaan_ibu"
                          value={orangTuaDetails.pekerjaan_ibu}
                          onChange={(e) => setOrangTuaDetails({
                          ...orangTuaDetails,
                          pekerjaan_ibu: e.target.value
                        })}
                          className="w-full p-2 border border-gray-300 rounded">
                          <option value="">Pilih Pekerjaan Ibu</option>
                          {pekerjaanOptions.map((pekerjaan) => (
                            <option key={pekerjaan.id} value={pekerjaan.id}>
                              {pekerjaan.nama}
                            </option>
                          ))}
                        </select>
                        {errors.pekerjaan_ibu && <p className="text-red-500 text-sm mt-1">{errors.pekerjaan_ibu}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">Pendidikan Ibu</label>
                        <select
                          name="pendidikan_ibu"
                          value={orangTuaDetails.pendidikan_ibu}
                          onChange={(e) => setOrangTuaDetails({
                          ...orangTuaDetails,
                          pendidikan_ibu: e.target.value
                        })}
                          className="w-full p-2 border border-gray-300 rounded">
                          <option value="">Pilih Pendidikan Ibu</option>
                          {pendidikanOptions.map((pendidikan) => (
                            <option key={pendidikan.id} value={pendidikan.id}>
                              {pendidikan.nama}
                            </option>
                          ))}
                        </select>
                        {errors.pendidikan_ibu && <p className="text-red-500 text-sm mt-1">{errors.pendidikan_ibu}</p>}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-700 mt-5 mb-3">Data Ayah</h3>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">NIK Ayah</label>
                          <input
                            type="text"
                            name="nik_ayah"
                            value={orangTuaDetails.nik_ayah}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            nik_ayah: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.nik_ayah && <p className="text-red-500 text-sm mt-1">{errors.nik_ayah}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Nama Ayah</label>
                          <input
                            type="text"
                            name="nama_ayah"
                            value={orangTuaDetails.nama_ayah}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            nama_ayah: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.nama_ayah && <p className="text-red-500 text-sm mt-1">{errors.nama_ayah}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Tempat Lahir Ayah</label>
                          <input
                            type="text"
                            name="tempat_lahir_ayah"
                            value={orangTuaDetails.tempat_lahir_ayah}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            tempat_lahir_ayah: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.tempat_lahir_ayah && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_ayah}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Tanggal Lahir Ayah</label>
                          <input
                            type="date"
                            name="tanggal_lahir_ayah"
                            value={orangTuaDetails.tanggal_lahir_ayah}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            tanggal_lahir_ayah: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.tanggal_lahir_ayah && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_ayah}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Alamat KTP Ayah</label>
                          <input
                            type="text"
                            name="alamat_ktp_ayah"
                            value={orangTuaDetails.alamat_ktp_ayah}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            alamat_ktp_ayah: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.alamat_ktp_ayah && <p className="text-red-500 text-sm mt-1">{errors.alamat_ktp_ayah}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Provinsi KTP Ayah</label>
                          <select
                            name="provinsi_ktp_ayah"
                            value={orangTuaDetails.provinsi_ktp_ayah}
                            onChange={handleProvinsiAyahChange}
                            className="w-full py-3 px-6 border rounded-full shadow-md">
                            <option value="">Pilih Provinsi</option>
                            {provinsiAyah.length > 0 && provinsiAyah.map(p => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                          {errors.provinsi_ktp_ayah && <p className="text-red-500 text-sm mt-1">{errors.provinsi_ktp_ayah}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Kota KTP Ayah</label>
                          <select
                            name="kota_ktp_ayah"
                            value={orangTuaDetails.kota_ktp_ayah}
                            onChange={handleRegencyAyahChange}
                            className="w-full py-3 px-6 border rounded-full shadow-md"
                            disabled={!regenciesAyah.length}>
                            <option value="">Pilih Kota</option>
                            {regenciesAyah.length > 0 && regenciesAyah.map(r => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                          {errors.kota_ktp_ayah && <p className="text-red-500 text-sm mt-1">{errors.kota_ktp_ayah}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Kecamatan KTP Ayah</label>
                          <select
                            name="kecamatan_ktp_ayah"
                            value={orangTuaDetails.kecamatan_ktp_ayah}
                            onChange={handleDistrictAyahChange}
                            className="w-full py-3 px-6 border rounded-full shadow-md"
                            disabled={!districtsAyah.length}>
                            <option value="">Pilih Kecamatan</option>
                            {districtsAyah.length > 0 && districtsAyah.map(d => (
                              <option key={d.id} value={d.id}>
                                {d.name}
                              </option>
                            ))}
                          </select>
                          {errors.kecamatan_ktp_ayah && <p className="text-red-500 text-sm mt-1">{errors.kecamatan_ktp_ayah}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Kelurahan KTP Ayah</label>
                          <select
                            name="kelurahan_ktp_ayah"
                            value={orangTuaDetails.kelurahan_ktp_ayah}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            kelurahan_ktp_ayah: e.target.value
                          })}
                            className="w-full py-3 px-6 border rounded-full shadow-md"
                            disabled={!villagesAyah.length}>
                            <option value="">Pilih Kelurahan</option>
                            {villagesAyah.length > 0 && villagesAyah.map(v => (
                              <option key={v.id} value={v.id}>
                                {v.name}
                              </option>
                            ))}
                          </select>
                          {errors.kelurahan_ktp_ayah && <p className="text-red-500 text-sm mt-1">{errors.kelurahan_ktp_ayah}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Alamat Domisili Ayah</label>
                          <input
                            type="text"
                            name="alamat_domisili_ayah"
                            value={orangTuaDetails.alamat_domisili_ayah}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            alamat_domisili_ayah: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.alamat_domisili_ayah && <p className="text-red-500 text-sm mt-1">{errors.alamat_domisili_ayah}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Provinsi Domisili Ayah</label>
                          <select
                            name="provinsi_domisili_ayah"
                            value={orangTuaDetails.provinsi_domisili_ayah}
                            onChange={handleProvinsiAyahChangeDom}
                            className="w-full py-3 px-6 border rounded-full shadow-md">
                            <option value="">Pilih Provinsi</option>
                            {provinsiAyahDom.length > 0 && provinsiAyahDom.map(p => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                          {errors.provinsi_domisili_ayah && <p className="text-red-500 text-sm mt-1">{errors.provinsi_domisili_ayah}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Kota Domisili Ayah</label>
                          <select
                            name="kota_domisili_ayah"
                            value={orangTuaDetails.kota_domisili_ayah}
                            onChange={handleRegencyAyahChangeDom}
                            className="w-full py-3 px-6 border rounded-full shadow-md"
                            disabled={!regenciesAyahDom.length}>
                            <option value="">Pilih Kota</option>
                            {regenciesAyahDom.length > 0 && regenciesAyahDom.map(r => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                          {errors.kota_domisili_ayah && <p className="text-red-500 text-sm mt-1">{errors.kota_domisili_ayah}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">Kecamatan Domisili Ayah</label>
                          <select
                            name="kecamatan_domisili_ayah"
                            value={orangTuaDetails.kecamatan_domisili_ayah}
                            onChange={handleDistrictAyahChangeDom}
                            className="w-full py-3 px-6 border rounded-full shadow-md"
                            disabled={!districtsAyahDom.length}>
                            <option value="">Pilih Kecamatan</option>
                            {districtsAyahDom.length > 0 && districtsAyahDom.map(d => (
                              <option key={d.id} value={d.id}>
                                {d.name}
                              </option>
                            ))}
                          </select>
                          {errors.kecamatan_domisili_ayah && <p className="text-red-500 text-sm mt-1">{errors.kecamatan_domisili_ayah}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Kelurahan Domisili Ayah</label>
                          <select
                            name="kelurahan_domisili_ayah"
                            value={orangTuaDetails.kelurahan_domisili_ayah}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            kelurahan_domisili_ayah: e.target.value
                          })}
                            className="w-full py-3 px-6 border rounded-full shadow-md"
                            disabled={!villagesAyahDom.length}>
                            <option value="">Pilih Kelurahan</option>
                            {villagesAyahDom.length > 0 && villagesAyahDom.map(v => (
                              <option key={v.id} value={v.id}>
                                {v.name}
                              </option>
                            ))}
                          </select>
                          {errors.kelurahan_domisili_ayah && <p className="text-red-500 text-sm mt-1">{errors.kelurahan_domisili_ayah}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-sm font-semibold">No Handphone Ayah</label>
                          <input
                            type="text"
                            name="no_hp_ayah"
                            value={orangTuaDetails.no_hp_ayah}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            no_hp_ayah: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.no_hp_ayah && <p className="text-red-500 text-sm mt-1">{errors.no_hp_ayah}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Email Ayah</label>
                          <input
                            type="text"
                            name="email_ayah"
                            value={orangTuaDetails.email_ayah}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            email_ayah: e.target.value
                          })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                          {errors.email_ayah && <p className="text-red-500 text-sm mt-1">{errors.email_ayah}</p>}
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                        <div>
                          <label className="block text-gray-700">Pekerjaan Ayah</label>
                          <select
                            name="pekerjaan_ayah"
                            value={orangTuaDetails.pekerjaan_ayah}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            pekerjaan_ayah: e.target.value
                          })}
                            className="w-full p-2 border border-gray-300 rounded">
                            <option value="">Pilih Pekerjaan Ayah</option>
                            {pekerjaanOptions.map((pekerjaan) => (
                              <option key={pekerjaan.id} value={pekerjaan.id}>
                                {pekerjaan.nama}
                              </option>
                            ))}
                          </select>
                          {errors.pekerjaan_ayah && <p className="text-red-500 text-sm mt-1">{errors.pekerjaan_ayah}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold">Pendidikan Ayah</label>
                          <select
                            name="pendidikan_ayah"
                            value={orangTuaDetails.pendidikan_ayah}
                            onChange={(e) => setOrangTuaDetails({
                            ...orangTuaDetails,
                            pendidikan_ayah: e.target.value
                          })}
                            className="w-full p-2 border border-gray-300 rounded">
                            <option value="">Pilih Pendidikan Ayah</option>
                            {pendidikanOptions.map((pendidikan) => (
                              <option key={pendidikan.id} value={pendidikan.id}>
                                {pendidikan.nama}
                              </option>
                            ))}
                          </select>
                          {errors.pendidikan_ayah && <p className="text-red-500 text-sm mt-1">{errors.pendidikan_ayah}</p>}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpdateOrangtua(orangTuaDetails.id)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                      Update Orangtua
                    </button>
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
