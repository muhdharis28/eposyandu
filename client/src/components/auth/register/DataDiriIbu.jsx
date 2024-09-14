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
                {errors.alamat_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.alamat_ktp_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kelurahan KTP</label>
                <input
                  type="text"
                  name="kelurahan_ktp_ibu"
                  value={formData.kelurahan_ktp_ibu}
                  onChange={handleInputChange}
                  placeholder="Kelurahan KTP"
                  className={`w-full py-3 px-6 border ${errors.kelurahan_ktp_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.kelurahan_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.kelurahan_ktp_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kecamatan KTP</label>
                <input
                  type="text"
                  name="kecamatan_ktp_ibu"
                  value={formData.kecamatan_ktp_ibu}
                  onChange={handleInputChange}
                  placeholder="Kecamatan KTP"
                  className={`w-full py-3 px-6 border ${errors.kecamatan_ktp_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.kecamatan_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.kecamatan_ktp_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kota KTP</label>
                <input
                  type="text"
                  name="kota_ktp_ibu"
                  value={formData.kota_ktp_ibu}
                  onChange={handleInputChange}
                  placeholder="Kota KTP"
                  className={`w-full py-3 px-6 border ${errors.kota_ktp_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.kota_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.kota_ktp_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Provinsi KTP</label>
                <input
                  type="text"
                  name="provinsi_ktp_ibu"
                  value={formData.provinsi_ktp_ibu}
                  onChange={handleInputChange}
                  placeholder="Provinsi KTP"
                  className={`w-full py-3 px-6 border ${errors.provinsi_ktp_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.provinsi_ktp_ibu && <p className="text-red-500 text-sm mt-1">{errors.provinsi_ktp_ibu}</p>}
              </div>
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
              <div className="mb-4">
                <label className="block text-sm mb-2">Kelurahan Domisili</label>
                <input
                  type="text"
                  name="kelurahan_domisili_ibu"
                  value={formData.kelurahan_domisili_ibu}
                  onChange={handleInputChange}
                  placeholder="Kelurahan Domisili"
                  className={`w-full py-3 px-6 border ${errors.kelurahan_domisili_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.kelurahan_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.kelurahan_domisili_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kecamatan Domisili</label>
                <input
                  type="text"
                  name="kecamatan_domisili_ibu"
                  value={formData.kecamatan_domisili_ibu}
                  onChange={handleInputChange}
                  placeholder="Kecamatan Domisili"
                  className={`w-full py-3 px-6 border ${errors.kecamatan_domisili_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.kecamatan_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.kecamatan_domisili_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kota Domisili</label>
                <input
                  type="text"
                  name="kota_domisili_ibu"
                  value={formData.kota_domisili_ibu}
                  onChange={handleInputChange}
                  placeholder="Kota Domisili"
                  className={`w-full py-3 px-6 border ${errors.kota_domisili_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.kota_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.kota_domisili_ibu}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Provinsi Domisili</label>
                <input
                  type="text"
                  name="provinsi_domisili_ibu"
                  value={formData.provinsi_domisili_ibu}
                  onChange={handleInputChange}
                  placeholder="Provinsi Domisili"
                  className={`w-full py-3 px-6 border ${errors.provinsi_domisili_ibu ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.provinsi_domisili_ibu && <p className="text-red-500 text-sm mt-1">{errors.provinsi_domisili_ibu}</p>}
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

          {/* Right Image Section */}
          <div className="w-full md:w-1/3 flex justify-center items-center mt-4 md:mt-0">
            <img
              src={image}
              alt="Ibu Illustration"
              className="max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDiriIbu;
