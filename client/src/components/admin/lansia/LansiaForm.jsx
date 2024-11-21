import React, {useState, useEffect} from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import {useSidebar} from '../../SideBarContext';
import {createLansia, updateLansia, getLansiaById} from '../../LansiaService';
import {useNavigate, useParams} from 'react-router-dom';
import {getWali} from '../../WaliService';
import axios from 'axios';
import {getPosyandus} from '../../PosyanduService';

const LansiaForm = () => {
  const {id} = useParams();
  const [formData,
    setFormData] = useState({
    no_kk_lansia: '',
    nik_lansia: '',
    nama_lansia: '',
    tempat_lahir_lansia: '',
    tanggal_lahir_lansia: '',
    jenis_kelamin_lansia: '',
    alamat_ktp_lansia: '',
    kelurahan_ktp_lansia: null,
    kecamatan_ktp_lansia: null,
    kota_ktp_lansia: null,
    provinsi_ktp_lansia: null,
    alamat_domisili_lansia: '',
    kelurahan_domisili_lansia: null,
    kecamatan_domisili_lansia: null,
    kota_domisili_lansia: null,
    provinsi_domisili_lansia: null,
    no_hp_lansia: '',
    email_lansia: '',
    pekerjaan_lansia: null,
    pendidikan_lansia: null,
    status_pernikahan_lansia: '',
    posyandu: null,
    wali: null
  });

  const {isSidebarCollapsed, toggleSidebar} = useSidebar();
  const navigate = useNavigate();
  const [pekerjaanOptions,
    setPekerjaanOptions] = useState([]);
  const [pendidikanOptions,
    setPendidikanOptions] = useState([]);
  const [waliList,
    setWaliList] = useState([]);
  const [posyanduOptions,
    setPosyanduOptions] = useState([]);
  const [errors,
    setErrors] = useState({});

  useEffect(() => {
    if (id) {
      loadLansia();
    }
  }, [id]);

  const [provinsiLansia,
    setProvinsiLansia] = useState([]);
  const [regenciesLansia,
    setRegenciesLansia] = useState([]);
  const [districtsLansia,
    setDistrictsLansia] = useState([]);
  const [villagesLansia,
    setVillagesLansia] = useState([]);
  const [provinsiLansiaDom,
    setProvinsiLansiaDom] = useState([]);
  const [regenciesLansiaDom,
    setRegenciesLansiaDom] = useState([]);
  const [districtsLansiaDom,
    setDistrictsLansiaDom] = useState([]);
  const [villagesLansiaDom,
    setVillagesLansiaDom] = useState([]);

  useEffect(() => {
    const fetchPekerjaan = async() => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pekerjaan`);
        setPekerjaanOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch Pekerjaan data:', error);
      }
    };

    const fetchWali = async() => {
      try {
        const result = await getWali();
        setWaliList(result.data);
      } catch (error) {
        console.error('Failed to fetch wali data:', error);
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
    fetchWali();
    loadPosyandu();
    loadWilayah();
  }, []);

  const loadWilayah = async() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi`)
      .then(response => {
        setProvinsiLansia(response.data);
        setProvinsiLansiaDom(response.data);

      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });

    if (formData.provinsi_ktp_lansia) {
      const regencyResponse = await
      axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${formData.provinsi_ktp_lansia}/regencies`);
      setRegenciesLansia(regencyResponse.data);

      if (formData.kota_ktp_lansia) {
        const districtResponse = await
        axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${formData.kota_ktp_lansia}/districts`);
        setDistrictsLansia(districtResponse.data);

        if (formData.kecamatan_ktp_lansia) {
          const villageResponse = await
          axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${formData.kecamatan_ktp_lansia}/villages`);
          setVillagesLansia(villageResponse.data);
        }
      }
    }

    if (formData.provinsi_domisili_lansia) {
      const regencyDomResponse = await
      axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${formData.provinsi_domisili_lansia}/regencies`);
      setRegenciesLansiaDom(regencyDomResponse.data);

      if (formData.kota_domisili_lansia) {
        const districtDomResponse = await
        axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${formData.kota_domisili_lansia}/districts`);
        setDistrictsLansiaDom(districtDomResponse.data);

        if (formData.kecamatan_domisili_lansia) {
          const villageDomResponse = await
          axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${formData.kecamatan_domisili_lansia}/villages`);
          setVillagesLansiaDom(villageDomResponse.data);
        }
      }
    }
  }

  const handleProvinsiLansiaChange = (e) => {
    const selectedProvinsiId = e.target.value;
    setFormData({
      ...formData,
      provinsi_ktp_lansia: selectedProvinsiId
    })

   
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiId}/regencies`)
      .then((response) => {
        setRegenciesLansia(response.data);
        setDistrictsLansia([]);
        setVillagesLansia([]);
      })
      .catch((error) => console.error('Error fetching regencies:', error));
  };

  const handleProvinsiLansiaChangeDom = (e) => {
    const selectedProvinsiDomId = e.target.value;
    setFormData({
      ...formData,
      provinsi_domisili_lansia: selectedProvinsiDomId
    })

   
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiDomId}/regencies`)
      .then((response) => {
        setRegenciesLansiaDom(response.data);
        setDistrictsLansiaDom([]);
        setVillagesLansiaDom([]);
      })
      .catch((error) => console.error('Error fetching regencies dom:', error));
  };

  const handleRegencyLansiaChange = (e) => {
    const selectedRegencyId = e.target.value;
    setFormData({
      ...formData,
      kota_ktp_lansia: selectedRegencyId
    });

   
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyId}/districts`)
      .then((response) => {
        setDistrictsLansia(response.data);
        setVillagesLansia([]);
      })
      .catch((error) => console.error('Error fetching districts:', error));
  };

  const handleRegencyLansiaChangeDom = (e) => {
    const selectedRegencyDomId = e.target.value;
    setFormData({
      ...formData,
      kota_domisili_lansia: selectedRegencyDomId
    });

   
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyDomId}/districts`)
      .then((response) => {
        setDistrictsLansiaDom(response.data);
        setVillagesLansiaDom([]);
      })
      .catch((error) => console.error('Error fetching districts dom:', error));
  };

  const handleDistrictLansiaChange = (e) => {
    const selectedDistrictId = e.target.value;
    setFormData({
      ...formData,
      kecamatan_ktp_lansia: selectedDistrictId
    });

   
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictId}/villages`)
      .then((response) => {
        setVillagesLansia(response.data);
      })
      .catch((error) => console.error('Error fetching villages:', error));
  };

  const handleDistrictLansiaChangeDom = (e) => {
    const selectedDistrictDomId = e.target.value;
    setFormData({
      ...formData,
      kecamatan_domisili_lansia: selectedDistrictDomId
    });

   
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictDomId}/villages`)
      .then((response) => {
        setVillagesLansiaDom(response.data);
      })
      .catch((error) => console.error('Error fetching villages dom:', error));
  };

  const loadPosyandu = async() => {
    try {
      const result = await getPosyandus();
      setPosyanduOptions(result.data);
    } catch (error) {
      console.error('Failed to load posyandu options:', error);
    }
  };

  const [sameAsKtpLansia,
    setSameAsKtpLansia] = useState(false);

  const handleCheckboxChangeLansia = (e) => {
    setSameAsKtpLansia(e.target.checked);
    if (e.target.checked) {
      setFormData((prevState) => {

        return {
          ...prevState,
          provinsi_domisili_lansia: prevState.provinsi_ktp_lansia,
          kota_domisili_lansia: prevState.kota_ktp_lansia,
          kecamatan_domisili_lansia: prevState.kecamatan_ktp_lansia,
          kelurahan_domisili_lansia: prevState.kelurahan_ktp_lansia,
          alamat_domisili_lansia: prevState.alamat_ktp_lansia
        };
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        provinsi_domisili_lansia: '',
        kota_domisili_lansia: '',
        kecamatan_domisili_lansia: '',
        kelurahan_domisili_lansia: '',
        alamat_domisili_lansia: ''
      }));
    }
  };

  const loadLansia = async() => {
    try {
      const result = await getLansiaById(id);
      setFormData(result.data);
    } catch (error) {
      console.error('Failed to load lansia data:', error);
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.posyandu) {
      formErrors.posyandu = 'Posyandu wajib diisi';
    }

    if (!formData.wali) {
      formErrors.wali = 'Wali wajib diisi';
    }

    if (!formData.no_kk_lansia) {
      formErrors.no_kk_lansia = 'No KK wajib diisi';
    } else if (!/^\d{16}$/.test(formData.no_kk_lansia)) {
      formErrors.no_kk_lansia = 'Nomor Kartu Keluarga harus 16 digit';
    }

    if (!formData.nik_lansia) {
      formErrors.nik_lansia = 'NIK Lansia wajib diisi';
    } else if (!/^\d{16}$/.test(formData.nik_lansia)) {
      formErrors.nik_lansia = 'NIK Lansia harus 16 digit';
    }

    if (!formData.nama_lansia) {
      formErrors.nama_lansia = 'Nama Lansia wajib diisi';
    }

    if (!formData.tempat_lahir_lansia) {
      formErrors.tempat_lahir_lansia = 'Tempat Lahir Lansia wajib diisi';
    }

    if (!formData.tanggal_lahir_lansia) {
      formErrors.tanggal_lahir_lansia = 'Tanggal Lahir Lansia wajib diisi';
    }

    if (!formData.no_hp_lansia) {
      formErrors.no_hp_lansia = 'No HP Lansia wajib diisi';
    } else if (!/^\d+$/.test(formData.no_hp_lansia)) {
      formErrors.no_hp_lansia = 'No HP Lansia nomor valid';
    }

    if (!formData.alamat_ktp_lansia) {
      formErrors.alamat_ktp_lansia = 'Alamat KTP Lansia wajib diisi';
    }

    if (!formData.alamat_domisili_lansia) {
      formErrors.alamat_domisili_lansia = 'Alamat Domisili Lansia wajib diisi';
    }

    if (!formData.wali) {
      formErrors.wali = 'Wali Lansia wajib diisi';
    }

    if (!formData.jenis_kelamin_lansia) {
      formErrors.jenis_kelamin_lansia = 'Jenis Kelamin Lansia wajib diisi';
    }

    if (!formData.status_pernikahan_lansia) {
      formErrors.status_pernikahan_lansia = 'Status Pernikahan Lansia wajib diisi';
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
    try {
      if (id) {
        await updateLansia(id, formData);
      } else {
        await createLansia(formData);
      }
      navigate('/lansia');
    } catch (error) {
      console.error('Error submitting lansia data:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/lansia');
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
              &lt; Kembali ke Daftar Lansia
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id
              ? 'Edit Lansia'
              : 'Tambah Lansia'}</h2>
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
                    name="no_kk_lansia"
                    value={formData.no_kk_lansia}
                    onChange={(e) => setFormData({
                    ...formData,
                    no_kk_lansia: e.target.value
                  })}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.no_kk_lansia && <p className="text-red-500 text-sm mt-1">{errors.no_kk_lansia}</p>}
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
                  <label className="block text-sm font-semibold">Wali
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="wali"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.wali}
                    onChange={handleChange}>
                    <option value="">Pilih Wali</option>
                    {waliList.map((wali) => (
                      <option key={wali.id} value={wali.id}>
                        {wali.nama_wali}
                      </option>
                    ))}
                  </select>
                  {errors.wali && <p className="text-red-500 text-sm mt-1">{errors.wali}</p>}
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">Data Lansia</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0">
                  <div>
                    <label className="block text-sm font-semibold">NIK Lansia
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nik_lansia"
                      value={formData.nik_lansia}
                      onChange={(e) => setFormData({
                      ...formData,
                      nik_lansia: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nik_lansia && <p className="text-red-500 text-sm mt-1">{errors.nik_lansia}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Nama Lansia
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nama_lansia"
                      value={formData.nama_lansia}
                      onChange={(e) => setFormData({
                      ...formData,
                      nama_lansia: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nama_lansia && <p className="text-red-500 text-sm mt-1">{errors.nama_lansia}</p>}
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Tempat Lahir Lansia
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="tempat_lahir_lansia"
                      value={formData.tempat_lahir_lansia}
                      onChange={(e) => setFormData({
                      ...formData,
                      tempat_lahir_lansia: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tempat_lahir_lansia && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_lansia}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Tanggal Lahir Lansia
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="tanggal_lahir_lansia"
                      value={formData.tanggal_lahir_lansia}
                      onChange={(e) => setFormData({
                      ...formData,
                      tanggal_lahir_lansia: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tanggal_lahir_lansia && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_lansia}</p>}
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Jenis Kelamin
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="jenis_kelamin_lansia"
                      value={formData.jenis_kelamin_lansia}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="l">Laki-laki</option>
                      <option value="p">Perempuan</option>
                    </select>
                    {errors.jenis_kelamin_lansia && <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin_lansia}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Status Pernikahan
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status_pernikahan_lansia"
                      value={formData.status_pernikahan_lansia}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="Menikah">Menikah</option>
                      <option value="Duda">Duda</option>
                      <option value="Janda">Janda</option>
                      <option value="Tidak Menikah">Tidak Menikah</option>
                    </select>
                    {errors.status_pernikahan_lansia && <p className="text-red-500 text-sm mt-1">{errors.status_pernikahan_lansia}</p>}
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Provinsi KTP Lansia</label>
                    <select
                      name="provinsi_ktp_lansia"
                      value={formData.provinsi_ktp_lansia}
                      onChange={handleProvinsiLansiaChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="">Pilih Provinsi</option>
                      {provinsiLansia.length > 0 && provinsiLansia.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Kota KTP Lansia</label>
                    <select
                      name="kota_ktp_lansia"
                      value={formData.kota_ktp_lansia}
                      onChange={handleRegencyLansiaChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={!regenciesLansia.length}>
                      <option value="">Pilih Kota</option>
                      {regenciesLansia.length > 0 && regenciesLansia.map(r => (
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
                      <label className="block text-sm font-semibold">Kecamatan KTP Lansia</label>
                      <select
                        name="kecamatan_ktp_lansia"
                        value={formData.kecamatan_ktp_lansia}
                        onChange={handleDistrictLansiaChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={!districtsLansia.length}>
                        <option value="">Pilih Kecamatan</option>
                        {districtsLansia.length > 0 && districtsLansia.map(d => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold">Kelurahan KTP Lansia</label>
                      <select
                        name="kelurahan_ktp_lansia"
                        value={formData.kelurahan_ktp_lansia}
                        onChange={(e) => setFormData({
                        ...formData,
                        kelurahan_ktp_lansia: e.target.value
                      })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={!villagesLansia.length}>
                        <option value="">Pilih Kelurahan</option>
                        {villagesLansia.length > 0 && villagesLansia.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">
                      Alamat KTP Lansia
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="alamat_ktp_lansia"
                      value={formData.alamat_ktp_lansia}
                      onChange={(e) => setFormData({
                      ...formData,
                      alamat_ktp_lansia: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      rows="4"/> {errors.alamat_ktp_lansia && <p className="text-red-500 text-sm mt-1">{errors.alamat_ktp_lansia}</p>}
                  </div>
                </div>
                <div className="col-span-2 mt-5">
                  <label className="block text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={sameAsKtpLansia}
                      onChange={handleCheckboxChangeLansia}
                      className="mr-2"/>
                    Sama dengan Alamat KTP Lansia
                  </label>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Provinsi Domisili Lansia</label>
                    <select
                      name="provinsi_domisili_lansia"
                      value={formData.provinsi_domisili_lansia}
                      onChange={handleProvinsiLansiaChangeDom}
                      disabled={sameAsKtpLansia}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="">Pilih Provinsi</option>
                      {provinsiLansiaDom.length > 0 && provinsiLansiaDom.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Kota Domisili Lansia</label>
                    <select
                      name="kota_domisili_lansia"
                      value={formData.kota_domisili_lansia}
                      onChange={handleRegencyLansiaChangeDom}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={sameAsKtpLansia || !regenciesLansiaDom.length}>
                      <option value="">Pilih Kota</option>
                      {regenciesLansiaDom.length > 0 && regenciesLansiaDom.map(r => (
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
                      <label className="block text-sm font-semibold">Kecamatan Domisili Lansia</label>
                      <select
                        name="kecamatan_domisili_lansia"
                        value={formData.kecamatan_domisili_lansia}
                        onChange={handleDistrictLansiaChangeDom}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={sameAsKtpLansia || !districtsLansiaDom.length}>
                        <option value="">Pilih Kecamatan</option>
                        {districtsLansiaDom.length > 0 && districtsLansiaDom.map(d => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold">Kelurahan Domisili Lansia</label>
                      <select
                        name="kelurahan_domisili_lansia"
                        value={formData.kelurahan_domisili_lansia}
                        onChange={(e) => setFormData({
                        ...formData,
                        kelurahan_domisili_lansia: e.target.value
                      })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={sameAsKtpLansia || !villagesLansiaDom.length}>
                        <option value="">Pilih Kelurahan</option>
                        {villagesLansiaDom.length > 0 && villagesLansiaDom.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Alamat Domisili Lansia
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      type="text"
                      name="alamat_domisili_lansia"
                      disabled={sameAsKtpLansia}
                      value={formData.alamat_domisili_lansia}
                      onChange={(e) => setFormData({
                      ...formData,
                      alamat_domisili_lansia: e.target.value
                    })}
                      rows="4"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.alamat_domisili_lansia && <p className="text-red-500 text-sm mt-1">{errors.alamat_domisili_lansia}</p>}
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">No Handphone Lansia
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="no_hp_lansia"
                      value={formData.no_hp_lansia}
                      onChange={(e) => setFormData({
                      ...formData,
                      no_hp_lansia: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.no_hp_lansia && <p className="text-red-500 text-sm mt-1">{errors.no_hp_lansia}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Email Lansia</label>
                    <input
                      type="text"
                      name="email_lansia"
                      value={formData.email_lansia}
                      onChange={(e) => setFormData({
                      ...formData,
                      email_lansia: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Pekerjaan Lansia</label>
                    <select
                      name="pekerjaan_lansia"
                      value={formData.pekerjaan_lansia}
                      onChange={(e) => setFormData({
                      ...formData,
                      pekerjaan_lansia: e.target.value
                    })}
                      className="w-full p-2 border border-gray-300 rounded">
                      <option value="">Pilih Pekerjaan Lansia</option>
                      {pekerjaanOptions.map((pekerjaan) => (
                        <option key={pekerjaan.id} value={pekerjaan.id}>
                          {pekerjaan.nama}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Pendidikan Lansia</label>
                    <select
                      name="pendidikan_lansia"
                      value={formData.pendidikan_lansia}
                      onChange={(e) => setFormData({
                      ...formData,
                      pendidikan_lansia: e.target.value
                    })}
                      className="w-full p-2 border border-gray-300 rounded">
                      <option value="">Pilih Pendidikan Lansia</option>
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

export default LansiaForm;
