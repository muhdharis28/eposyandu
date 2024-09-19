import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DataDiriIbu = ({ formData, updateFormData }) => {
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
        console.error('Failed to fetch Pekerjaan data:', error);
      }
    };

    const fetchPendidikan = async () => {
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
        alamat_domisili_ibu: formData.alamat_ktp_ibu,
        provinsi_domisili_ibu: formData.provinsi_ktp_ibu,
        kota_domisili_ibu: formData.kota_ktp_ibu,
        kecamatan_domisili_ibu: formData.kecamatan_ktp_ibu,
        kelurahan_domisili_ibu: formData.kelurahan_ktp_ibu
      });
      
      // Set corresponding regions for Domisili fields
      handleProvinsiChangeDom({ target: { value: formData.provinsi_ktp_ibu } });
      handleRegencyChangeDom({ target: { value: formData.kota_ktp_ibu } });
      handleDistrictChangeDom({ target: { value: formData.kecamatan_ktp_ibu } });
    } else {
      // Clear domisili fields when toggle is OFF
      updateFormData({
        alamat_domisili_ibu: '',
        provinsi_domisili_ibu: '',
        kota_domisili_ibu: '',
        kecamatan_domisili_ibu: '',
        kelurahan_domisili_ibu: ''
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
    updateFormData({ provinsi_ktp_ibu: selectedProvinsiId });

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
    updateFormData({ provinsi_domisili_ibu: selectedProvinsiDomId });

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
    updateFormData({ kota_ktp_ibu: selectedRegencyId });

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
    updateFormData({ kota_domisili_ibu: selectedRegencyDomId });

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
    updateFormData({ kecamatan_ktp_ibu: selectedDistrictId });

    // Fetch villages when a district is selected
    axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictId}/villages`)
      .then((response) => {
        setVillages(response.data);
      })
      .catch((error) => console.error('Error fetching villages:', error));
  };

  const handleDistrictChangeDom = (e) => {
    const selectedDistrictDomId = e.target.value;
    updateFormData({ kecamatan_domisili_ibu: selectedDistrictDomId });

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

    if (!formData.nik_ibu) {
      formErrors.nik_ibu = 'NIK Ibu is required';
    } else if (!/^\d{16}$/.test(formData.nik_ibu)) {
      formErrors.nik_ibu = 'NIK Ibu must be 16 digits';
    }

    if (!formData.nama_ibu) {
      formErrors.nama_ibu = 'Nama Ibu is required';
    }

    if (!formData.tempat_lahir_ibu) {
      formErrors.tempat_lahir_ibu = 'Tempat Lahir Ibu is required';
    }

    if (!formData.tanggal_lahir_ibu) {
      formErrors.tanggal_lahir_ibu = 'Tanggal Lahir Ibu is required';
    }

    if (!formData.email_ibu) {
      formErrors.email_ibu = 'Email Ibu is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email_ibu)) {
      formErrors.email_ibu = 'Email Ibu is invalid';
    }

    if (!formData.no_hp_ibu) {
      formErrors.no_hp_ibu = 'No HP Ibu is required';
    } else if (!/^\d+$/.test(formData.no_hp_ibu)) {
      formErrors.no_hp_ibu = 'No HP Ibu must be a valid number';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log('fffffffffffffff', formData)
      navigate('/register/data-diri-ayah', { state: { formData } });
    }
  };

  const handleBack = () => {
    navigate('/register/details', { state: { formData } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="flex flex-col w-full max-w-6xl shadow-xl rounded-3xl bg-white border-2 border-gray-300 overflow-hidden">
        <div className="flex flex-col w-full md:flex-row">
          {/* Left Form Section */}
          <div className="w-full md:w-3/3 p-8 bg-white text-blue-800">
            <div className="flex items-center justify-between w-full mb-12">
              <h1 className="text-4xl font-bold" style={{ color: '#008EB3' }}>
                Data Diri Ibu
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
                <label className="block text-sm mb-2">NIK Ibu</label>
                <input
                  type="text"
                  name="nik_ibu"
                  value={formData.nik_ibu}
                  onChange={handleInputChange}
                  placeholder="NIK Ibu"
                  className={`w-full py-3 px-6 border ${errors.nik_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.nik_ibu && <p className="text-red-500 text-sm mt-1">{errors.nik_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Nama Ibu</label>
                <input
                  type="text"
                  name="nama_ibu"
                  value={formData.nama_ibu}
                  onChange={handleInputChange}
                  placeholder="Nama Ibu"
                  className={`w-full py-3 px-6 border ${errors.nama_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.nama_ibu && <p className="text-red-500 text-sm mt-1">{errors.nama_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempat_lahir_ibu"
                  value={formData.tempat_lahir_ibu}
                  onChange={handleInputChange}
                  placeholder="Tempat Lahir"
                  className={`w-full py-3 px-6 border ${errors.tempat_lahir_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.tempat_lahir_ibu && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggal_lahir_ibu"
                  value={formData.tanggal_lahir_ibu}
                  onChange={handleInputChange}
                  className={`w-full py-3 px-6 border ${errors.tanggal_lahir_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.tanggal_lahir_ibu && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email_ibu"
                  value={formData.email_ibu}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className={`w-full py-3 px-6 border ${errors.email_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.email_ibu && <p className="text-red-500 text-sm mt-1">{errors.email_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">No HP Ibu</label>
                <input
                  type="text"
                  name="no_hp_ibu"
                  value={formData.no_hp_ibu}
                  onChange={handleInputChange}
                  placeholder="No HP Ibu"
                  className={`w-full py-3 px-6 border ${errors.no_hp_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.no_hp_ibu && <p className="text-red-500 text-sm mt-1">{errors.no_hp_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Alamat KTP</label>
                <input
                  type="text"
                  name="alamat_ktp_ibu"
                  value={formData.alamat_ktp_ibu}
                  onChange={handleInputChange}
                  placeholder="Alamat KTP"
                  className={`w-full py-3 px-6 border ${errors.alamat_ktp_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Provinsi KTP</label>
                <select
                  name="provinsi_ktp_ibu"
                  value={formData.provinsi_ktp_ibu}
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
                {errors.provinsi_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.provinsi_ktp_ibu}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2">Kota KTP</label>
                <select
                  name="kota_ktp_ibu"
                  value={formData.kota_ktp_ibu}
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
                {errors.kota_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.kota_ktp_ibu}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2">Kecamatan KTP</label>
                <select
                  name="kecamatan_ktp_ibu"
                  value={formData.kecamatan_ktp_ibu}
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
                {errors.kecamatan_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.kecamatan_ktp_ibu}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2">Kelurahan KTP</label>
                <select
                  name="kelurahan_ktp_ibu"
                  value={formData.kelurahan_ktp_ibu}
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
                {errors.kelurahan_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.kelurahan_ktp_ibu}</p>}
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
                  name="alamat_domisili_ibu"
                  value={formData.alamat_domisili_ibu}
                  onChange={handleInputChange}
                  placeholder="Alamat Domisili"
                  className={`w-full py-3 px-6 border ${errors.alamat_domisili_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.alamat_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.alamat_domisili_ibu}</p>}
              </div>
              <div>
                <label className="block text-sm mb-2">Provinsi Domisili</label>
                <select
                  name="provinsi_domisili_ibu"
                  value={formData.provinsi_domisili_ibu}
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
                {errors.provinsi_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.provinsi_domisili_ibu}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2">Kota Domisili</label>
                <select
                  name="kota_domisili_ibu"
                  value={formData.kota_domisili_ibu}
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
                {errors.kota_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.kota_domisili_ibu}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2">Kecamatan Domisili</label>
                <select
                  name="kecamatan_domisili_ibu"
                  value={formData.kecamatan_domisili_ibu}
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
                {errors.kecamatan_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.kecamatan_domisili_ibu}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2">Kelurahan Domisili</label>
                <select
                  name="kelurahan_domisili_ibu"
                  value={formData.kelurahan_domisili_ibu}
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
                {errors.kelurahan_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.kelurahan_domisili_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Pekerjaan Ibu</label>
                <select
                  name="pekerjaan_ibu"
                  value={formData.pekerjaan_ibu}
                  onChange={handleInputChange}
                  className={`w-full py-3 px-6 border ${errors.pekerjaan_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                  <option value="">Pilih Pekerjaan Ibu</option>
                  {pekerjaanOptions.map((pekerjaan) => (
                    <option key={pekerjaan.id} value={pekerjaan.id}>
                      {pekerjaan.nama}
                    </option>
                  ))}
                </select>
                {errors.pekerjaan_ibu && <p className="text-red-500 text-sm mt-1">{errors.pekerjaan_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Pendidikan Ibu</label>
                <select
                  name="pendidikan_ibu"
                  value={formData.pendidikan_ibu}
                  onChange={handleInputChange}
                  className={`w-full py-3 px-6 border ${errors.pendidikan_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                  <option value="">Pilih Pendidikan Ibu</option>
                  {pendidikanOptions.map((pendidikan) => (
                    <option key={pendidikan.id} value={pendidikan.id}>
                      {pendidikan.nama}
                    </option>
                  ))}
                </select>
                {errors.pendidikan_ibu && <p className="text-red-500 text-sm mt-1">{errors.pendidikan_ibu}</p>}
              </div>
            </form>
            <div className="flex space-x-4 mt-6">
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

export default DataDiriIbu;
