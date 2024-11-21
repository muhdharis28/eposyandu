// DataWali.js
import React, { useEffect, useState } from 'react';
import {getPenggunaById, updatePenggunaWali} from '../../PenggunaService';
import axios from 'axios'; // Make sure to import axios

const DataWali = ({pekerjaanOptions, pendidikanOptions}) => {
    const userId = localStorage.getItem('userId');
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

  const [sameAsKtpWali,
    setSameAsKtpWali] = useState(false);

  const handleCheckboxChangeWali = (e) => {
    setSameAsKtpWali(e.target.checked);
    if (e.target.checked) {
      setWaliDetails((prevState) => {
        
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
      setWaliDetails((prevState) => ({
        ...prevState,
        provinsi_domisili_wali: '',
        kota_domisili_wali: '',
        kecamatan_domisili_wali: '',
        kelurahan_domisili_wali: '',
        alamat_domisili_wali: ''
      }));
    }
  };

  const [provinsiWali,
    setProvinsiWali] = useState([]); // Initialize as an array
  const [regenciesWali,
    setRegenciesWali] = useState([]);
  const [districtsWali,
    setDistrictsWali] = useState([]);
  const [villagesWali,
    setVillagesWali] = useState([]);
  const [provinsiWaliDom,
    setProvinsiWaliDom] = useState([]); // Initialize as an array
  const [regenciesWaliDom,
    setRegenciesWaliDom] = useState([]);
  const [districtsWaliDom,
    setDistrictsWaliDom] = useState([]);
  const [villagesWaliDom,
    setVillagesWaliDom] = useState([]);

    const handleProvinsiWaliChange = (e) => {
      const selectedProvinsiId = e.target.value;
      setOrangTuaDetails({
        ...orangTuaDetails,
        provinsi_ktp_wali: selectedProvinsiId
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
  
    const handleProvinsiWaliChangeDom = (e) => {
      const selectedProvinsiDomId = e.target.value;
      setOrangTuaDetails({
        ...orangTuaDetails,
        provinsi_domisili_wali: selectedProvinsiDomId
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
  
    const handleRegencyWaliChange = (e) => {
      const selectedRegencyId = e.target.value;
      setOrangTuaDetails({
        ...orangTuaDetails,
        kota_ktp_wali: selectedRegencyId
      });
  
      // Fetch districts when a regency is selected
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyId}/districts`)
        .then((response) => {
          setDistrictsIbu(response.data);
          setVillagesIbu([]); // Reset villages when regency changes
        })
        .catch((error) => console.error('Error fetching districts:', error));
    };
  
    const handleRegencyWaliChangeDom = (e) => {
      const selectedRegencyDomId = e.target.value;
      setOrangTuaDetails({
        ...orangTuaDetails,
        kota_domisili_wali: selectedRegencyDomId
      });
  
      // Fetch districts when a regency is selected
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${selectedRegencyDomId}/districts`)
        .then((response) => {
          setDistrictsIbuDom(response.data);
          setVillagesIbuDom([]); // Reset villages when regency changes
        })
        .catch((error) => console.error('Error fetching districts dom:', error));
    };
  
    const handleDistrictWaliChange = (e) => {
      const selectedDistrictId = e.target.value;
      setOrangTuaDetails({
        ...orangTuaDetails,
        kecamatan_ktp_wali: selectedDistrictId
      });
  
      // Fetch villages when a district is selected
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictId}/villages`)
        .then((response) => {
          setVillagesIbu(response.data);
        })
        .catch((error) => console.error('Error fetching villages:', error));
    };
  
    const handleDistrictWaliChangeDom = (e) => {
      const selectedDistrictDomId = e.target.value;
      setOrangTuaDetails({
        ...orangTuaDetails,
        kecamatan_domisili_wali: selectedDistrictDomId
      });
  
      // Fetch villages when a district is selected
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictDomId}/villages`)
        .then((response) => {
          setVillagesIbuDom(response.data);
        })
        .catch((error) => console.error('Error fetching villages dom:', error));
    };

  const [errors,
    setErrors] = useState({});

    const [isLoading,
        setIsLoading] = useState(true);

  const validateFormWali = () => {
    let formErrors = {};

    if (!waliDetails.no_kk) {
        formErrors.no_kk = 'No KK is required';
      } else if (!/^\d{16}$/.test(waliDetails.no_kk)) {
        formErrors.no_kk = 'No KK must be 16 digits';
      }

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

    if (!waliDetails.no_hp_wali) {
      formErrors.no_hp_wali = 'No HP Wali is required';
    } else if (!/^\d+$/.test(waliDetails.no_hp_wali)) {
      formErrors.no_hp_wali = 'No HP Wali must be a valid number';
    }

    if (!waliDetails.alamat_ktp_wali) {
      formErrors.alamat_ktp_wali = 'Alamat KTP Wali is required';
    }

    if (!waliDetails.alamat_domisili_wali) {
      formErrors.alamat_domisili_wali = 'Alamat Domisili Wali is required';
    }

    setErrors(formErrors);
    return Object
      .keys(formErrors)
      .length === 0;
  };

  useEffect(() => {
    const fetchWali = async() => {
      try {
        const response = await getPenggunaById(userId);

        if (response.data.waliDetail) {
          const wali = response.data.waliDetail;

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

          axios
            .get(`${import.meta.env.VITE_API_URL}/api/location/provinsi`)
            .then(response => {
              setProvinsiWali(response.data);
              setProvinsiWaliDom(response.data);
            })
            .catch(error => {
              console.error('Error fetching provinces:', error);
            });

          if (wali.provinsi_ktp_wali) {
            const regencyResponse = await
            axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${wali.provinsi_ktp_wali}/regencies`);
            setRegenciesWali(regencyResponse.data);

            if (wali.kota_ktp_wali) {
              const districtResponse = await
              axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${wali.kota_ktp_wali}/districts`);
              setDistrictsWali(districtResponse.data);

              if (wali.kecamatan_ktp_wali) {
                const villageResponse = await
                axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${wali.kecamatan_ktp_wali}/villages`);
                setVillagesWali(villageResponse.data);
              }
            }
          }

          if (wali.provinsi_domisili_wali) {
            const regencyDomResponse = await
            axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${wali.provinsi_domisili_wali}/regencies`);
            setRegenciesWaliDom(regencyDomResponse.data);

            if (wali.kota_domisili_wali) {
              const districtDomResponse = await
              axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${wali.kota_domisili_wali}/districts`);
              setDistrictsWaliDom(districtDomResponse.data);

              if (wali.kecamatan_domisili_wali) {
                const villageDomResponse = await
                axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${wali.kecamatan_domisili_wali}/villages`);
                setVillagesWaliDom(villageDomResponse.data);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching wali:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWali();
  }, [userId]);

  const handleUpdateWali = async(id) => {
    if (!validateFormWali()) {
      return; // If validation fails, stop execution
    }
    try {
      if(id){
        await updatePenggunaWali(id, waliDetails);
      } else {
        const wali = await createWali(waliDetails);

        await updatePenggunaWali(userId, {wali: wali.data.id});
      }
      
      alert('Wali details updated successfully.');
    } catch (error) {
      alert('Error updating wali details.');
    }
  };

  return (
    <div>
      <div
        className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
        <p className="text-sm font-bold">
          <span className="text-red-500">*</span>
          Wajib diisi
        </p>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">No KK 
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="no_kk"
            value={waliDetails.no_kk}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            no_kk: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
            {errors.no_kk && <p className="text-red-500 text-sm mt-1">{errors.no_kk}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">NIK Wali 
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nik_wali"
            value={waliDetails.nik_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            nik_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
            {errors.nik_wali && <p className="text-red-500 text-sm mt-1">{errors.nik_wali}</p>}
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">Nama Wali 
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nama_wali"
            value={waliDetails.nama_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            nama_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
            {errors.nama_wali && <p className="text-red-500 text-sm mt-1">{errors.nama_wali}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">Tempat Lahir Wali 
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="tempat_lahir_wali"
            value={waliDetails.tempat_lahir_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            tempat_lahir_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
            {errors.tempat_lahir_wali && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_wali}</p>}
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">Tanggal Lahir Wali 
            <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="tanggal_lahir_wali"
            value={waliDetails.tanggal_lahir_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            tanggal_lahir_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
            {errors.tanggal_lahir_wali && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_wali}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">Jenis Kelamin Wali 
            <span className="text-red-500">*</span>
          </label>
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
          {errors.jenis_kelamin_wali && <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin_wali}</p>}
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">Provinsi KTP Wali</label>
          <select
            name="provinsi_ktp_wali"
            value={waliDetails.provinsi_ktp_wali}
            onChange={handleProvinsiWaliChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md">
            <option value="">Pilih Provinsi</option>
            {provinsiWali.length > 0 && provinsiWali.map(v => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold">Kota KTP Wali</label>
          <select
            name="kota_ktp_wali"
            value={waliDetails.kota_ktp_wali}
            onChange={handleRegencyWaliChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            disabled={!regenciesWali.length}>
            <option value="">Pilih Kota</option>
            {regenciesWali.length > 0 && regenciesWali.map(v => (
              <option key={v.id} value={v.id}>
                {v.name}
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
              value={waliDetails.kecamatan_ktp_wali}
              onChange={handleDistrictWaliChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              disabled={!districtsWali.length}>
              <option value="">Pilih Kecamatan</option>
              {districtsWali.length > 0 && districtsWali.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold">Kelurahan KTP Wali</label>
            <select
              name="kelurahan_ktp_wali"
              value={waliDetails.kelurahan_ktp_wali}
              onChange={(e) => setWaliDetails({
              ...waliDetails,
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
          <label className="block text-sm font-semibold">Alamat KTP Wali 
            <span className="text-red-500">*</span>
          </label>
          <textarea
            type="text"
            name="alamat_ktp_wali"
            value={waliDetails.alamat_ktp_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            alamat_ktp_wali: e.target.value
          })}
          rows={4}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
            {errors.alamat_ktp_wali && <p className="text-red-500 text-sm mt-1">{errors.alamat_ktp_wali}</p>}
        </div>
      </div>
      <div className="col-span-2 mt-5">
        <label className="block text-sm font-semibold">
          <input
            type="checkbox"
            checked={sameAsKtpWali}
            onChange={handleCheckboxChangeWali}
            className="mr-2"/>
          Sama dengan Alamat KTP
        </label>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
          <div>
            <label className="block text-sm font-semibold">Provinsi Domisili Wali</label>
            <select
              name="provinsi_domisili_wali"
              value={waliDetails.provinsi_domisili_wali}
              onChange={handleProvinsiWaliChangeDom}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              disabled={sameAsKtpWali}>
              <option value="">Pilih Provinsi</option>
              {provinsiWaliDom.length > 0 && provinsiWaliDom.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold">Kota Domisili Wali</label>
            <select
              name="kota_domisili_wali"
              value={waliDetails.kota_domisili_wali}
              disabled={!regenciesWali.length || sameAsKtpWali}
              onChange={handleRegencyWaliChangeDom}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md">
            <option value="">Pilih Kota</option>
            {regenciesWaliDom.length > 0 && regenciesWaliDom.map(v => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-semibold">Kelurahan Domisili Wali</label>
            <select
                name="kelurahan_domisili_wali"
                value={waliDetails.kelurahan_domisili_wali}
                onChange={handleDistrictWaliChangeDom}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                disabled={!villagesWaliDom.length || sameAsKtpWali}>
                <option value="">Pilih Kelurahan</option>
                {villagesWaliDom.length > 0 && villagesWaliDom.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
          </div>
          <div>
            <label className="block text-sm font-semibold">Kecamatan Domisili Wali</label>
            <select
                name="kecamatan_domisili_wali"
                value={waliDetails.kecamatan_domisili_wali}
                onChange={(e) => setWaliDetails({
                ...waliDetails,
                kecamatan_domisili_wali: e.target.value
              })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                disabled={!districtsWaliDom.length || sameAsKtpWali}>
                <option value="">Pilih Kecamatan</option>
                {districtsWaliDom.length > 0 && districtsWaliDom.map(v => (
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
            value={waliDetails.alamat_domisili_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            alamat_domisili_wali: e.target.value
          })}
            rows={4}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
            {errors.alamat_domisili_wali && <p className="text-red-500 text-sm mt-1">{errors.alamat_domisili_wali}</p>}
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
            value={waliDetails.no_hp_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            no_hp_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
            {errors.no_hp_wali && <p className="text-red-500 text-sm mt-1">{errors.no_hp_wali}</p>}
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
          <label className="block text-sm font-semibold">Pekerjaan Wali</label>
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
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleUpdateWali(waliDetails.id)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
          Update Wali
        </button>
      </div>
    </div>
  );
};

export default DataWali;
