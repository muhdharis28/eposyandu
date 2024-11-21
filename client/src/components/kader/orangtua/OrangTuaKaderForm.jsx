import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import {getOrangTuaById, createOrangTua, updateOrangTua} from '../../OrangTuaService'; // Replace with actual service paths
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import {useSidebar} from '../../SideBarContext';
import axios from 'axios';
import { getPenggunaById } from '../../PenggunaService';

const OrangTuaKaderForm = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {isSidebarCollapsed, toggleSidebar} = useSidebar();
  const userId = localStorage.getItem('userId');

  const [formData,
    setFormData] = useState({
    no_kk: '',
    nik_ibu: '',
    nama_ibu: '',
    tempat_lahir_ibu: '',
    tanggal_lahir_ibu: '',
    alamat_ktp_ibu: '',
    kelurahan_ktp_ibu: null,
    kecamatan_ktp_ibu: null,
    kota_ktp_ibu: null,
    provinsi_ktp_ibu: null,
    alamat_domisili_ibu: '',
    kelurahan_domisili_ibu: null,
    kecamatan_domisili_ibu: null,
    kota_domisili_ibu: null,
    provinsi_domisili_ibu: null,
    no_hp_ibu: '',
    email_ibu: '',
    pekerjaan_ibu: null,
    pendidikan_ibu: null,
    nik_ayah: '',
    nama_ayah: '',
    tempat_lahir_ayah: '',
    tanggal_lahir_ayah: '',
    alamat_ktp_ayah: '',
    kelurahan_ktp_ayah: null,
    kecamatan_ktp_ayah: null,
    kota_ktp_ayah: null,
    provinsi_ktp_ayah: null,
    alamat_domisili_ayah: '',
    kelurahan_domisili_ayah: null,
    kecamatan_domisili_ayah: null,
    kota_domisili_ayah: null,
    provinsi_domisili_ayah: null,
    no_hp_ayah: '',
    email_ayah: '',
    pekerjaan_ayah: null,
    pendidikan_ayah: null,
    foto_kk: null,
    kata_sandi: null,
    posyandu: null
  });

  const [isSubmitting,
    setIsSubmitting] = useState(false);
  const [errors,
    setErrors] = useState({});
  const [pekerjaanOptions,
    setPekerjaanOptions] = useState([]);
  const [pendidikanOptions,
    setPendidikanOptions] = useState([]);

  useEffect(() => {
    if (id) {
      loadOrangTuaKader();
    }
    loadWilayah();
  }, [id]);

  const loadWilayah = async() => {
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

    if (formData.provinsi_ktp_ibu) {
      const regencyResponse = await
      axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${formData.provinsi_ktp_ibu}/regencies`);
      setRegenciesIbu(regencyResponse.data);

      if (formData.kota_ktp_ibu) {
        const districtResponse = await
        axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${formData.kota_ktp_ibu}/districts`);
        setDistrictsIbu(districtResponse.data);

        if (formData.kecamatan_ktp_ibu) {
          const villageResponse = await
          axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${formData.kecamatan_ktp_ibu}/villages`);
          setVillagesIbu(villageResponse.data);
        }
      }
    }

    if (formData.provinsi_domisili_ibu) {
      const regencyDomResponse = await
      axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${formData.provinsi_domisili_ibu}/regencies`);
      setRegenciesIbuDom(regencyDomResponse.data);

      if (formData.kota_domisili_ibu) {
        const districtDomResponse = await
        axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${formData.kota_domisili_ibu}/districts`);
        setDistrictsIbuDom(districtDomResponse.data);

        if (formData.kecamatan_domisili_ibu) {
          const villageDomResponse = await
          axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${formData.kecamatan_domisili_ibu}/villages`);
          setVillagesIbuDom(villageDomResponse.data);
        }
      }
    }

    if (formData.provinsi_ktp_ayah) {
      const regencyResponse = await
      axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${formData.provinsi_ktp_ayah}/regencies`);
      setRegenciesAyah(regencyResponse.data);

      if (formData.kota_ktp_ayah) {
        const districtResponse = await
        axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${formData.kota_ktp_ayah}/districts`);
        setDistrictsAyah(districtResponse.data);

        if (formData.kecamatan_ktp_ayah) {
          const villageResponse = await
          axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${formData.kecamatan_ktp_ayah}/villages`);
          setVillagesAyah(villageResponse.data);
        }
      }
    }

    if (formData.provinsi_domisili_ayah) {
      const regencyDomResponse = await
      axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${formData.provinsi_domisili_ayah}/regencies`);
      setRegenciesAyahDom(regencyDomResponse.data);

      if (formData.kota_domisili_ayah) {
        const districtDomResponse = await
        axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${formData.kota_domisili_ayah}/districts`);
        setDistrictsAyahDom(districtDomResponse.data);

        if (formData.kecamatan_domisili_ayah) {
          const villageDomResponse = await
          axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${formData.kecamatan_domisili_ayah}/villages`);
          setVillagesAyahDom(villageDomResponse.data);
        }
      }
    }
  }

  useEffect(() => {
    const fetchPekerjaan = async() => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pekerjaan`);
        setPekerjaanOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch Pekerjaan data:', error);
      }
    };

    const fetchPendidikan = async() => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pendidikan`);
        setPendidikanOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch Pendidikan data:', error);
      }
    };

    fetchPekerjaan();
    fetchPendidikan();
  }, []);

  const [provinsiIbu,
    setProvinsiIbu] = useState([]);
  const [regenciesIbu,
    setRegenciesIbu] = useState([]);
  const [districtsIbu,
    setDistrictsIbu] = useState([]);
  const [villagesIbu,
    setVillagesIbu] = useState([]);
  const [provinsiIbuDom,
    setProvinsiIbuDom] = useState([]);
  const [regenciesIbuDom,
    setRegenciesIbuDom] = useState([]);
  const [districtsIbuDom,
    setDistrictsIbuDom] = useState([]);
  const [villagesIbuDom,
    setVillagesIbuDom] = useState([]);

  const [provinsiAyah,
    setProvinsiAyah] = useState([]);
  const [regenciesAyah,
    setRegenciesAyah] = useState([]);
  const [districtsAyah,
    setDistrictsAyah] = useState([]);
  const [villagesAyah,
    setVillagesAyah] = useState([]);
  const [provinsiAyahDom,
    setProvinsiAyahDom] = useState([]);
  const [regenciesAyahDom,
    setRegenciesAyahDom] = useState([]);
  const [districtsAyahDom,
    setDistrictsAyahDom] = useState([]);
  const [villagesAyahDom,
    setVillagesAyahDom] = useState([]);

  const handleProvinsiIbuChange = (e) => {
    const selectedProvinsiId = e.target.value;
    setFormData({
      ...formData,
      provinsi_ktp_ibu: selectedProvinsiId
    })

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiId}/regencies`)
      .then((response) => {
        setRegenciesIbu(response.data);
        setDistrictsIbu([]);
        setVillagesIbu([]);
      })
      .catch((error) => console.error('Error fetching regencies:', error));
  };

  const handleProvinsiIbuChangeDom = (e) => {
    const selectedProvinsiDomId = e.target.value;
    setFormData({
      ...formData,
      provinsi_domisili_ibu: selectedProvinsiDomId
    })

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiDomId}/regencies`)
      .then((response) => {
        setRegenciesIbuDom(response.data);
        setDistrictsIbuDom([]);
        setVillagesIbuDom([]);
      })
      .catch((error) => console.error('Error fetching regencies dom:', error));
  };

  const handleRegencyIbuChange = (e) => {
    const selectedRegencyId = e.target.value;
    setFormData({
      ...formData,
      kota_ktp_ibu: selectedRegencyId
    });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyId}/districts`)
      .then((response) => {
        setDistrictsIbu(response.data);
        setVillagesIbu([]);
      })
      .catch((error) => console.error('Error fetching districts:', error));
  };

  const handleRegencyIbuChangeDom = (e) => {
    const selectedRegencyDomId = e.target.value;
    setFormData({
      ...formData,
      kota_domisili_ibu: selectedRegencyDomId
    });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyDomId}/districts`)
      .then((response) => {
        setDistrictsIbuDom(response.data);
        setVillagesIbuDom([]);
      })
      .catch((error) => console.error('Error fetching districts dom:', error));
  };

  const handleDistrictIbuChange = (e) => {
    const selectedDistrictId = e.target.value;
    setFormData({
      ...formData,
      kecamatan_ktp_ibu: selectedDistrictId
    });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictId}/villages`)
      .then((response) => {
        setVillagesIbu(response.data);
      })
      .catch((error) => console.error('Error fetching villages:', error));
  };

  const handleDistrictIbuChangeDom = (e) => {
    const selectedDistrictDomId = e.target.value;
    setFormData({
      ...formData,
      kecamatan_domisili_ibu: selectedDistrictDomId
    });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictDomId}/villages`)
      .then((response) => {
        setVillagesIbuDom(response.data);
      })
      .catch((error) => console.error('Error fetching villages dom:', error));
  };

  const handleProvinsiAyahChange = (e) => {
    const selectedProvinsiId = e.target.value;
    setFormData({
      ...formData,
      provinsi_ktp_ayah: selectedProvinsiId
    })

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiId}/regencies`)
      .then((response) => {
        setRegenciesAyah(response.data);
        setDistrictsAyah([]);
        setVillagesAyah([]);
      })
      .catch((error) => console.error('Error fetching regencies:', error));
  };

  const handleProvinsiAyahChangeDom = (e) => {
    const selectedProvinsiDomId = e.target.value;
    setFormData({
      ...formData,
      provinsi_domisili_ayah: selectedProvinsiDomId
    });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiDomId}/regencies`)
      .then((response) => {
        setRegenciesAyahDom(response.data);
        setDistrictsAyahDom([]);
        setVillagesAyahDom([]);
      })
      .catch((error) => console.error('Error fetching regencies dom:', error));
  };

  const handleRegencyAyahChange = (e) => {
    const selectedRegencyId = e.target.value;
    setFormData({
      ...formData,
      kota_ktp_ayah: selectedRegencyId
    });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyId}/districts`)
      .then((response) => {
        setDistrictsAyah(response.data);
        setVillagesAyah([]);
      })
      .catch((error) => console.error('Error fetching districts:', error));
  };

  const handleRegencyAyahChangeDom = (e) => {
    const selectedRegencyDomId = e.target.value;
    setFormData({
      ...formData,
      kota_domisili_ayah: selectedRegencyDomId
    });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyDomId}/districts`)
      .then((response) => {
        setDistrictsAyahDom(response.data);
        setVillagesAyahDom([]);
      })
      .catch((error) => console.error('Error fetching districts dom:', error));
  };

  const handleDistrictAyahChange = (e) => {
    const selectedDistrictId = e.target.value;
    setFormData({
      ...formData,
      kecamatan_ktp_ayah: selectedDistrictId
    });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictId}/villages`)
      .then((response) => {
        setVillagesAyah(response.data);
      })
      .catch((error) => console.error('Error fetching villages:', error));
  };

  const handleDistrictAyahChangeDom = (e) => {
    const selectedDistrictDomId = e.target.value;
    setFormData({
      ...formData,
      kecamatan_domisili_ayah: selectedDistrictDomId
    });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictDomId}/villages`)
      .then((response) => {
        setVillagesAyahDom(response.data);
      })
      .catch((error) => console.error('Error fetching villages dom:', error));
  };

  const loadOrangTuaKader = async() => {
    try {
      const result = await getOrangTuaById(id);
      setFormData(result.data);
    } catch (error) {
      console.error('Failed to load Orang Tua data:', error);
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.no_kk) {
      formErrors.no_kk = 'No KK wajib diisi';
    } else if (!/^\d{16}$/.test(formData.no_kk)) {
      formErrors.no_kk = 'Nomor Kartu Keluarga harus 16 digit';
    }

    if (!formData.nik_ibu) {
      formErrors.nik_ibu = 'NIK Ibu wajib diisi';
    } else if (!/^\d{16}$/.test(formData.nik_ibu)) {
      formErrors.nik_ibu = 'NIK Ibu harus 16 digit';
    }

    if (!formData.nama_ibu) {
      formErrors.nama_ibu = 'Nama Ibu wajib diisi';
    }

    if (!formData.tempat_lahir_ibu) {
      formErrors.tempat_lahir_ibu = 'Tempat Lahir Ibu wajib diisi';
    }

    if (!formData.tanggal_lahir_ibu) {
      formErrors.tanggal_lahir_ibu = 'Tanggal Lahir Ibu wajib diisi';
    }

    if (!formData.no_hp_ibu) {
      formErrors.no_hp_ibu = 'No HP Ibu wajib diisi';
    } else if (!/^\d+$/.test(formData.no_hp_ibu)) {
      formErrors.no_hp_ibu = 'No HP Ibu nomor valid';
    }

    if (!formData.alamat_ktp_ibu) {
      formErrors.alamat_ktp_ibu = 'Alamat KTP Ibu wajib diisi';
    }

    if (!formData.alamat_domisili_ibu) {
      formErrors.alamat_domisili_ibu = 'Alamat Domisili Ibu wajib diisi';
    }

    if (!formData.nik_ayah) {
      formErrors.nik_ayah = 'NIK Ayah wajib diisi';
    } else if (!/^\d{16}$/.test(formData.nik_ayah)) {
      formErrors.nik_ayah = 'NIK Ayah harus 16 digit';
    }

    if (!formData.nama_ayah) {
      formErrors.nama_ayah = 'Nama Ayah wajib diisi';
    }

    if (!formData.tempat_lahir_ayah) {
      formErrors.tempat_lahir_ayah = 'Tempat Lahir Ayah wajib diisi';
    }

    if (!formData.tanggal_lahir_ayah) {
      formErrors.tanggal_lahir_ayah = 'Tanggal Lahir Ayah wajib diisi';
    }

    if (!formData.no_hp_ayah) {
      formErrors.no_hp_ayah = 'No HP Ayah wajib diisi';
    } else if (!/^\d+$/.test(formData.no_hp_ayah)) {
      formErrors.no_hp_ayah = 'No HP Ayah nomor valid';
    }

    if (!formData.alamat_ktp_ayah) {
      formErrors.alamat_ktp_ayah = 'Alamat KTP Ayah wajib diisi';
    }

    if (!formData.alamat_domisili_ayah) {
      formErrors.alamat_domisili_ayah = 'Alamat Domisili Ayah wajib diisi';
    }

    setErrors(formErrors);
    return Object
      .keys(formErrors)
      .length === 0;
  };

  const handleSubmit = async(e) => {
    
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (id) {
        await updateOrangTua(id, formData);
        updateLogin(id)
      } else {
        const response = await getPenggunaById(userId);
        const updatedFormData = {
          ...formData,
          posyandu: response.data.posyanduDetail.id
        };
        const ortu = await createOrangTua(updatedFormData);
        await createLogin(ortu.data.id);
      }
      navigate('/kader-orangtua');
    } catch (error) {
      console.error('Error submitting Orang Tua data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const createLogin = async(ortu_id) => {
    try {
      const uploadedFilePath = await uploadFile();
      formData.foto_kk = uploadedFilePath;
      await createPengguna({
        'nama': formData.nama_ibu,
        'email': formData.email_ibu,
        'kata_sandi': formData
          .nik_ibu
          .slice(-6),
        'role': 'user',
        'no_hp': formData.no_hp_ibu,
        'no_kk': formData.no_kk,
        'no_ktp': formData.nik_ibu,
        'foto_kk': uploadedFilePath,
        'orangtua': ortu_id,
        'posyandu': formData.posyandu,
        'verifikasi': true
      });
    } catch (error) {
      console.error('Error submitting pengguna data:', error);
    }
  }

  const updateLogin = async(ortu_id) => {
    try {
      const uploadedFilePath = await uploadFile();
      if (uploadedFilePath) {
        formData.foto_kk = uploadedFilePath;
      }

      const pengguna = await getPenggunabyOrtu(ortu_id);
      if (!pengguna || !pengguna.data[0] || !pengguna.data[0].id) {
        console.error('Pengguna not found for orangtua ID:', ortu_id);
        return;
      }

      const nikIbu = formData.nik_ibu
        ? String(formData.nik_ibu)
        : "";
      const slicedNikIbu = nikIbu.slice(-6);

      const data = {
        'nama': formData.nama_ibu,
        'email': formData.email_ibu,
        'kata_sandi': slicedNikIbu,
        'role': 'user',
        'no_hp': formData.no_hp_ibu,
        'no_kk': formData.no_kk,
        'no_ktp': formData.nik_ibu,
        'posyandu': formData.posyandu,
        'verifikasi': true
      };

      if (uploadedFilePath) {
        data.foto_kk = uploadedFilePath;
      }

      await updatePengguna(pengguna.data[0].id, data);
      console.log('Pengguna updated successfully');
    } catch (error) {
      console.error('Error updating pengguna data:', error);
    }
  };

  const uploadFile = async() => {
    if (!formData.foto_kk) 
      return null;
    const formDataPengguna = new FormData();
    formDataPengguna.append('file', formData.foto_kk);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formDataPengguna);
      const filePath = `/uploads/${response.data.fileName}`;
      return filePath;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar}/>
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed}/>
        <div
          className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          {/* Breadcrumb navigation */}
          <nav className="text-gray-600 mb-4">
            <Link to="/kader-orangtua" className="hover:underline">Orang Tua List</Link>
            &gt; {id
              ? 'Edit Orang Tua'
              : 'Tambah Orang Tua'}
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{id
                ? 'Edit Orang Tua'
                : 'Tambah Orang Tua'}</h1>
            <div
              className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
              <p className="text-sm font-bold">
                <span className="text-red-500">*</span>
                Wajib diisi
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold">No KK
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="no_kk"
                    value={formData.no_kk}
                    onChange={(e) => setFormData({
                    ...formData,
                    no_kk: e.target.value
                  })}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.no_kk && <p className="text-red-500 text-sm mt-1">{errors.no_kk}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Foto Kartu Keluarga
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="foto_kk"
                    onChange={(e) => setFormData({
                    ...formData,
                    foto_kk: e.target.files[0]
                  })}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.foto_kk && <p className="text-red-500 text-sm mt-1">{errors.foto_kk}</p>}
                </div>
              </div>
              <div className="mt-10">
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">Data Ibu</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-semibold">NIK Ibu
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nik_ibu"
                      value={formData.nik_ibu}
                      onChange={(e) => setFormData({
                      ...formData,
                      nik_ibu: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nik_ibu && <p className="text-red-500 text-sm mt-1">{errors.nik_ibu}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Nama Ibu
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nama_ibu"
                      value={formData.nama_ibu}
                      onChange={(e) => setFormData({
                      ...formData,
                      nama_ibu: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nama_ibu && <p className="text-red-500 text-sm mt-1">{errors.nama_ibu}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Tempat Lahir Ibu
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="tempat_lahir_ibu"
                      value={formData.tempat_lahir_ibu}
                      onChange={(e) => setFormData({
                      ...formData,
                      tempat_lahir_ibu: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tempat_lahir_ibu && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_ibu}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Tanggal Lahir Ibu
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="tanggal_lahir_ibu"
                      value={formData.tanggal_lahir_ibu}
                      onChange={(e) => setFormData({
                      ...formData,
                      tanggal_lahir_ibu: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tanggal_lahir_ibu && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_ibu}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Provinsi KTP Ibu</label>
                    <select
                      name="provinsi_ktp_ibu"
                      value={formData.provinsi_ktp_ibu}
                      onChange={handleProvinsiIbuChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="">Pilih Provinsi</option>
                      {provinsiIbu.length > 0 && provinsiIbu.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Kota KTP Ibu</label>
                    <select
                      name="kota_ktp_ibu"
                      value={formData.kota_ktp_ibu}
                      onChange={handleRegencyIbuChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={!regenciesIbu.length}>
                      <option value="">Pilih Kota</option>
                      {regenciesIbu.length > 0 && regenciesIbu.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Kecamatan KTP Ibu</label>
                    <select
                      name="kecamatan_ktp_ibu"
                      value={formData.kecamatan_ktp_ibu}
                      onChange={handleDistrictIbuChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={!districtsIbu.length}>
                      <option value="">Pilih Kecamatan</option>
                      {districtsIbu.length > 0 && districtsIbu.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Kelurahan KTP Ibu</label>
                    <select
                      name="kelurahan_ktp_ibu"
                      value={formData.kelurahan_ktp_ibu}
                      onChange={(e) => setFormData({
                      ...formData,
                      kelurahan_ktp_ibu: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={!villagesIbu.length}>
                      <option value="">Pilih Kelurahan</option>
                      {villagesIbu.length > 0 && villagesIbu.map(v => (
                        <option key={v.id} value={v.id}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">
                      Alamat KTP Ibu
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="alamat_ktp_ibu"
                      value={formData.alamat_ktp_ibu}
                      onChange={(e) => setFormData({
                      ...formData,
                      alamat_ktp_ibu: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      rows={1}/> {errors.alamat_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.alamat_ktp_ibu}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Provinsi Domisili Ibu</label>
                    <select
                      name="provinsi_domisili_ibu"
                      value={formData.provinsi_domisili_ibu}
                      onChange={handleProvinsiIbuChangeDom}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="">Pilih Provinsi</option>
                      {provinsiIbuDom.length > 0 && provinsiIbuDom.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Kota Domisili Ibu</label>
                    <select
                      name="kota_domisili_ibu"
                      value={formData.kota_domisili_ibu}
                      onChange={handleRegencyIbuChangeDom}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={!regenciesIbuDom.length}>
                      <option value="">Pilih Kota</option>
                      {regenciesIbuDom.length > 0 && regenciesIbuDom.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Kecamatan Domisili Ibu</label>
                    <select
                      name="kecamatan_domisili_ibu"
                      value={formData.kecamatan_domisili_ibu}
                      onChange={handleDistrictIbuChangeDom}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={!districtsIbuDom.length}>
                      <option value="">Pilih Kecamatan</option>
                      {districtsIbuDom.length > 0 && districtsIbuDom.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Kelurahan Domisili Ibu</label>
                    <select
                      name="kelurahan_domisili_ibu"
                      value={formData.kelurahan_domisili_ibu}
                      onChange={(e) => setFormData({
                      ...formData,
                      kelurahan_domisili_ibu: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={!villagesIbuDom.length}>
                      <option value="">Pilih Kelurahan</option>
                      {villagesIbuDom.length > 0 && villagesIbuDom.map(v => (
                        <option key={v.id} value={v.id}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Alamat Domisili Ibu
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      type="text"
                      name="alamat_domisili_ibu"
                      value={formData.alamat_domisili_ibu}
                      onChange={(e) => setFormData({
                      ...formData,
                      alamat_domisili_ibu: e.target.value
                    })}
                      rows="1"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.alamat_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.alamat_domisili_ibu}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">No Handphone Ibu
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="no_hp_ibu"
                      value={formData.no_hp_ibu}
                      onChange={(e) => setFormData({
                      ...formData,
                      no_hp_ibu: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.no_hp_ibu && <p className="text-red-500 text-sm mt-1">{errors.no_hp_ibu}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Email Ibu</label>
                    <input
                      type="text"
                      name="email_ibu"
                      value={formData.email_ibu}
                      onChange={(e) => setFormData({
                      ...formData,
                      email_ibu: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Pekerjaan Ibu</label>
                    <select
                      name="pekerjaan_ibu"
                      value={formData.pekerjaan_ibu}
                      onChange={(e) => setFormData({
                      ...formData,
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

                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Pendidikan Ibu</label>
                    <select
                      name="pendidikan_ibu"
                      value={formData.pendidikan_ibu}
                      onChange={(e) => setFormData({
                      ...formData,
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

                  </div>
                </div>
              </div>
              <div className="mt-10">
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">Data Ayah</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                    <label className="block text-sm font-semibold">NIK Ayah
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nik_ayah"
                      value={formData.nik_ayah}
                      onChange={(e) => setFormData({
                      ...formData,
                      nik_ayah: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nik_ayah && <p className="text-red-500 text-sm mt-1">{errors.nik_ayah}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Nama Ayah
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nama_ayah"
                      value={formData.nama_ayah}
                      onChange={(e) => setFormData({
                      ...formData,
                      nama_ayah: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nama_ayah && <p className="text-red-500 text-sm mt-1">{errors.nama_ayah}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Tempat Lahir Ayah
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="tempat_lahir_ayah"
                      value={formData.tempat_lahir_ayah}
                      onChange={(e) => setFormData({
                      ...formData,
                      tempat_lahir_ayah: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tempat_lahir_ayah && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_ayah}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Tanggal Lahir Ayah
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="tanggal_lahir_ayah"
                      value={formData.tanggal_lahir_ayah}
                      onChange={(e) => setFormData({
                      ...formData,
                      tanggal_lahir_ayah: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tanggal_lahir_ayah && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_ayah}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Provinsi KTP Ayah</label>
                    <select
                      name="provinsi_ktp_ayah"
                      value={formData.provinsi_ktp_ayah}
                      onChange={handleProvinsiAyahChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="">Pilih Provinsi</option>
                      {provinsiAyah.length > 0 && provinsiAyah.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Kota KTP Ayah</label>
                    <select
                      name="kota_ktp_ayah"
                      value={formData.kota_ktp_ayah}
                      onChange={handleRegencyAyahChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={!regenciesAyah.length}>
                      <option value="">Pilih Kota</option>
                      {regenciesAyah.length > 0 && regenciesAyah.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div>
                      <label className="block text-sm font-semibold">Kecamatan KTP Ayah</label>
                      <select
                        name="kecamatan_ktp_ayah"
                        value={formData.kecamatan_ktp_ayah}
                        onChange={handleDistrictAyahChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={!districtsAyah.length}>
                        <option value="">Pilih Kecamatan</option>
                        {districtsAyah.length > 0 && districtsAyah.map(d => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold">Kelurahan KTP Ayah</label>
                      <select
                        name="kelurahan_ktp_ayah"
                        value={formData.kelurahan_ktp_ayah}
                        onChange={(e) => setFormData({
                        ...formData,
                        kelurahan_ktp_ayah: e.target.value
                      })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={!villagesAyah.length}>
                        <option value="">Pilih Kelurahan</option>
                        {villagesAyah.length > 0 && villagesAyah.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                    <label className="block text-sm font-semibold">Alamat KTP Ayah
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      type="text"
                      name="alamat_ktp_ayah"
                      value={formData.alamat_ktp_ayah}
                      onChange={(e) => setFormData({
                      ...formData,
                      alamat_ktp_ayah: e.target.value
                    })}
                      rows="1"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.alamat_ktp_ayah && <p className="text-red-500 text-sm mt-1">{errors.alamat_ktp_ayah}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Provinsi Domisili Ayah</label>
                    <select
                      name="provinsi_domisili_ayah"
                      value={formData.provinsi_domisili_ayah}
                      onChange={handleProvinsiAyahChangeDom}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="">Pilih Provinsi</option>
                      {provinsiAyahDom.length > 0 && provinsiAyahDom.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Kota Domisili Ayah</label>
                    <select
                      name="kota_domisili_ayah"
                      value={formData.kota_domisili_ayah}
                      onChange={handleRegencyAyahChangeDom}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={!regenciesAyahDom.length}>
                      <option value="">Pilih Kota</option>
                      {regenciesAyahDom.length > 0 && regenciesAyahDom.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div>
                      <label className="block text-sm font-semibold">Kecamatan Domisili Ayah</label>
                      <select
                        name="kecamatan_domisili_ayah"
                        value={formData.kecamatan_domisili_ayah}
                        onChange={handleDistrictAyahChangeDom}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={!districtsAyahDom.length}>
                        <option value="">Pilih Kecamatan</option>
                        {districtsAyahDom.length > 0 && districtsAyahDom.map(d => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>

                    </div>
                    <div>
                      <label className="block text-sm font-semibold">Kelurahan Domisili Ayah</label>
                      <select
                        name="kelurahan_domisili_ayah"
                        value={formData.kelurahan_domisili_ayah}
                        onChange={(e) => setFormData({
                        ...formData,
                        kelurahan_domisili_ayah: e.target.value
                      })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={!villagesAyahDom.length}>
                        <option value="">Pilih Kelurahan</option>
                        {villagesAyahDom.length > 0 && villagesAyahDom.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>

                    </div>
                    <div>
                    <label className="block text-sm font-semibold">Alamat Domisili Ayah
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      type="text"
                      name="alamat_domisili_ayah"
                      value={formData.alamat_domisili_ayah}
                      onChange={(e) => setFormData({
                      ...formData,
                      alamat_domisili_ayah: e.target.value
                    })}
                      rows="1"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.alamat_domisili_ayah && <p className="text-red-500 text-sm mt-1">{errors.alamat_domisili_ayah}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">No Handphone Ayah
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="no_hp_ayah"
                      value={formData.no_hp_ayah}
                      onChange={(e) => setFormData({
                      ...formData,
                      no_hp_ayah: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.no_hp_ayah && <p className="text-red-500 text-sm mt-1">{errors.no_hp_ayah}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Email Ayah</label>
                    <input
                      type="text"
                      name="email_ayah"
                      value={formData.email_ayah}
                      onChange={(e) => setFormData({
                      ...formData,
                      email_ayah: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Pekerjaan Ayah</label>
                    <select
                      name="pekerjaan_ayah"
                      value={formData.pekerjaan_ayah}
                      onChange={(e) => setFormData({
                      ...formData,
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

                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Pendidikan Ayah</label>
                    <select
                      name="pendidikan_ayah"
                      value={formData.pendidikan_ayah}
                      onChange={(e) => setFormData({
                      ...formData,
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

                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-start space-x-4">
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-white ${isSubmitting
                  ? 'bg-gray-400'
                  : 'bg-blue-600 hover:bg-blue-700'}`}
                  disabled={isSubmitting}>
                  {isSubmitting
                    ? 'Memproses...'
                    : id
                      ? 'Edit'
                      : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrangTuaKaderForm;
