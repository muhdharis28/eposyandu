import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {createWali, updateWali, getWaliById} from '../../WaliService';
import {getPosyandus} from '../../PosyanduService';
import axios from 'axios';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import {useSidebar} from '../../SideBarContext';
import {createPengguna, updatePengguna, getPenggunabyWali} from '../../PenggunaService';

const WaliForm = () => {
  const {id} = useParams();
  const [formData,
    setFormData] = useState({
    no_kk: '',
    nik_wali: '',
    nama_wali: '',
    tempat_lahir_wali: '',
    tanggal_lahir_wali: '',
    jenis_kelamin_wali: '',
    alamat_ktp_wali: '',
    kelurahan_ktp_wali: null,
    kecamatan_ktp_wali: null,
    kota_ktp_wali: null,
    provinsi_ktp_wali: null,
    alamat_domisili_wali: '',
    kelurahan_domisili_wali: null,
    kecamatan_domisili_wali: null,
    kota_domisili_wali: null,
    provinsi_domisili_wali: null,
    no_hp_wali: '',
    email_wali: '',
    pekerjaan_wali: null,
    pendidikan_wali: null,
    posyandu: null,
    foto_kk: null,
    kata_sandi: null
  });

  const [pekerjaanOptions,
    setPekerjaanOptions] = useState([]);
  const [pendidikanOptions,
    setPendidikanOptions] = useState([]);
  const {isSidebarCollapsed, toggleSidebar} = useSidebar();
  const navigate = useNavigate();
  const [posyanduOptions,
    setPosyanduOptions] = useState([]);
  const [errors,
    setErrors] = useState({});

  const [provinsiWali,
    setProvinsiWali] = useState([]);
  const [regenciesWali,
    setRegenciesWali] = useState([]);
  const [districtsWali,
    setDistrictsWali] = useState([]);
  const [villagesWali,
    setVillagesWali] = useState([]);
  const [provinsiWaliDom,
    setProvinsiWaliDom] = useState([]);
  const [regenciesWaliDom,
    setRegenciesWaliDom] = useState([]);
  const [districtsWaliDom,
    setDistrictsWaliDom] = useState([]);
  const [villagesWaliDom,
    setVillagesWaliDom] = useState([]);

  useEffect(() => {
    if (id) {
      loadWali();
    }
    loadPekerjaanOptions();
    loadPendidikanOptions();
    loadPosyandu();
    loadWilayah();
  }, [id]);

  const loadWilayah = async() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi`)
      .then(response => {
        setProvinsiWali(response.data);
        setProvinsiWaliDom(response.data);

      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });

    if (formData.provinsi_ktp_wali) {
      const regencyResponse = await
      axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${formData.provinsi_ktp_wali}/regencies`);
      setRegenciesWali(regencyResponse.data);

      if (formData.kota_ktp_wali) {
        const districtResponse = await
        axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${formData.kota_ktp_wali}/districts`);
        setDistrictsWali(districtResponse.data);

        if (formData.kecamatan_ktp_wali) {
          const villageResponse = await
          axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${formData.kecamatan_ktp_wali}/villages`);
          setVillagesWali(villageResponse.data);
        }
      }
    }

    if (formData.provinsi_domisili_wali) {
      const regencyDomResponse = await
      axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${formData.provinsi_domisili_wali}/regencies`);
      setRegenciesWaliDom(regencyDomResponse.data);

      if (formData.kota_domisili_wali) {
        const districtDomResponse = await
        axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${formData.kota_domisili_wali}/districts`);
        setDistrictsWaliDom(districtDomResponse.data);

        if (formData.kecamatan_domisili_wali) {
          const villageDomResponse = await
          axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${formData.kecamatan_domisili_wali}/villages`);
          setVillagesWaliDom(villageDomResponse.data);
        }
      }
    }
  }

  const createLogin = async(wali_id) => {
    try {
      const uploadedFilePath = await uploadFile();
      formData.foto_kk = uploadedFilePath;
      await createPengguna({
        'nama': formData.nama_wali,
        'email': formData.email_wali,
        'kata_sandi': formData
          .nik_wali
          .slice(-6),
        'role': 'user',
        'no_hp': formData.no_hp_wali,
        'no_kk': formData.no_kk,
        'no_ktp': formData.nik_wali,
        'foto_kk': uploadedFilePath,
        'wali': wali_id,
        'posyandu': formData.posyandu,
        'verifikasi': true
      });
    } catch (error) {
      console.error('Error submitting pengguna data:', error);
    }
  }

  const updateLogin = async(wali_id) => {
    try {
      const uploadedFilePath = await uploadFile();
      if (uploadedFilePath) {
        formData.foto_kk = uploadedFilePath;
      }

      const pengguna = await getPenggunabyWali(wali_id);
      if (!pengguna || !pengguna.data[0] || !pengguna.data[0].id) {
        console.error('Pengguna not found for wali ID:', wali_id);
        return;
      }

      const nikWali = formData.nik_wali
        ? String(formData.nik_wali)
        : "";
      const slicedNikWali = nikWali.slice(-6);

      const data = {
        'nama': formData.nama_wali,
        'email': formData.email_wali,
        'kata_sandi': slicedNikWali,
        'role': 'user',
        'no_hp': formData.no_hp_wali,
        'no_kk': formData.no_kk,
        'no_ktp': formData.nik_wali,
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

  const handleProvinsiWaliChange = (e) => {
    const selectedProvinsiId = e.target.value;
    setFormData({
      ...formData,
      provinsi_ktp_wali: selectedProvinsiId
    })

  
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiId}/regencies`)
      .then((response) => {
        setRegenciesWali(response.data);
        setDistrictsWali([]);
        setVillagesWali([]);
      })
      .catch((error) => console.error('Error fetching regencies:', error));
  };

  const handleProvinsiWaliChangeDom = (e) => {
    const selectedProvinsiDomId = e.target.value;
    setFormData({
      ...formData,
      provinsi_domisili_wali: selectedProvinsiDomId
    })

  
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiDomId}/regencies`)
      .then((response) => {
        setRegenciesWaliDom(response.data);
        setDistrictsWaliDom([]);
        setVillagesWaliDom([]);
      })
      .catch((error) => console.error('Error fetching regencies dom:', error));
  };

  const handleRegencyWaliChange = (e) => {
    const selectedRegencyId = e.target.value;
    setFormData({
      ...formData,
      kota_ktp_wali: selectedRegencyId
    });

  
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyId}/districts`)
      .then((response) => {
        setDistrictsWali(response.data);
        setVillagesWali([]);
      })
      .catch((error) => console.error('Error fetching districts:', error));
  };

  const handleRegencyWaliChangeDom = (e) => {
    const selectedRegencyDomId = e.target.value;
    setFormData({
      ...formData,
      kota_domisili_wali: selectedRegencyDomId
    });

  
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyDomId}/districts`)
      .then((response) => {
        setDistrictsWaliDom(response.data);
        setVillagesWaliDom([]);
      })
      .catch((error) => console.error('Error fetching districts dom:', error));
  };

  const handleDistrictWaliChange = (e) => {
    const selectedDistrictId = e.target.value;
    setFormData({
      ...formData,
      kecamatan_ktp_wali: selectedDistrictId
    });

  
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictId}/villages`)
      .then((response) => {
        setVillagesWali(response.data);
      })
      .catch((error) => console.error('Error fetching villages:', error));
  };

  const handleDistrictWaliChangeDom = (e) => {
    const selectedDistrictDomId = e.target.value;
    setFormData({
      ...formData,
      kecamatan_domisili_wali: selectedDistrictDomId
    });

  
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictDomId}/villages`)
      .then((response) => {
        setVillagesWaliDom(response.data);
      })
      .catch((error) => console.error('Error fetching villages dom:', error));
  };

  const loadPosyandu = async() => {
    try {
      const result = await getPosyandus();
      setPosyanduOptions(result.data);
    } catch (error) {
      console.error('Failed to load kader options:', error);
    }
  };

  const loadWali = async() => {
    try {
      const result = await getWaliById(id);
      setFormData(result.data);
    } catch (error) {
      console.error('Failed to load wali data:', error);
    }
  };

  const loadPekerjaanOptions = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pekerjaan`);
      setPekerjaanOptions(response.data);
    } catch (error) {
      console.error('Failed to fetch Pekerjaan data:', error);
    }
  };

  const loadPendidikanOptions = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pendidikan`);
      setPendidikanOptions(response.data);
    } catch (error) {
      console.error('Failed to fetch Pendidikan data:', error);
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

  const validateForm = () => {
    let formErrors = {};

    if (!formData.posyandu) {
      formErrors.posyandu = 'Posyandu wajib diisi';
    }

    if (!formData.no_kk) {
      formErrors.no_kk = 'No KK wajib diisi';
    } else if (!/^\d{16}$/.test(formData.no_kk)) {
      formErrors.no_kk = 'Nomor Kartu Keluarga harus 16 digit';
    }

    if (!formData.nik_wali) {
      formErrors.nik_wali = 'NIK Wali wajib diisi';
    } else if (!/^\d{16}$/.test(formData.nik_wali)) {
      formErrors.nik_wali = 'NIK Wali harus 16 digit';
    }

    if (!formData.nama_wali) {
      formErrors.nama_wali = 'Nama Wali wajib diisi';
    }

    if (!formData.jenis_kelamin_wali) {
      formErrors.jenis_kelamin_wali = 'Jenis Kelamin wajib diisi';
    }

    if (!formData.tempat_lahir_wali) {
      formErrors.tempat_lahir_wali = 'Tempat Lahir Wali wajib diisi';
    }

    if (!formData.tanggal_lahir_wali) {
      formErrors.tanggal_lahir_wali = 'Tanggal Lahir Wali wajib diisi';
    }

    if (!formData.no_hp_wali) {
      formErrors.no_hp_wali = 'No HP Wali wajib diisi';
    } else if (!/^\d+$/.test(formData.no_hp_wali)) {
      formErrors.no_hp_wali = 'No HP Wali nomor valid';
    }

    if (!formData.alamat_ktp_wali) {
      formErrors.alamat_ktp_wali = 'Alamat KTP Wali wajib diisi';
    }

    if (!formData.alamat_domisili_wali) {
      formErrors.alamat_domisili_wali = 'Alamat Domisili Wali wajib diisi';
    }

    setErrors(formErrors);
    return Object
      .keys(formErrors)
      .length === 0;
  };

  const [sameAsKtpWali,
    setSameAsKtpWali] = useState(false);

  const handleCheckboxChangeWali = (e) => {
    setSameAsKtpWali(e.target.checked);
    if (e.target.checked) {
      setFormData((prevState) => {

        return {
          ...prevState,
          provinsi_domisili_wali: prevState.provinsi_ktp_wali,
          kota_domisili_wali: prevState.kota_ktp_wali,
          kecamatan_domisili_wali: prevState.kecamatan_ktp_wali,
          kelurahan_domisili_wali: prevState.kelurahan_ktp_wali,
          alamat_domisili_wali: prevState.alamat_ktp_wali
        };
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        provinsi_domisili_wali: '',
        kota_domisili_wali: '',
        kecamatan_domisili_wali: '',
        kelurahan_domisili_wali: '',
        alamat_domisili_wali: ''
      }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (id) {
        await updateWali(id, formData);
        await updateLogin(id);
      } else {
        const wali = await createWali(formData);
        await createLogin(wali.data.id);
      }
      navigate('/wali');
    } catch (error) {
      console.error('Error submitting wali data:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/wali');
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full"/>
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed}/>

        <div
          className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Wali
            </button>
          </nav>
          <h1 className="text-2xl font-bold mb-4">{id
              ? 'Edit Wali'
              : 'Tambah Wali'}</h1>
          <div
            className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <p className="text-sm font-bold">
              <span className="text-red-500">*</span>
              Wajib diisi
            </p>
          </div>
          <form className="space-y-6">
            <div className="p-4 border border-gray-200 rounded-md">
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mb-5">
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
                  <label className="block text-sm font-semibold">Posyandu
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="posyandu"
                    value={formData.posyandu}
                    onChange={(e) => setFormData({
                    ...formData,
                    posyandu: e.target.value
                  })}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                    <option value="">Pilih Posyandu</option>
                    {posyanduOptions.length > 0 && posyanduOptions.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.nama}
                      </option>
                    ))}
                  </select>
                  {errors.posyandu && <p className="text-red-500 text-sm mt-1">{errors.posyandu}</p>}
                </div>
              </div>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mb-5">
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
              <div>
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">Data Wali</h3>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">NIK Wali
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nik_wali"
                      value={formData.nik_wali}
                      onChange={(e) => setFormData({
                      ...formData,
                      nik_wali: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nik_wali && <p className="text-red-500 text-sm mt-1">{errors.nik_wali}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Nama Wali
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nama_wali"
                      value={formData.nama_wali}
                      onChange={(e) => setFormData({
                      ...formData,
                      nama_wali: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nama_wali && <p className="text-red-500 text-sm mt-1">{errors.nama_wali}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Jenis Kelamin
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="jenis_kelamin_wali"
                      value={formData.jenis_kelamin_wali}
                      onChange={(e) => setFormData({
                        ...formData,
                        jenis_kelamin_wali: e.target.value
                      })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="l">Pilih</option>
                      <option value="l">Laki-laki</option>
                      <option value="p">Perempuan</option>
                    </select>
                    {errors.jenis_kelamin_wali && <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin_wali}</p>}
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Tempat Lahir Wali
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="tempat_lahir_wali"
                      value={formData.tempat_lahir_wali}
                      onChange={(e) => setFormData({
                      ...formData,
                      tempat_lahir_wali: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tempat_lahir_wali && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_wali}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Tanggal Lahir Wali
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="tanggal_lahir_wali"
                      value={formData.tanggal_lahir_wali}
                      onChange={(e) => setFormData({
                      ...formData,
                      tanggal_lahir_wali: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tanggal_lahir_wali && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_wali}</p>}
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Provinsi KTP Wali</label>
                    <select
                      name="provinsi_ktp_wali"
                      value={formData.provinsi_ktp_wali}
                      onChange={handleProvinsiWaliChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="">Pilih Provinsi</option>
                      {provinsiWali.length > 0 && provinsiWali.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Kota KTP Wali</label>
                    <select
                      name="kota_ktp_wali"
                      value={formData.kota_ktp_wali}
                      onChange={handleRegencyWaliChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={!regenciesWali.length}>
                      <option value="">Pilih Kota</option>
                      {regenciesWali.length > 0 && regenciesWali.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-semibold">Kecamatan KTP Wali</label>
                      <select
                        name="kecamatan_ktp_wali"
                        value={formData.kecamatan_ktp_wali}
                        onChange={handleDistrictWaliChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={!districtsWali.length}>
                        <option value="">Pilih Kecamatan</option>
                        {districtsWali.length > 0 && districtsWali.map(d => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold">Kelurahan KTP Wali</label>
                      <select
                        name="kelurahan_ktp_wali"
                        value={formData.kelurahan_ktp_wali}
                        onChange={(e) => setFormData({
                        ...formData,
                        kelurahan_ktp_wali: e.target.value
                      })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={!villagesWali.length}>
                        <option value="">Pilih Kelurahan</option>
                        {villagesWali.length > 0 && villagesWali.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">
                      Alamat KTP Wali
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="alamat_ktp_wali"
                      value={formData.alamat_ktp_wali}
                      onChange={(e) => setFormData({
                      ...formData,
                      alamat_ktp_wali: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      rows="4"/> {errors.alamat_ktp_wali && <p className="text-red-500 text-sm mt-1">{errors.alamat_ktp_wali}</p>}
                  </div>
                </div>
                <div className="col-span-2 mt-5">
                  <label className="block text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={sameAsKtpWali}
                      onChange={handleCheckboxChangeWali}
                      className="mr-2"/>
                    Sama dengan Alamat KTP Wali
                  </label>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Provinsi Domisili Wali</label>
                    <select
                      name="provinsi_domisili_wali"
                      value={formData.provinsi_domisili_wali}
                      onChange={handleProvinsiWaliChangeDom}
                      disabled={sameAsKtpWali}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="">Pilih Provinsi</option>
                      {provinsiWaliDom.length > 0 && provinsiWaliDom.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Kota Domisili Wali</label>
                    <select
                      name="kota_domisili_wali"
                      value={formData.kota_domisili_wali}
                      onChange={handleRegencyWaliChangeDom}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={sameAsKtpWali || !regenciesWaliDom.length}>
                      <option value="">Pilih Kota</option>
                      {regenciesWaliDom.length > 0 && regenciesWaliDom.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-semibold">Kecamatan Domisili Wali</label>
                      <select
                        name="kecamatan_domisili_wali"
                        value={formData.kecamatan_domisili_wali}
                        onChange={handleDistrictWaliChangeDom}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={sameAsKtpWali || !districtsWaliDom.length}>
                        <option value="">Pilih Kecamatan</option>
                        {districtsWaliDom.length > 0 && districtsWaliDom.map(d => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold">Kelurahan Domisili Wali</label>
                      <select
                        name="kelurahan_domisili_wali"
                        value={formData.kelurahan_domisili_wali}
                        onChange={(e) => setFormData({
                        ...formData,
                        kelurahan_domisili_wali: e.target.value
                      })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={sameAsKtpWali || !villagesWaliDom.length}>
                        <option value="">Pilih Kelurahan</option>
                        {villagesWaliDom.length > 0 && villagesWaliDom.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Alamat Domisili Wali
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      type="text"
                      name="alamat_domisili_wali"
                      disabled={sameAsKtpWali}
                      value={formData.alamat_domisili_wali}
                      onChange={(e) => setFormData({
                      ...formData,
                      alamat_domisili_wali: e.target.value
                    })}
                      rows="4"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.alamat_domisili_wali && <p className="text-red-500 text-sm mt-1">{errors.alamat_domisili_wali}</p>}
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">No Handphone Wali
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="no_hp_wali"
                      value={formData.no_hp_wali}
                      onChange={(e) => setFormData({
                      ...formData,
                      no_hp_wali: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.no_hp_wali && <p className="text-red-500 text-sm mt-1">{errors.no_hp_wali}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Email Wali</label>
                    <input
                      type="text"
                      name="email_wali"
                      value={formData.email_wali}
                      onChange={(e) => setFormData({
                      ...formData,
                      email_wali: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Pekerjaan Wali</label>
                    <select
                      name="pekerjaan_wali"
                      value={formData.pekerjaan_wali}
                      onChange={(e) => setFormData({
                      ...formData,
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
                      value={formData.pendidikan_wali}
                      onChange={(e) => setFormData({
                      ...formData,
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
              </div>
            </div>
          </form>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
              {id
                ? 'Edit'
                : 'Tambah'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaliForm;
