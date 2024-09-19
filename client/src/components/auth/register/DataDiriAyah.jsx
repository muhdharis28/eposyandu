import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DataDiriAyah = ({ formData, updateFormData }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [pekerjaanOptions, setPekerjaanOptions] = useState([]);
  const [pendidikanOptions, setPendidikanOptions] = useState([]);

  // Fetch data for Pekerjaan and Pendidikan
  useEffect(() => {
    const fetchPekerjaan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pekerjaan`);
        setPekerjaanOptions(response.data);
      } catch (error) {
        setPekerjaanOptions([]);
      }
    };

    const fetchPendidikan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pendidikan`);
        setPendidikanOptions(response.data);
      } catch (error) {
        setPendidikanOptions([]);
      }
    };

    fetchPekerjaan();
    fetchPendidikan();
  }, []);

  const [provinsi, setProvinsi] = useState([]);  // Initialize as an array
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [provinsiDom, setProvinsiDom] = useState([]);  // Initialize as an array
  const [regenciesDom, setRegenciesDom] = useState([]);
  const [districtsDom, setDistrictsDom] = useState([]);
  const [villagesDom, setVillagesDom] = useState([]);

  const [sameAsKTP, setSameAsKTP] = useState(false);

  const handleSameAsKTPToggle = () => {
    const isSame = !sameAsKTP;
    setSameAsKTP(isSame);

    if (isSame) {
      // Set domisili fields to match KTP fields when toggle is ON
      updateFormData({
        alamat_domisili_ayah: formData.alamat_ktp_ayah,
        provinsi_domisili_ayah: formData.provinsi_ktp_ayah,
        kota_domisili_ayah: formData.kota_ktp_ayah,
        kecamatan_domisili_ayah: formData.kecamatan_ktp_ayah,
        kelurahan_domisili_ayah: formData.kelurahan_ktp_ayah
      });
      
      // Set corresponding regions for Domisili fields
      handleProvinsiChangeDom({ target: { value: formData.provinsi_ktp_ayah } });
      handleRegencyChangeDom({ target: { value: formData.kota_ktp_ayah } });
      handleDistrictChangeDom({ target: { value: formData.kecamatan_ktp_ayah } });
    } else {
      // Clear domisili fields when toggle is OFF
      updateFormData({
        alamat_domisili_ayah: '',
        provinsi_domisili_ayah: '',
        kota_domisili_ayah: '',
        kecamatan_domisili_ayah: '',
        kelurahan_domisili_ayah: ''
      });
    }
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi`)
      .then(response => {
        setProvinsi(response.data);
        setProvinsiDom(response.data);
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });

  }, []);

  const handleProvinsiChange = (e) => {
    const selectedProvinsiId = e.target.value;
    updateFormData({ provinsi_ktp_ayah: selectedProvinsiId });

    // Fetch regencies when a province is selected
    axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiId}/regencies`)
      .then((response) => {
        setRegencies(response.data);
        setDistricts([]);  // Reset districts and villages when province changes
        setVillages([]);
      })
      .catch((error) => console.error('Error fetching regencies:', error));
  };

  const handleProvinsiChangeDom = (e) => {
    const selectedProvinsiDomId = e.target.value;
    updateFormData({ provinsi_domisili_ayah: selectedProvinsiDomId });

    // Fetch regencies when a province is selected
    axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiDomId}/regencies`)
      .then((response) => {
        setRegenciesDom(response.data);
        setDistrictsDom([]);  // Reset districts and villages when province changes
        setVillagesDom([]);
      })
      .catch((error) => console.error('Error fetching regencies dom:', error));
  };

  const handleRegencyChange = (e) => {
    const selectedRegencyId = e.target.value;
    updateFormData({ kota_ktp_ayah: selectedRegencyId });

    // Fetch districts when a regency is selected
    axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyId}/districts`)
      .then((response) => {
        setDistricts(response.data);
        setVillages([]);  // Reset villages when regency changes
      })
      .catch((error) => console.error('Error fetching districts:', error));
  };

  const handleRegencyChangeDom = (e) => {
    const selectedRegencyDomId = e.target.value;
    updateFormData({ kota_domisili_ayah: selectedRegencyDomId });

    // Fetch districts when a regency is selected
    axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyDomId}/districts`)
      .then((response) => {
        setDistrictsDom(response.data);
        setVillagesDom([]);  // Reset villages when regency changes
      })
      .catch((error) => console.error('Error fetching districts dom:', error));
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    updateFormData({ kecamatan_ktp_ayah: selectedDistrictId });

    // Fetch villages when a district is selected
    axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictId}/villages`)
      .then((response) => {
        setVillages(response.data);
      })
      .catch((error) => console.error('Error fetching villages:', error));
  };

  const handleDistrictChangeDom = (e) => {
    const selectedDistrictDomId = e.target.value;
    updateFormData({ kecamatan_domisili_ayah: selectedDistrictDomId });

    // Fetch villages when a district is selected
    axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictDomId}/villages`)
      .then((response) => {
        setVillagesDom(response.data);
      })
      .catch((error) => console.error('Error fetching villages dom:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.nik_ayah) {
      formErrors.nik_ayah = 'NIK Ayah is required';
    } else if (!/^\d{16}$/.test(formData.nik_ayah)) {
      formErrors.nik_ayah = 'NIK Ayah must be 16 digits';
    }

    if (!formData.nama_ayah) {
      formErrors.nama_ayah = 'Nama Ayah is required';
    }

    if (!formData.tempat_lahir_ayah) {
      formErrors.tempat_lahir_ayah = 'Tempat Lahir Ayah is required';
    }

    if (!formData.tanggal_lahir_ayah) {
      formErrors.tanggal_lahir_ayah = 'Tanggal Lahir Ayah is required';
    }

    if (!formData.email_ayah) {
      formErrors.email_ayah = 'Email Ayah is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email_ayah)) {
      formErrors.email_ayah = 'Email Ayah is invalid';
    }

    if (!formData.no_hp_ayah) {
      formErrors.no_hp_ayah = 'No HP Ayah is required';
    } else if (!/^\d+$/.test(formData.no_hp_ayah)) {
      formErrors.no_hp_ayah = 'No HP Ayah must be a valid number';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return; // If validation fails, stop execution
    }
    const confirmed = window.confirm('Apakah data yang anda masukkan sudah benar?');
    if (!confirmed) return;
    const fieldsToConvert = [
      'pekerjaan_ayah', 'pendidikan_ayah', 'pekerjaan_ayah', 'pendidikan_ayah'
    ];
    try {
      
      fieldsToConvert.forEach((field) => {
        if (typeof formData[field] === 'string') {
          formData[field] = parseInt(formData[field], 10);
        }
      });
      // Validate pekerjaan_ayah
      if (!formData.pekerjaan_ayah || !pekerjaanOptions.some(p => p.id === formData.pekerjaan_ayah)) {
        throw new Error('Invalid pekerjaan_ayah selected.');
      }
      // Validate pendidikan_ayah
      if (!formData.pendidikan_ayah || !pendidikanOptions.some(p => p.id === formData.pendidikan_ayah)) {
        throw new Error('Invalid pendidikan_ayah selected.');
      }
      // Validate pekerjaan_ayah
      if (!formData.pekerjaan_ayah || !pekerjaanOptions.some(p => p.id === formData.pekerjaan_ayah)) {
        throw new Error('Invalid pekerjaan_ayah selected.');
      }
      // Validate pendidikan_ayah
      if (!formData.pendidikan_ayah || !pendidikanOptions.some(p => p.id === formData.pendidikan_ayah)) {
        throw new Error('Invalid pendidikan_ayah selected.');
      }
      // Store OrangTua data
      const orangTuaResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/orangtua`, {
        no_kk: formData.no_kk,
        nik_ayah: formData.nik_ayah,
        nama_ayah: formData.nama_ayah,
        tempat_lahir_ayah: formData.tempat_lahir_ayah,
        tanggal_lahir_ayah: formData.tanggal_lahir_ayah,
        alamat_ktp_ayah: formData.alamat_ktp_ayah,
        kelurahan_ktp_ayah: formData.kelurahan_ktp_ayah,
        kecamatan_ktp_ayah: formData.kecamatan_ktp_ayah,
        kota_ktp_ayah: formData.kota_ktp_ayah,
        provinsi_ktp_ayah: formData.provinsi_ktp_ayah,
        alamat_domisili_ayah: formData.alamat_domisili_ayah,
        kelurahan_domisili_ayah: formData.kelurahan_domisili_ayah,
        kecamatan_domisili_ayah: formData.kecamatan_domisili_ayah,
        kota_domisili_ayah: formData.kota_domisili_ayah,
        provinsi_domisili_ayah: formData.provinsi_domisili_ayah,
        no_hp_ayah: formData.no_hp_ayah,
        email_ayah: formData.email_ayah,
        pekerjaan_ayah: formData.pekerjaan_ayah,
        pendidikan_ayah: formData.pendidikan_ayah,
        nik_ibu: formData.nik_ibu,
        nama_ibu: formData.nama_ibu,
        tempat_lahir_ibu: formData.tempat_lahir_ibu,
        tanggal_lahir_ibu: formData.tanggal_lahir_ibu,
        alamat_ktp_ibu: formData.alamat_ktp_ibu,
        kelurahan_ktp_ibu: formData.kelurahan_ktp_ibu,
        kecamatan_ktp_ibu: formData.kecamatan_ktp_ibu,
        kota_ktp_ibu: formData.kota_ktp_ibu,
        provinsi_ktp_ibu: formData.provinsi_ktp_ibu,
        alamat_domisili_ibu: formData.alamat_domisili_ibu,
        kelurahan_domisili_ibu: formData.kelurahan_domisili_ibu,
        kecamatan_domisili_ibu: formData.kecamatan_domisili_ibu,
        kota_domisili_ibu: formData.kota_domisili_ibu,
        provinsi_domisili_ibu: formData.provinsi_domisili_ibu,
        no_hp_ibu: formData.no_hp_ibu,
        email_ibu: formData.email_ibu,
        pekerjaan_ibu: formData.pekerjaan_ibu,
        pendidikan_ibu: formData.pendidikan_ibu,
        posyandu: formData.posyandu,
      });
      
      const uploadedFilePath = await uploadFile();
      // Store Pengguna data and associate with OrangTua
      await axios.post(`${import.meta.env.VITE_API_URL}/api/pengguna`, {
        nama: formData.nama,
        email: formData.email,
        kata_sandi: formData.kata_sandi, // Ensure this is hashed in the backend
        role: 'user', // Adjust as needed
        no_hp: formData.no_hp, 
        no_kk: formData.no_kk,
        no_ktp: formData.no_ktp,
        foto_kk: uploadedFilePath,
        orangtua: orangTuaResponse.data.id, // Use the ID returned from the OrangTua creation
        posyandu: formData.posyandu
      });

      navigate('/register/summary', { state: { formData } });
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    }
  };

  const uploadFile = async () => {
    if (!formData.foto_kk) return null;
    const formDataOrtu = new FormData();
    formDataOrtu.append('file', formData.foto_kk);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formDataOrtu);
      const filePath = `/uploads/${response.data.fileName}`;
      return filePath;
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrors('Failed to upload file');
      return null;
    }
  };

  const handleBack = () => {
    navigate('/register/data-diri-ibu', { state: { formData } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="flex flex-col w-full max-w-6xl shadow-xl rounded-3xl bg-white border-2 border-gray-300 overflow-hidden">
        <div className="flex flex-col w-full md:flex-row">
          {/* Left Form Section */}
          <div className="w-full md:w-3/3 p-8 bg-white text-blue-800">
            <div className="flex items-center justify-between w-full mb-12">
              <h1 className="text-4xl font-bold" style={{ color: '#008EB3' }}>
                Data Diri Ayah
              </h1>
              <button
                onClick={handleBack}
                className="text-blue-600 hover:underline text-lg"
              >
                ← Kembali
              </button>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Form Fields */}
              <div className="mb-4">
                <label className="block text-sm mb-2">NIK Ayah</label>
                <input
                  type="text"
                  name="nik_ayah"
                  value={formData.nik_ayah}
                  onChange={handleInputChange}
                  placeholder="NIK Ayah"
                  className={`w-full py-3 px-6 border ${errors.nik_ayah ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.nik_ayah && <p className="text-red-500 text-sm mt-1">{errors.nik_ayah}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Nama Ayah</label>
                <input
                  type="text"
                  name="nama_ayah"
                  value={formData.nama_ayah}
                  onChange={handleInputChange}
                  placeholder="Nama Ayah"
                  className={`w-full py-3 px-6 border ${errors.nama_ayah ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.nama_ayah && <p className="text-red-500 text-sm mt-1">{errors.nama_ayah}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempat_lahir_ayah"
                  value={formData.tempat_lahir_ayah}
                  onChange={handleInputChange}
                  placeholder="Tempat Lahir"
                  className={`w-full py-3 px-6 border ${errors.tempat_lahir_ayah ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.tempat_lahir_ayah && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_ayah}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggal_lahir_ayah"
                  value={formData.tanggal_lahir_ayah}
                  onChange={handleInputChange}
                  className={`w-full py-3 px-6 border ${errors.tanggal_lahir_ayah ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.tanggal_lahir_ayah && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_ayah}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">No HP</label>
                <input
                  type="text"
                  name="no_hp_ayah"
                  value={formData.no_hp_ayah}
                  onChange={handleInputChange}
                  placeholder="No KTP"
                  className={`w-full py-3 px-6 border ${errors.no_hp_ayah ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.no_hp_ayah && <p className="text-red-500 text-sm mt-1">{errors.no_hp_ayah}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email_ayah"
                  value={formData.email_ayah}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className={`w-full py-3 px-6 border ${errors.email_ayah ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.email_ayah && <p className="text-red-500 text-sm mt-1">{errors.email_ayah}</p>}
              </div>
              <div>
                <label className="block text-sm mb-2">Provinsi KTP</label>
                <select
                  name="provinsi_ktp_ayah"
                  value={formData.provinsi_ktp_ayah}
                  onChange={handleProvinsiChange}
                  className="w-full py-3 px-6 border rounded-full shadow-md"
                >
                  <option value="">Pilih Provinsi</option>
                  {provinsi.length > 0 && provinsi.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {errors.provinsi_ktp_ayah && <p className="text-red-500 text-sm mt-1">{errors.provinsi_ktp_ayah}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2">Kota KTP</label>
                <select
                  name="kota_ktp_ayah"
                  value={formData.kota_ktp_ayah}
                  onChange={handleRegencyChange}
                  className="w-full py-3 px-6 border rounded-full shadow-md"
                  disabled={!regencies.length}
                >
                  <option value="">Pilih Kota</option>
                  {regencies.length > 0 && regencies.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                {errors.kota_ktp_ayah && <p className="text-red-500 text-sm mt-1">{errors.kota_ktp_ayah}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2">Kecamatan KTP</label>
                <select
                  name="kecamatan_ktp_ayah"
                  value={formData.kecamatan_ktp_ayah}
                  onChange={handleDistrictChange}
                  className="w-full py-3 px-6 border rounded-full shadow-md"
                  disabled={!districts.length}
                >
                  <option value="">Pilih Kecamatan</option>
                  {districts.length > 0 && districts.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {errors.kecamatan_ktp_ayah && <p className="text-red-500 text-sm mt-1">{errors.kecamatan_ktp_ayah}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2">Kelurahan KTP</label>
                <select
                  name="kelurahan_ktp_ayah"
                  value={formData.kelurahan_ktp_ayah}
                  onChange={handleInputChange}
                  className="w-full py-3 px-6 border rounded-full shadow-md"
                  disabled={!villages.length}
                >
                  <option value="">Pilih Kelurahan</option>
                  {villages.length > 0 && villages.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
                {errors.kelurahan_ktp_ayah && <p className="text-red-500 text-sm mt-1">{errors.kelurahan_ktp_ayah}</p>}
              </div>
              {/* <div className="mb-4">
                <label className="block text-sm mb-2">Domisili Sama Dengan KTP</label>
                <input
                  type="checkbox"
                  checked={sameAsKTP}
                  onChange={handleSameAsKTPToggle}
                  className="mr-2"
                />
                <span>Ya</span>
              </div> */}
              <div className="mb-4">
                <label className="block text-sm mb-2">Alamat Domisili</label>
                <input
                  type="text"
                  name="alamat_domisili_ayah"
                  value={formData.alamat_domisili_ayah}
                  onChange={handleInputChange}
                  placeholder="Alamat Domisili"
                  className={`w-full py-3 px-6 border ${errors.alamat_domisili_ayah ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.alamat_domisili_ayah && <p className="text-red-500 text-sm mt-1">{errors.alamat_domisili_ayah}</p>}
              </div>
              <div>
                <label className="block text-sm mb-2">Provinsi Domisili</label>
                <select
                  name="provinsi_domisili_ayah"
                  value={formData.provinsi_domisili_ayah}
                  onChange={handleProvinsiChangeDom}
                  className="w-full py-3 px-6 border rounded-full shadow-md"
                >
                  <option value="">Pilih Provinsi</option>
                  {provinsiDom.length > 0 && provinsiDom.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {errors.provinsi_domisili_ayah && <p className="text-red-500 text-sm mt-1">{errors.provinsi_domisili_ayah}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2">Kota Domisili</label>
                <select
                  name="kota_domisili_ayah"
                  value={formData.kota_domisili_ayah}
                  onChange={handleRegencyChangeDom}
                  className="w-full py-3 px-6 border rounded-full shadow-md"
                  disabled={!regenciesDom.length}
                >
                  <option value="">Pilih Kota</option>
                  {regenciesDom.length > 0 && regenciesDom.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                {errors.kota_domisili_ayah && <p className="text-red-500 text-sm mt-1">{errors.kota_domisili_ayah}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2">Kecamatan Domisili</label>
                <select
                  name="kecamatan_domisili_ayah"
                  value={formData.kecamatan_domisili_ayah}
                  onChange={handleDistrictChangeDom}
                  className="w-full py-3 px-6 border rounded-full shadow-md"
                  disabled={!districtsDom.length}
                >
                  <option value="">Pilih Kecamatan</option>
                  {districtsDom.length > 0 && districtsDom.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {errors.kecamatan_domisili_ayah && <p className="text-red-500 text-sm mt-1">{errors.kecamatan_domisili_ayah}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2">Kelurahan Domisili</label>
                <select
                  name="kelurahan_domisili_ayah"
                  value={formData.kelurahan_domisili_ayah}
                  onChange={handleInputChange}
                  className="w-full py-3 px-6 border rounded-full shadow-md"
                  disabled={!villagesDom.length}
                >
                  <option value="">Pilih Kelurahan</option>
                  {villagesDom.length > 0 && villagesDom.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
                {errors.kelurahan_domisili_ayah && <p className="text-red-500 text-sm mt-1">{errors.kelurahan_domisili_ayah}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Pekerjaan Ayah</label>
                <select
                  name="pekerjaan_ayah"
                  value={formData.pekerjaan_ayah}
                  onChange={handleInputChange}
                  className={`w-full py-3 px-6 border ${errors.pekerjaan_ayah ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                  <option value="">Pilih Pekerjaan Ayah</option>
                  {pekerjaanOptions.map((pekerjaan) => (
                    <option key={pekerjaan.id} value={pekerjaan.id}>
                      {pekerjaan.nama}
                    </option>
                  ))}
                </select>
                {errors.pekerjaan_ayah && <p className="text-red-500 text-sm mt-1">{errors.pekerjaan_ayah}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Pendidikan Ayah</label>
                <select
                  name="pendidikan_ayah"
                  value={formData.pendidikan_ayah}
                  onChange={handleInputChange}
                  className={`w-full py-3 px-6 border ${errors.pendidikan_ayah ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                  <option value="">Pilih Pendidikan Ayah</option>
                  {pendidikanOptions.map((pendidikan) => (
                    <option key={pendidikan.id} value={pendidikan.id}>
                      {pendidikan.nama}
                    </option>
                  ))}
                </select>
                {errors.pendidikan_ayah && <p className="text-red-500 text-sm mt-1">{errors.pendidikan_ayah}</p>}
              </div>
            </form>
            <div className="flex space-x-4 mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="w-full py-3 rounded-full shadow-lg transition duration-300"
                style={{ backgroundColor: '#008EB3', color: 'white' }}
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3 rounded-full shadow-lg transition duration-300"
                style={{ backgroundColor: '#008EB3', color: 'white' }}
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDiriAyah;
