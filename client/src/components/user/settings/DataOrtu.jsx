// DataOrtu.js
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import {getPenggunaById, updatePenggunaOrtu} from '../../PenggunaService';

const DataOrtu = ({pekerjaanOptions, pendidikanOptions}) => {
    const userId = localStorage.getItem('userId');
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

  const [sameAsKtpIbu, setSameAsKtpIbu] = useState(false);
  const [sameAsKtpAyah, setSameAsKtpAyah] = useState(false);

  const handleCheckboxChangeIbu = (e) => {
    setSameAsKtpIbu(e.target.checked);
    if (e.target.checked) {
      setOrangTuaDetails((prevState) => {
        // Trigger the change handlers after setting the state
        // handleProvinsiIbuChangeDom({ target: { value: prevState.provinsi_ktp_ibu } });
        // handleRegencyIbuChangeDom({ target: { value: prevState.kota_ktp_ibu } });
        // handleDistrictIbuChangeDom({ target: { value: prevState.kecamatan_ktp_ibu } });

        return {
            ...prevState,
            provinsi_domisili_ibu: prevState.provinsi_ktp_ibu,
            kota_domisili_ibu: prevState.kota_ktp_ibu,
            kecamatan_domisili_ibu: prevState.kecamatan_ktp_ibu,
            kelurahan_domisili_ibu: prevState.kelurahan_ktp_ibu,
            alamat_domisili_ibu: prevState.alamat_ktp_ibu,
        };
    });
    } else {
        setOrangTuaDetails((prevState) => ({
            ...prevState,
            provinsi_domisili_ibu: '',
            kota_domisili_ibu: '',
            kecamatan_domisili_ibu: '',
            kelurahan_domisili_ibu: '',
            alamat_domisili_ibu: '',
        }));
    }
};

  const handleCheckboxChangeAyah = (e) => {
    setSameAsKtpAyah(e.target.checked);
    if (e.target.checked) {
      setOrangTuaDetails((prevState) => ({
        ...prevState,
        alamat_domisili_ayah: prevState.alamat_ktp_ayah,
        kelurahan_domisili_ayah: prevState.kelurahan_ktp_ayah,
        kecamatan_domisili_ayah: prevState.kecamatan_ktp_ayah,
        kota_domisili_ayah: prevState.kota_ktp_ayah,
        provinsi_domisili_ayah: prevState.provinsi_ktp_ayah
      }));
    }
  };

  const [errors,
    setErrors] = useState({});

    const [isLoading,
        setIsLoading] = useState(true);

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

    if (!orangTuaDetails.no_hp_ibu) {
      formErrors.no_hp_ibu = 'No HP Ibu is required';
    } else if (!/^\d+$/.test(orangTuaDetails.no_hp_ibu)) {
      formErrors.no_hp_ibu = 'No HP Wali must be a valid number';
    }

    if (!orangTuaDetails.alamat_ktp_ibu) {
      formErrors.alamat_ktp_ibu = 'Alamat KTP Ibu is required';
    }

    if (!orangTuaDetails.alamat_domisili_ibu) {
      formErrors.alamat_domisili_ibu = 'Alamat Domisili Ibu is required';
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

    if (!orangTuaDetails.no_hp_ayah) {
      formErrors.no_hp_ayah = 'No HP Ayah is required';
    } else if (!/^\d+$/.test(orangTuaDetails.no_hp_ayah)) {
      formErrors.no_hp_ayah = 'No HP Wali must be a valid number';
    }

    if (!orangTuaDetails.alamat_ktp_ayah) {
      formErrors.alamat_ktp_ayah = 'Alamat KTP Ayah is required';
    }

    if (!orangTuaDetails.alamat_domisili_ayah) {
      formErrors.alamat_domisili_ayah = 'Alamat Domisili Ayah is required';
    }

    setErrors(formErrors);
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
    setOrangTuaDetails({
      ...orangTuaDetails,
      kota_ktp_ibu: selectedRegencyId
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

  const handleRegencyIbuChangeDom = (e) => {
    const selectedRegencyDomId = e.target.value;
    setOrangTuaDetails({
      ...orangTuaDetails,
      kota_domisili_ibu: selectedRegencyDomId
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

  const handleDistrictIbuChange = (e) => {
    const selectedDistrictId = e.target.value;
    setOrangTuaDetails({
      ...orangTuaDetails,
      kecamatan_ktp_ibu: selectedDistrictId
    });

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
    setOrangTuaDetails({
      ...orangTuaDetails,
      kecamatan_domisili_ibu: selectedDistrictDomId
    });

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
    setOrangTuaDetails({
      ...orangTuaDetails,
      provinsi_domisili_ayah: selectedProvinsiDomId
    });

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
    setOrangTuaDetails({
      ...orangTuaDetails,
      kota_ktp_ayah: selectedRegencyId
    });

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
    setOrangTuaDetails({
      ...orangTuaDetails,
      kota_domisili_ayah: selectedRegencyDomId
    });

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
    setOrangTuaDetails({
      ...orangTuaDetails,
      kecamatan_ktp_ayah: selectedDistrictId
    });

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
    setOrangTuaDetails({
      ...orangTuaDetails,
      kecamatan_domisili_ayah: selectedDistrictDomId
    });

    // Fetch villages when a district is selected
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/location/districts/${selectedDistrictDomId}/villages`)
      .then((response) => {
        setVillagesAyahDom(response.data);
      })
      .catch((error) => console.error('Error fetching villages dom:', error));
  };

  useEffect(() => {
    const fetchOrtu = async () => {
      try {
        const response = await getPenggunaById(userId);
        if (response.data.orangTuaDetail) {
          const ortu = response.data.orangTuaDetail;
  
          // Set the parent details in the state
          setOrangTuaDetails({
            id: ortu.id || '',
            no_kk: ortu.no_kk || '',
            nik_ibu: ortu.nik_ibu || '',
            nama_ibu: ortu.nama_ibu || '',
            tempat_lahir_ibu: ortu.tempat_lahir_ibu || '',
            tanggal_lahir_ibu: ortu.tanggal_lahir_ibu || '',
            jenis_kelamin_ibu: ortu.jenis_kelamin_ibu || '',
            alamat_ktp_ibu: ortu.alamat_ktp_ibu || '',
            kelurahan_ktp_ibu: ortu.kelurahan_ktp_ibu || '',
            kecamatan_ktp_ibu: ortu.kecamatan_ktp_ibu || '',
            kota_ktp_ibu: ortu.kota_ktp_ibu || '',
            provinsi_ktp_ibu: ortu.provinsi_ktp_ibu || '',
            alamat_domisili_ibu: ortu.alamat_domisili_ibu || '',
            kelurahan_domisili_ibu: ortu.kelurahan_domisili_ibu || '',
            kecamatan_domisili_ibu: ortu.kecamatan_domisili_ibu || '',
            kota_domisili_ibu: ortu.kota_domisili_ibu || '',
            provinsi_domisili_ibu: ortu.provinsi_domisili_ibu || '',
            no_hp_ibu: ortu.no_hp_ibu || '',
            email_ibu: ortu.email_ibu || '',
            pekerjaan_ibu: ortu.pekerjaan_ibu || '',
            pendidikan_ibu: ortu.pendidikan_ibu || '',
            nik_ayah: ortu.nik_ayah || '',
            nama_ayah: ortu.nama_ayah || '',
            tempat_lahir_ayah: ortu.tempat_lahir_ayah || '',
            tanggal_lahir_ayah: ortu.tanggal_lahir_ayah || '',
            jenis_kelamin_ayah: ortu.jenis_kelamin_ayah || '',
            alamat_ktp_ayah: ortu.alamat_ktp_ayah || '',
            kelurahan_ktp_ayah: ortu.kelurahan_ktp_ayah || '',
            kecamatan_ktp_ayah: ortu.kecamatan_ktp_ayah || '',
            kota_ktp_ayah: ortu.kota_ktp_ayah || '',
            provinsi_ktp_ayah: ortu.provinsi_ktp_ayah || '',
            alamat_domisili_ayah: ortu.alamat_domisili_ayah || '',
            kelurahan_domisili_ayah: ortu.kelurahan_domisili_ayah || '',
            kecamatan_domisili_ayah: ortu.kecamatan_domisili_ayah || '',
            kota_domisili_ayah: ortu.kota_domisili_ayah || '',
            provinsi_domisili_ayah: ortu.provinsi_domisili_ayah || '',
            no_hp_ayah: ortu.no_hp_ayah || '',
            email_ayah: ortu.email_ayah || '',
            pekerjaan_ayah: ortu.pekerjaan_ayah || '',
            pendidikan_ayah: ortu.pendidikan_ayah || '',
          });
  
          // Fetch regencies, districts, and villages based on the saved IDs
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

          if (ortu.provinsi_ktp_ibu) {
            const regencyResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${ortu.provinsi_ktp_ibu}/regencies`);
            setRegenciesIbu(regencyResponse.data);
  
            if (ortu.kota_ktp_ibu) {
              const districtResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${ortu.kota_ktp_ibu}/districts`);
              setDistrictsIbu(districtResponse.data);
  
              if (ortu.kecamatan_ktp_ibu) {
                const villageResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${ortu.kecamatan_ktp_ibu}/villages`);
                setVillagesIbu(villageResponse.data);
              }
            }
          }
  
          if (ortu.provinsi_domisili_ibu) {
            const regencyDomResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${ortu.provinsi_domisili_ibu}/regencies`);
            setRegenciesIbuDom(regencyDomResponse.data);
  
            if (ortu.kota_domisili_ibu) {
              const districtDomResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${ortu.kota_domisili_ibu}/districts`);
              setDistrictsIbuDom(districtDomResponse.data);
  
              if (ortu.kecamatan_domisili_ibu) {
                const villageDomResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${ortu.kecamatan_domisili_ibu}/villages`);
                setVillagesIbuDom(villageDomResponse.data);
              }
            }
          }
  
          // Repeat the same for Ayah data if needed
          if (ortu.provinsi_ktp_ayah) {
            const regencyResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${ortu.provinsi_ktp_ayah}/regencies`);
            setRegenciesAyah(regencyResponse.data);
  
            if (ortu.kota_ktp_ayah) {
              const districtResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${ortu.kota_ktp_ayah}/districts`);
              setDistrictsAyah(districtResponse.data);
  
              if (ortu.kecamatan_ktp_ayah) {
                const villageResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${ortu.kecamatan_ktp_ayah}/villages`);
                setVillagesAyah(villageResponse.data);
              }
            }
          }
  
          if (ortu.provinsi_domisili_ayah) {
            const regencyDomResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/provinsi/${ortu.provinsi_domisili_ayah}/regencies`);
            setRegenciesAyahDom(regencyDomResponse.data);
  
            if (ortu.kota_domisili_ayah) {
              const districtDomResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/regencies/${ortu.kota_domisili_ayah}/districts`);
              setDistrictsAyahDom(districtDomResponse.data);
  
              if (ortu.kecamatan_domisili_ayah) {
                const villageDomResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/districts/${ortu.kecamatan_domisili_ayah}/villages`);
                setVillagesAyahDom(villageDomResponse.data);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching ortu:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchOrtu();
  }, [userId]);

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

  return (
    <div>
      <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
        <p className="text-sm font-bold">
          <span className="text-red-500">*</span> Wajib diisi
        </p>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">No KK <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="no_kk"
            value={orangTuaDetails.no_kk}
            onChange={(e) => setOrangTuaDetails({
            ...orangTuaDetails,
            no_kk: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.no_kk && <p className="text-red-500 text-sm mt-1">{errors.no_kk}</p>}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-700 mt-5 mb-3">Data Ibu</h3>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">NIK Ibu <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="nik_ibu"
            value={orangTuaDetails.nik_ibu}
            onChange={(e) => setOrangTuaDetails({
            ...orangTuaDetails,
            nik_ibu: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nik_ibu && <p className="text-red-500 text-sm mt-1">{errors.nik_ibu}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">Nama Ibu <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="nama_ibu"
            value={orangTuaDetails.nama_ibu}
            onChange={(e) => setOrangTuaDetails({
            ...orangTuaDetails,
            nama_ibu: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nama_ibu && <p className="text-red-500 text-sm mt-1">{errors.nama_ibu}</p>}
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">Tempat Lahir Ibu <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="tempat_lahir_ibu"
            value={orangTuaDetails.tempat_lahir_ibu}
            onChange={(e) => setOrangTuaDetails({
            ...orangTuaDetails,
            tempat_lahir_ibu: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tempat_lahir_ibu && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_ibu}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">Tanggal Lahir Ibu <span className="text-red-500">*</span></label>
          <input
            type="date"
            name="tanggal_lahir_ibu"
            value={orangTuaDetails.tanggal_lahir_ibu}
            onChange={(e) => setOrangTuaDetails({
            ...orangTuaDetails,
            tanggal_lahir_ibu: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tanggal_lahir_ibu && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_ibu}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">
            Alamat KTP Ibu <span className="text-red-500">*</span>
          </label>
          <textarea
            name="alamat_ktp_ibu"
            value={orangTuaDetails.alamat_ktp_ibu}
            onChange={(e) => setOrangTuaDetails({
              ...orangTuaDetails,
              alamat_ktp_ibu: e.target.value
            })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            rows="4"
          />
          {errors.alamat_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.alamat_ktp_ibu}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">Provinsi KTP Ibu</label>
          <select
            name="provinsi_ktp_ibu"
            value={orangTuaDetails.provinsi_ktp_ibu}
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
        
          <label className="block text-sm font-semibold">Upload KTP Ibu</label>
          <input
            type="file"
            name="ktp_ibu_file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                // Handle the file upload logic here, for example, by saving the file in state
                setOrangTuaDetails({
                  ...orangTuaDetails,
                  ktp_ibu_file: file
                });
              }
            }}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        
      </div>

      <div className="col-span-2">
          <label className="block text-sm font-semibold">
            <input
              type="checkbox"
              checked={sameAsKtpIbu}
              onChange={handleCheckboxChangeIbu}
              className="mr-2"
            />
            Sama dengan Alamat KTP Ibu
          </label>
        </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">Kota KTP Ibu</label>
          <select
            name="kota_ktp_ibu"
            value={orangTuaDetails.kota_ktp_ibu}
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
            value={orangTuaDetails.kecamatan_ktp_ibu}
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
          <label className="block text-sm font-semibold">Alamat Domisili Ibu <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="alamat_domisili_ibu"
            value={orangTuaDetails.alamat_domisili_ibu}
            onChange={(e) => setOrangTuaDetails({
            ...orangTuaDetails,
            alamat_domisili_ibu: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
            {errors.alamat_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.alamat_domisili_ibu}</p>}
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
            disabled={sameAsKtpIbu}
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
            value={orangTuaDetails.kota_domisili_ibu}
            onChange={handleRegencyIbuChangeDom}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            disabled={sameAsKtpIbu || !regenciesIbuDom.length}>
            <option value="">Pilih Kota</option>
            {regenciesIbuDom.length > 0 && regenciesIbuDom.map(r => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            disabled={sameAsKtpIbu || !districtsIbuDom.length}>
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
            value={orangTuaDetails.kelurahan_domisili_ibu}
            onChange={(e) => setOrangTuaDetails({
            ...orangTuaDetails,
            kelurahan_domisili_ibu: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            disabled={sameAsKtpIbu || !villagesIbuDom.length}>
            <option value="">Pilih Kelurahan</option>
            {villagesIbuDom.length > 0 && villagesIbuDom.map(v => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">No Handphone Ibu <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="no_hp_ibu"
            value={orangTuaDetails.no_hp_ibu}
            onChange={(e) => setOrangTuaDetails({
            ...orangTuaDetails,
            no_hp_ibu: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.no_hp_ibu && <p className="text-red-500 text-sm mt-1">{errors.no_hp_ibu}</p>}
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
          
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-700 mt-5 mb-3">Data Ayah</h3>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
          <div>
            <label className="block text-sm font-semibold">NIK Ayah <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="nik_ayah"
              value={orangTuaDetails.nik_ayah}
              onChange={(e) => setOrangTuaDetails({
              ...orangTuaDetails,
              nik_ayah: e.target.value
            })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nik_ayah && <p className="text-red-500 text-sm mt-1">{errors.nik_ayah}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold">Nama Ayah <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="nama_ayah"
              value={orangTuaDetails.nama_ayah}
              onChange={(e) => setOrangTuaDetails({
              ...orangTuaDetails,
              nama_ayah: e.target.value
            })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nama_ayah && <p className="text-red-500 text-sm mt-1">{errors.nama_ayah}</p>}
          </div>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
          <div>
            <label className="block text-sm font-semibold">Tempat Lahir Ayah <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="tempat_lahir_ayah"
              value={orangTuaDetails.tempat_lahir_ayah}
              onChange={(e) => setOrangTuaDetails({
              ...orangTuaDetails,
              tempat_lahir_ayah: e.target.value
            })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tempat_lahir_ayah && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_ayah}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold">Tanggal Lahir Ayah <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="tanggal_lahir_ayah"
              value={orangTuaDetails.tanggal_lahir_ayah}
              onChange={(e) => setOrangTuaDetails({
              ...orangTuaDetails,
              tanggal_lahir_ayah: e.target.value
            })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tanggal_lahir_ayah && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_ayah}</p>}
          </div>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
          <div>
            <label className="block text-sm font-semibold">Alamat KTP Ayah <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="alamat_ktp_ayah"
              value={orangTuaDetails.alamat_ktp_ayah}
              onChange={(e) => setOrangTuaDetails({
              ...orangTuaDetails,
              alamat_ktp_ayah: e.target.value
            })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.alamat_ktp_ayah && <p className="text-red-500 text-sm mt-1">{errors.alamat_ktp_ayah}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold">Provinsi KTP Ayah</label>
            <select
              name="provinsi_ktp_ayah"
              value={orangTuaDetails.provinsi_ktp_ayah}
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
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
          <div>
            <label className="block text-sm font-semibold">Kota KTP Ayah</label>
            <select
              name="kota_ktp_ayah"
              value={orangTuaDetails.kota_ktp_ayah}
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
              value={orangTuaDetails.kecamatan_ktp_ayah}
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
            <label className="block text-sm font-semibold">Alamat Domisili Ayah <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="alamat_domisili_ayah"
              value={orangTuaDetails.alamat_domisili_ayah}
              onChange={(e) => setOrangTuaDetails({
              ...orangTuaDetails,
              alamat_domisili_ayah: e.target.value
            })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.alamat_domisili_ayah && <p className="text-red-500 text-sm mt-1">{errors.alamat_domisili_ayah}</p>}
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
              value={orangTuaDetails.kota_domisili_ayah}
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
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
          <div>
            <label className="block text-sm font-semibold">Kecamatan Domisili Ayah</label>
            <select
              name="kecamatan_domisili_ayah"
              value={orangTuaDetails.kecamatan_domisili_ayah}
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
              value={orangTuaDetails.kelurahan_domisili_ayah}
              onChange={(e) => setOrangTuaDetails({
              ...orangTuaDetails,
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
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
          <div>
            <label className="block text-sm font-semibold">No Handphone Ayah <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="no_hp_ayah"
              value={orangTuaDetails.no_hp_ayah}
              onChange={(e) => setOrangTuaDetails({
              ...orangTuaDetails,
              no_hp_ayah: e.target.value
            })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.no_hp_ayah && <p className="text-red-500 text-sm mt-1">{errors.no_hp_ayah}</p>}
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
            
          </div>
        </div>
      </div>
      <button
        onClick={() => handleUpdateOrangtua(orangTuaDetails.id)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Update Orangtua
      </button>
    </div>
  );
};

export default DataOrtu;
