import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DataDiriWali = ({ formData, updateFormData }) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.nik_wali) {
      formErrors.nik_wali = 'NIK Wali is required';
    } else if (!/^\d{16}$/.test(formData.nik_wali)) {
      formErrors.nik_wali = 'NIK Wali must be 16 digits';
    }

    if (!formData.nama_wali) {
      formErrors.nama_wali = 'Nama Wali is required';
    }

    if (!formData.tempat_lahir_wali) {
      formErrors.tempat_lahir_wali = 'Tempat Lahir Wali is required';
    }

    if (!formData.tanggal_lahir_wali) {
      formErrors.tanggal_lahir_wali = 'Tanggal Lahir Wali is required';
    }

    if (!formData.email_wali) {
      formErrors.email_wali = 'Email Wali is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email_wali)) {
      formErrors.email_wali = 'Email Wali is invalid';
    }

    if (!formData.no_hp_wali) {
      formErrors.no_hp_wali = 'No HP Wali is required';
    } else if (!/^\d+$/.test(formData.no_hp_wali)) {
      formErrors.no_hp_wali = 'No HP Wali must be a valid number';
    }

    if (!formData.alamat_ktp_wali) {
      formErrors.alamat_ktp_wali = 'Alamat KTP Wali is required';
    }

    if (!formData.kelurahan_ktp_wali) {
      formErrors.kelurahan_ktp_wali = 'Kelurahan KTP Wali is required';
    }

    if (!formData.kecamatan_ktp_wali) {
      formErrors.kecamatan_ktp_wali = 'Kecamatan KTP Wali is required';
    }

    if (!formData.kota_ktp_wali) {
      formErrors.kota_ktp_wali = 'Kota KTP Wali is required';
    }

    if (!formData.provinsi_ktp_wali) {
      formErrors.provinsi_ktp_wali = 'Provinsi KTP Wali is required';
    }

    if (!formData.alamat_domisili_wali) {
      formErrors.alamat_domisili_wali = 'Alamat Domisili Wali is required';
    }

    if (!formData.kelurahan_domisili_wali) {
      formErrors.kelurahan_domisili_wali = 'Kelurahan Domisili Wali is required';
    }

    if (!formData.kecamatan_domisili_wali) {
      formErrors.kecamatan_domisili_wali = 'Kecamatan Domisili Wali is required';
    }

    if (!formData.kota_domisili_wali) {
      formErrors.kota_domisili_wali = 'Kota Domisili Wali is required';
    }

    if (!formData.provinsi_domisili_wali) {
      formErrors.provinsi_domisili_wali = 'Provinsi Domisili Wali is required';
    }

    if (!formData.pekerjaan_wali) {
      formErrors.pekerjaan_wali = 'Pekerjaan Wali is required';
    }

    if (!formData.pendidikan_wali) {
      formErrors.pendidikan_wali = 'Pendidikan Wali is required';
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
       'pekerjaan_wali', 'pendidikan_wali'
    ];

    try {
      // Convert string fields to integers where applicable
      fieldsToConvert.forEach((field) => {
        if (typeof formData[field] === 'string') {
          formData[field] = parseInt(formData[field], 20);
        }
      });

      // Validate pekerjaan_wali
      if (!formData.pekerjaan_wali || !pekerjaanOptions.some(p => p.id === formData.pekerjaan_wali)) {
        throw new Error('Invalid pekerjaan_wali selected.');
      }

      // Validate pendidikan_wali
      if (!formData.pendidikan_wali || !pendidikanOptions.some(p => p.id === formData.pendidikan_wali)) {
        throw new Error('Invalid pendidikan_wali selected.');
      }

      // Store Wali data
      const waliResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/wali`, {
        no_kk: formData.no_kk,
        nik_wali: formData.nik_wali,
        nama_wali: formData.nama_wali,
        tempat_lahir_wali: formData.tempat_lahir_wali,
        tanggal_lahir_wali: formData.tanggal_lahir_wali,
        jenis_kelamin_wali: formData.jenis_kelamin_wali,
        alamat_ktp_wali: formData.alamat_ktp_wali,
        kelurahan_ktp_wali: formData.kelurahan_ktp_wali,
        kecamatan_ktp_wali: formData.kecamatan_ktp_wali,
        kota_ktp_wali: formData.kota_ktp_wali,
        provinsi_ktp_wali: formData.provinsi_ktp_wali,
        alamat_domisili_wali: formData.alamat_domisili_wali,
        kelurahan_domisili_wali: formData.kelurahan_domisili_wali,
        kecamatan_domisili_wali: formData.kecamatan_domisili_wali,
        kota_domisili_wali: formData.kota_domisili_wali,
        provinsi_domisili_wali: formData.provinsi_domisili_wali,
        no_hp_wali: formData.no_hp_wali,
        email_wali: formData.email_wali,
        pekerjaan_wali: formData.pekerjaan_wali,
        pendidikan_wali: formData.pendidikan_wali,
      });

      const uploadedFilePath = await uploadFile();
      if (uploadedFilePath) {
        updateFormData({ ['foto_kk']: uploadedFilePath });
      }
      // Store Pengguna data and associate with OrangTua
      await axios.post(`${import.meta.env.VITE_API_URL}/api/pengguna`, {
        nama: formData.nama,
        email: formData.email,
        kata_sandi: formData.kata_sandi, // Ensure this is hashed in the backend
        role: 'user',
        foto_kk: formData.foto_kk,
        no_hp: formData.no_hp,
        no_kk: formData.no_kk,
        no_ktp: formData.no_ktp,
        wali: waliResponse.data.id, // Use the ID returned from the OrangTua creation
      });

      // Navigate to the summary page after successful registration
      navigate('/register/summary', { state: { formData } });

    } catch (error) {
      console.error('Error during registration:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const uploadFile = async () => {
    if (!formData.foto_kk) return null;
    const formDataWali = new FormData();
    formDataWali.append('file', formData.foto_kk);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formDataWali);
      const filePath = `/uploads/${response.data.fileName}`;
      return filePath;
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrors('Failed to upload file');
      return null;
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
                Data Diri Wali
              </h1>
              <button
                onClick={handleBack}
                className="text-blue-600 hover:underline text-lg"
              >
                ← Kembali
              </button>
            </div>
            
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Form Fields */}
              <div className="mb-4">
                <label className="block text-sm mb-2">NIK Wali</label>
                <input
                  type="text"
                  name="nik_wali"
                  value={formData.nik_wali}
                  onChange={handleInputChange}
                  placeholder="NIK Wali"
                  className={`w-full py-3 px-6 border ${errors.nik_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.nik_wali && <p className="text-red-500 text-sm mt-1">{errors.nik_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Nama Wali</label>
                <input
                  type="text"
                  name="nama_wali"
                  value={formData.nama_wali}
                  onChange={handleInputChange}
                  placeholder="Nama Wali"
                  className={`w-full py-3 px-6 border ${errors.nama_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.nama_wali && <p className="text-red-500 text-sm mt-1">{errors.nama_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempat_lahir_wali"
                  value={formData.tempat_lahir_wali}
                  onChange={handleInputChange}
                  placeholder="Tempat Lahir"
                  className={`w-full py-3 px-6 border ${errors.tempat_lahir_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.tempat_lahir_wali && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggal_lahir_wali"
                  value={formData.tanggal_lahir_wali}
                  onChange={handleInputChange}
                  className={`w-full py-3 px-6 border ${errors.tanggal_lahir_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.tanggal_lahir_wali && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Jenis Kelamin</label>
                <div className="flex items-center gap-4">
                    <label className="flex items-center">
                    <input
                        type="radio"
                        name="jenis_kelamin_wali"
                        value="l"
                        checked={formData.jenis_kelamin_wali === 'l'}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    Laki-laki
                    </label>
                    <label className="flex items-center">
                    <input
                        type="radio"
                        name="jenis_kelamin_wali"
                        value="p"
                        checked={formData.jenis_kelamin_wali === 'p'}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    Perempuan
                    </label>
                </div>
                {errors.jenis_kelamin_wali && <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin_wali}</p>}
                </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">No HP</label>
                <input
                  type="text"
                  name="no_hp_wali"
                  value={formData.no_hp_wali}
                  onChange={handleInputChange}
                  placeholder="No HP"
                  className={`w-full py-3 px-6 border ${errors.jenis_kelamin_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.no_hp_wali && <p className="text-red-500 text-sm mt-1">{errors.no_hp_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email_wali"
                  value={formData.email_wali}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className={`w-full py-3 px-6 border ${errors.email_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.email_wali && <p className="text-red-500 text-sm mt-1">{errors.email_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Alamat KTP</label>
                <input
                  type="text"
                  name="alamat_ktp_wali"
                  value={formData.alamat_ktp_wali}
                  onChange={handleInputChange}
                  placeholder="Alamat KTP"
                  className={`w-full py-3 px-6 border ${errors.alamat_ktp_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.alamat_ktp_wali && <p className="text-red-500 text-sm mt-1">{errors.alamat_ktp_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kelurahan KTP</label>
                <input
                  type="text"
                  name="kelurahan_ktp_wali"
                  value={formData.kelurahan_ktp_wali}
                  onChange={handleInputChange}
                  placeholder="Kelurahan KTP"
                  className={`w-full py-3 px-6 border ${errors.kelurahan_ktp_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.kelurahan_ktp_wali && <p className="text-red-500 text-sm mt-1">{errors.kelurahan_ktp_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kecamatan KTP</label>
                <input
                  type="text"
                  name="kecamatan_ktp_wali"
                  value={formData.kecamatan_ktp_wali}
                  onChange={handleInputChange}
                  placeholder="Kecamatan KTP"
                  className={`w-full py-3 px-6 border ${errors.kecamatan_ktp_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.kecamatan_ktp_wali && <p className="text-red-500 text-sm mt-1">{errors.kecamatan_ktp_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kota KTP</label>
                <input
                  type="text"
                  name="kota_ktp_wali"
                  value={formData.kota_ktp_wali}
                  onChange={handleInputChange}
                  placeholder="Kota KTP"
                  className={`w-full py-3 px-6 border ${errors.kota_ktp_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.kota_ktp_wali && <p className="text-red-500 text-sm mt-1">{errors.kota_ktp_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Provinsi KTP</label>
                <input
                  type="text"
                  name="provinsi_ktp_wali"
                  value={formData.provinsi_ktp_wali}
                  onChange={handleInputChange}
                  placeholder="Provinsi KTP"
                  className={`w-full py-3 px-6 border ${errors.provinsi_ktp_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.provinsi_ktp_wali && <p className="text-red-500 text-sm mt-1">{errors.provinsi_ktp_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Alamat Domisili</label>
                <input
                  type="text"
                  name="alamat_domisili_wali"
                  value={formData.alamat_domisili_wali}
                  onChange={handleInputChange}
                  placeholder="Alamat Domisili"
                  className={`w-full py-3 px-6 border ${errors.alamat_domisili_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.alamat_domisili_wali && <p className="text-red-500 text-sm mt-1">{errors.alamat_domisili_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kelurahan Domisili</label>
                <input
                  type="text"
                  name="kelurahan_domisili_wali"
                  value={formData.kelurahan_domisili_wali}
                  onChange={handleInputChange}
                  placeholder="Kelurahan Domisili"
                  className={`w-full py-3 px-6 border ${errors.kelurahan_domisili_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.kelurahan_domisili_wali && <p className="text-red-500 text-sm mt-1">{errors.kelurahan_domisili_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kecamatan Domisili</label>
                <input
                  type="text"
                  name="kecamatan_domisili_wali"
                  value={formData.kecamatan_domisili_wali}
                  onChange={handleInputChange}
                  placeholder="Kecamatan Domisili"
                  className={`w-full py-3 px-6 border ${errors.kecamatan_domisili_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.kecamatan_domisili_wali && <p className="text-red-500 text-sm mt-1">{errors.kecamatan_domisili_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kota Domisili</label>
                <input
                  type="text"
                  name="kota_domisili_wali"
                  value={formData.kota_domisili_wali}
                  onChange={handleInputChange}
                  placeholder="Kota Domisili"
                  className={`w-full py-3 px-6 border ${errors.kota_domisili_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.kota_domisili_wali && <p className="text-red-500 text-sm mt-1">{errors.kota_domisili_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Provinsi Domisili</label>
                <input
                  type="text"
                  name="provinsi_domisili_wali"
                  value={formData.provinsi_domisili_wali}
                  onChange={handleInputChange}
                  placeholder="Provinsi Domisili"
                  className={`w-full py-3 px-6 border ${errors.provinsi_domisili_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.provinsi_domisili_wali && <p className="text-red-500 text-sm mt-1">{errors.provinsi_domisili_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Pekerjaan Wali</label>
                <select
                  name="pekerjaan_wali"
                  value={formData.pekerjaan_wali}
                  onChange={handleInputChange}
                  className={`w-full py-3 px-6 border ${errors.pekerjaan_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                  <option value="">Pilih Pekerjaan Wali</option>
                  {pekerjaanOptions.map((pekerjaan) => (
                    <option key={pekerjaan.id} value={pekerjaan.id}>
                      {pekerjaan.nama}
                    </option>
                  ))}
                </select>
                {errors.pekerjaan_wali && <p className="text-red-500 text-sm mt-1">{errors.pekerjaan_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Pendidikan Wali</label>
                <select
                  name="pendidikan_wali"
                  value={formData.pendidikan_wali}
                  onChange={handleInputChange}
                  className={`w-full py-3 px-6 border ${errors.pendidikan_wali ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                  <option value="">Pilih Pendidikan Wali</option>
                  {pendidikanOptions.map((pendidikan) => (
                    <option key={pendidikan.id} value={pendidikan.id}>
                      {pendidikan.nama}
                    </option>
                  ))}
                </select>
                {errors.pendidikan_wali && <p className="text-red-500 text-sm mt-1">{errors.pendidikan_wali}</p>}
              </div>
            </form>

            <div className="flex space-x-4 mt-6">
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3 rounded-full shadow-lg transition duration-300 "
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

export default DataDiriWali;