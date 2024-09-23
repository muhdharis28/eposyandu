// DataWali.js
import React, { useEffect, useState } from 'react';
import {getPenggunaById, updatePenggunaWali} from '../../PenggunaService';

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
        await updateWali(id, waliDetails);
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
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">No KK</label>
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
          <label className="block text-sm font-semibold">NIK Wali</label>
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
          <label className="block text-sm font-semibold">Nama Wali</label>
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
          <label className="block text-sm font-semibold">Tempat Lahir Wali</label>
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
          <label className="block text-sm font-semibold">Tanggal Lahir Wali</label>
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
          <label className="block text-sm font-semibold">Jenis Kelamin Wali</label>
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
          <label className="block text-sm font-semibold">Alamat KTP Wali</label>
          <input
            type="text"
            name="alamat_ktp_wali"
            value={waliDetails.alamat_ktp_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            alamat_ktp_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
            {errors.alamat_ktp_wali && <p className="text-red-500 text-sm mt-1">{errors.alamat_ktp_wali}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">Kelurahan KTP Wali</label>
          <input
            type="text"
            name="kelurahan_ktp_wali"
            value={waliDetails.kelurahan_ktp_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            kelurahan_ktp_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">Kecamatan KTP Wali</label>
          <input
            type="text"
            name="kecamatan_ktp_wali"
            value={waliDetails.kecamatan_ktp_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            kecamatan_ktp_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
        </div>
        <div>
          <label className="block text-sm font-semibold">Kota KTP Wali</label>
          <input
            type="text"
            name="kota_ktp_wali"
            value={waliDetails.kota_ktp_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            kota_ktp_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">Provinsi KTP Wali</label>
          <input
            type="text"
            name="provinsi_ktp_wali"
            value={waliDetails.provinsi_ktp_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            provinsi_ktp_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
        </div>
        <div>
          <label className="block text-sm font-semibold">Alamat Domisili Wali</label>
          <input
            type="text"
            name="alamat_domisili_wali"
            value={waliDetails.alamat_domisili_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            alamat_domisili_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
            {errors.alamat_domisili_wali && <p className="text-red-500 text-sm mt-1">{errors.alamat_domisili_wali}</p>}
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">Kelurahan Domisili Wali</label>
          <input
            type="text"
            name="kelurahan_domisili_wali"
            value={waliDetails.kelurahan_domisili_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            kelurahan_domisili_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
        </div>
        <div>
          <label className="block text-sm font-semibold">Kecamatan Domisili Wali</label>
          <input
            type="text"
            name="kecamatan_domisili_wali"
            value={waliDetails.kecamatan_domisili_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            kecamatan_domisili_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">Kota Domisili Wali</label>
          <input
            type="text"
            name="kota_domisili_wali"
            value={waliDetails.kota_domisili_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            kota_domisili_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
        </div>
        <div>
          <label className="block text-sm font-semibold">Provinsi Domisili Wali</label>
          <input
            type="text"
            name="provinsi_domisili_wali"
            value={waliDetails.provinsi_domisili_wali}
            onChange={(e) => setWaliDetails({
            ...waliDetails,
            provinsi_domisili_wali: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">No Handphone Wali</label>
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
          <label className="block text-gray-700">Pekerjaan Wali</label>
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
      <button
        onClick={() => handleUpdateWali(waliDetails.id)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Update Wali
      </button>
    </div>
  );
};

export default DataWali;
