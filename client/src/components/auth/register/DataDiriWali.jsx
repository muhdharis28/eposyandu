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
    const confirmed = window.confirm('Apakah data yang anda masukkan sudah benar?');
    if (!confirmed) return;

    const fieldsToConvert = [
      'nik_wali', 'pekerjaan_wali', 'pendidikan_wali',
      'no_kk', 'no_hp_wali', 'no_ktp'
    ];

    try {
      // Convert string fields to integers where applicable
      fieldsToConvert.forEach((field) => {
        if (typeof formData[field] === 'string') {
          formData[field] = parseInt(formData[field], 10);
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

      // Store Pengguna data and associate with OrangTua
      await axios.post(`${import.meta.env.VITE_API_URL}/api/pengguna`, {
        nama: formData.nama,
        email: formData.email,
        kata_sandi: formData.kata_sandi, // Ensure this is hashed in the backend
        role: 'user', // Adjust as needed
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

  const handleBack = () => {
    navigate('/register/details', { state: { formData } }); // Adjust the path as needed for the previous step
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 overflow-y-auto py-10">
      <div className="flex flex-col w-full max-w-5xl shadow-lg bg-white p-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 flex flex-col justify-between pr-4">
            <h1 className="text-3xl font-bold mb-4 text-blue-800">Data Diri Wali</h1>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Form Fields */}
              <div className="mb-4">
                <label className="block text-sm mb-2">NIK Wali</label>
                <input
                  type="text"
                  name="nik_wali"
                  value={formData.nik_wali}
                  onChange={handleInputChange}
                  placeholder="NIK Wali"
                  className={`w-full p-2 border ${errors.nik_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.nama_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.tempat_lahir_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.tanggal_lahir_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  placeholder="No KTP"
                  className={`w-full p-2 border ${errors.no_hp_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.email_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.alamat_ktp_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.kelurahan_ktp_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.kecamatan_ktp_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.kota_ktp_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.provinsi_ktp_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.alamat_domisili_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.kelurahan_domisili_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.kecamatan_domisili_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.kota_domisili_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.provinsi_domisili_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.provinsi_domisili_wali && <p className="text-red-500 text-sm mt-1">{errors.provinsi_domisili_wali}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Pekerjaan Wali</label>
                <select
                  name="pekerjaan_wali"
                  value={formData.pekerjaan_wali}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${errors.pekerjaan_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${errors.pendidikan_wali ? 'border-red-500' : 'border-gray-300'} rounded`}
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
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={handleBack}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
              >
                Selanjutnya
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center items-center mt-4 md:mt-0">
            <img
              src="/path-to-your-wali-image.png"
              alt="Wali Illustration"
              className="max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDiriWali;
