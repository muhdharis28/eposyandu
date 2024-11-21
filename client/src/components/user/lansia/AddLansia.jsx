import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for breadcrumb navigation
import { createLansia } from '../../LansiaService'; // Service to handle API requests
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getJobs } from '../../PekerjaanService'; // Import the service
import { getPendidikans } from '../../PendidikanService';
import { getPenggunaById } from '../../PenggunaService';
import axios from 'axios';

const AddLansiaForm = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
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
    pekerjaan_lansia: '',
    pendidikan_lansia: '',
    status_pernikahan_lansia: '',
    posyandu: null,
    wali: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pekerjaanOptions, setPekerjaanOptions] = useState([]);
  const [pendidikanOptions, setPendidikanOptions] = useState([]);
  const [errors, setErrors] = useState({}); // State to handle validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [provinsiLansia,
    setProvinsiLansia] = useState([]); // Initialize as an array
  const [regenciesLansia,
    setRegenciesLansia] = useState([]);
  const [districtsLansia,
    setDistrictsLansia] = useState([]);
  const [villagesLansia,
    setVillagesLansia] = useState([]);
  const [provinsiLansiaDom,
    setProvinsiLansiaDom] = useState([]); // Initialize as an array
  const [regenciesLansiaDom,
    setRegenciesLansiaDom] = useState([]);
  const [districtsLansiaDom,
    setDistrictsLansiaDom] = useState([]);
  const [villagesLansiaDom,
    setVillagesLansiaDom] = useState([]);

    const handleProvinsiLansiaChange = (e) => {
      const selectedProvinsiId = e.target.value;
      setFormData({
        ...formData,
        provinsi_ktp_lansia: selectedProvinsiId
      })
  
      // Fetch regencies when a province is selected
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiId}/regencies`)
        .then((response) => {
          setRegenciesLansia(response.data);
          setDistrictsLansia([]); // Reset districts and villages when province changes
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
  
      // Fetch regencies when a province is selected
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${selectedProvinsiDomId}/regencies`)
        .then((response) => {
          setRegenciesLansiaDom(response.data);
          setDistrictsLansiaDom([]); // Reset districts and villages when province changes
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
  
      // Fetch districts when a regency is selected
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyId}/districts`)
        .then((response) => {
          setDistrictsLansia(response.data);
          setVillagesLansia([]); // Reset villages when regency changes
        })
        .catch((error) => console.error('Error fetching districts:', error));
    };
  
    const handleRegencyLansiaChangeDom = (e) => {
      const selectedRegencyDomId = e.target.value;
      setFormData({
        ...formData,
        kota_domisili_lansia: selectedRegencyDomId
      });
  
      // Fetch districts when a regency is selected
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyDomId}/districts`)
        .then((response) => {
          setDistrictsLansiaDom(response.data);
          setVillagesLansiaDom([]); // Reset villages when regency changes
        })
        .catch((error) => console.error('Error fetching districts dom:', error));
    };
  
    const handleDistrictLansiaChange = (e) => {
      const selectedDistrictId = e.target.value;
      setFormData({
        ...formData,
        kecamatan_ktp_lansia: selectedDistrictId
      });
  
      // Fetch villages when a district is selected
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
  
      // Fetch villages when a district is selected
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictDomId}/villages`)
        .then((response) => {
          setVillagesLansiaDom(response.data);
        })
        .catch((error) => console.error('Error fetching villages dom:', error));
    };

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const pekerjaanRes = await getJobs();
        const pendidikanRes = await getPendidikans();

        setPekerjaanOptions(pekerjaanRes.data);
        setPendidikanOptions(pendidikanRes.data);
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
    };

    fetchDropdownOptions();
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

  const validateForm = () => {
    let newErrors = {};

    if (!formData.no_kk_lansia) newErrors.no_kk_lansia = 'Nomor KK wajib';
    if (!formData.nik_lansia) newErrors.nik_lansia = 'NIK wajib';
    if (!formData.nik_lansia || !/^\d{16}$/.test(formData.nik_lansia)) {
      errors.nik_lansia = 'NIK balita harus berupa 16 digit angka';
    }
    if (!formData.nama_lansia) newErrors.nama_lansia = 'Nama Lansia wajib';
    if (!formData.tempat_lahir_lansia) newErrors.tempat_lahir_lansia = 'Tempat Lahir wajib';
    if (!formData.tanggal_lahir_lansia) newErrors.tanggal_lahir_lansia = 'Tanggal Lahir wajib';
    if (!formData.jenis_kelamin_lansia) newErrors.jenis_kelamin_lansia = 'Jenis Kelamin wajib';
    if (!formData.alamat_ktp_lansia) newErrors.alamat_ktp_lansia = 'Alamat KTP wajib';
    if (!formData.alamat_domisili_lansia) newErrors.alamat_domisili_lansia = 'Alamat Domisili wajib';
    if (formData.email_lansia && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_lansia)) {
      newErrors.email_lansia = 'Email tidak valid';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return; // If validation fails, stop form submission
      }

    setIsSubmitting(true);
    try {
      const response = await getPenggunaById(userId);

      const updatedFormData = {
        ...formData,
        wali: response.data.waliDetail.id,
        posyandu: response.data.posyanduDetail.id
      };

      await createLansia(updatedFormData);
      navigate('/user-lansia');
    } catch (error) {
      console.error('Error adding Lansia:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          
          {/* Breadcrumb for navigation */}
          <nav className="text-gray-600 mb-4">
            <Link to="/user-lansia" className="hover:underline">Lansia List</Link> &gt; Tambah Lansia
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Tambah Lansia</h1>
            <div
              className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
              <p className="text-sm font-bold">
                <span className="text-red-500">*</span>
                Wajib diisi
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Four Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold">No KK
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="no_kk_lansia"
                    value={formData.no_kk_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.no_kk_lansia && <p className="text-red-500 text-sm">{errors.no_kk_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">NIK
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nik_lansia"
                    value={formData.nik_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.nik_lansia && <p className="text-red-500 text-sm">{errors.nik_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Nama Lansia
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama_lansia"
                    value={formData.nama_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.nama_lansia && <p className="text-red-500 text-sm">{errors.nama_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tempat Lahir
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="tempat_lahir_lansia"
                    value={formData.tempat_lahir_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.tempat_lahir_lansia && <p className="text-red-500 text-sm">{errors.tempat_lahir_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tanggal Lahir
                    <span className="text-red-500">*</span>                    
                  </label>
                  <input
                    type="date"
                    name="tanggal_lahir_lansia"
                    value={formData.tanggal_lahir_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.tanggal_lahir_lansia && <p className="text-red-500 text-sm">{errors.tanggal_lahir_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Jenis Kelamin
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenis_kelamin_lansia"
                    value={formData.jenis_kelamin_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih</option>
                    <option value="l">Laki-laki</option>
                    <option value="p">Perempuan</option>
                  </select>
                  {errors.jenis_kelamin_lansia && <p className="text-red-500 text-sm">{errors.jenis_kelamin_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Status Pernikahan
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status_pernikahan_lansia"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.status_pernikahan_lansia}
                    onChange={handleChange}
                    required>
                    <option value="Menikah">Menikah</option>
                    <option value="Duda">Duda</option>
                    <option value="Janda">Janda</option>
                    <option value="Tidak Menikah">Tidak Menikah</option>
                  </select>
                  {errors.status_pernikahan_lansia && <p className="text-red-500 text-sm">{errors.status_pernikahan_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Alamat KTP
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="alamat_ktp_lansia"
                    value={formData.alamat_ktp_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.alamat_ktp_lansia && <p className="text-red-500 text-sm">{errors.alamat_ktp_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Provinsi KTP</label>
                  <select
                    name="provinsi_ktp_lansia"
                    value={formData.provinsi_ktp_lansia}
                    onChange={handleProvinsiLansiaChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                    <option value="">Pilih Provinsi</option>
                    {provinsiLansia.length > 0 && provinsiLansia.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold">Kota KTP</label>
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
                  {errors.kota_ktp_lansia && <p className="text-red-500 text-sm">{errors.kota_ktp_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Kecamatan KTP</label>
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
                  <label className="block text-sm font-semibold">Kelurahan KTP</label>
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
                <div>
                  <label className="block text-sm font-semibold">Alamat Domisili
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="alamat_domisili_lansia"
                    value={formData.alamat_domisili_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    {errors.alamat_domisili_lansia && <p className="text-red-500 text-sm">{errors.alamat_domisili_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Provinsi Domisili</label>
                  <select
                      name="provinsi_domisili_lansia"
                      value={formData.provinsi_domisili_lansia}
                      onChange={handleProvinsiLansiaChangeDom}
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
                  <label className="block text-sm font-semibold">Kota Domisili</label>
                  <select
                      name="kota_domisili_lansia"
                      value={formData.kota_domisili_lansia}
                      onChange={handleRegencyLansiaChangeDom}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      disabled={!regenciesLansiaDom.length}>
                      <option value="">Pilih Kota</option>
                      {regenciesLansiaDom.length > 0 && regenciesLansiaDom.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold">Kota Domisili</label>
                  <select
                        name="kecamatan_domisili_lansia"
                        value={formData.kecamatan_domisili_lansia}
                        onChange={handleDistrictLansiaChangeDom}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        disabled={!districtsLansiaDom.length}>
                        <option value="">Pilih Kecamatan</option>
                        {districtsLansiaDom.length > 0 && districtsLansiaDom.map(d => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold">Kelurahan Domisili</label>
                  <select
                    name="kelurahan_domisili_lansia"
                    value={formData.kelurahan_domisili_lansia}
                    onChange={(e) => setFormData({
                    ...formData,
                    kelurahan_domisili_lansia: e.target.value
                  })}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    disabled={!villagesLansiaDom.length}>
                    <option value="">Pilih Kelurahan</option>
                    {villagesLansiaDom.length > 0 && villagesLansiaDom.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold">No HP
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="no_hp_lansia"
                    value={formData.no_hp_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    {errors.no_hp_lansia && <p className="text-red-500 text-sm">{errors.no_hp_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    name="email_lansia"
                    value={formData.email_lansia}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    {errors.email_lansia && <p className="text-red-500 text-sm">{errors.email_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Pekerjaan</label>
                  <select
                    name="pekerjaan_lansia"
                    value={formData.pekerjaan_lansia}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Pekerjaan</option>
                    {pekerjaanOptions.map((pekerjaan) => (
                      <option key={pekerjaan.id} value={pekerjaan.id}>
                        {pekerjaan.nama}
                      </option>
                    ))}
                  </select>
                  {errors.pekerjaan_lansia && <p className="text-red-500 text-sm">{errors.pekerjaan_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Pendidikan</label>
                  <select
                    name="pendidikan_lansia"
                    value={formData.pendidikan_lansia}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Pendidikan</option>
                    {pendidikanOptions.map((pendidikan) => (
                      <option key={pendidikan.id} value={pendidikan.id}>
                        {pendidikan.nama}
                      </option>
                    ))}
                  </select>
                  {errors.pendidikan_lansia && <p className="text-red-500 text-sm">{errors.pendidikan_lansia}</p>}
                </div>
                
              </div>

              <button
                type="submit"
                className={`mt-6 px-6 py-2 rounded-lg text-white ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Mengirimkan...' : 'Tambah'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLansiaForm;
