import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RegistrationDetails from './RegistrationDetails';
import DataDiriIbu from './DataDiriIbu';
import DataDiriAyah from './DataDiriAyah';
import DataDiriWali from './DataDiriWali';
import Register from './Register'; 
import Summary from './Summary';

const RegistrationFlow = () => {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        kata_sandi: '',
        no_ktp: '',
        no_kk: '',
        no_hp: '',
        role: 'user',
        foto_kk: null,
        nik_ibu: '',
        nama_ibu: '',
        tempat_lahir_ibu: '',
        tanggal_lahir_ibu: '',
        alamat_ktp_ibu: '',
        kelurahan_ktp_ibu: null,
        kecamatan_ktp_ibu: null,
        kota_ktp_ibu: null,
        provinsi_ktp_ibu: null,
        alamat_domisili_ibu: '',
        kelurahan_domisili_ibu: null,
        kecamatan_domisili_ibu: null,
        kota_domisili_ibu: null,
        provinsi_domisili_ibu: null,
        no_hp_ibu: '',
        email_ibu: '',
        pekerjaan_ibu: null,  // Store the ID or name depending on your frontend logic
        pendidikan_ibu: null, // Store the ID or name depending on your frontend logic
        nik_ayah: '',
        nama_ayah: '',
        tempat_lahir_ayah: '',
        tanggal_lahir_ayah: '',
        alamat_ktp_ayah: '',
        kelurahan_ktp_ayah: null,
        kecamatan_ktp_ayah: null,
        kota_ktp_ayah: null,
        provinsi_ktp_ayah: null,
        alamat_domisili_ayah: '',
        kelurahan_domisili_ayah: null,
        kecamatan_domisili_ayah: null,
        kota_domisili_ayah: null,
        provinsi_domisili_ayah: null,
        no_hp_ayah: '',
        email_ayah: '',
        pekerjaan_ayah: null,  // Store the ID or name depending on your frontend logic
        pendidikan_ayah: null,  // Store the ID or name depending on your frontend logic
        nik_wali: '',
        nama_wali: '',
        tempat_lahir_wali: '',
        jenis_kelamin_wali: '',
        tanggal_lahir_wali: '',
        alamat_ktp_wali: '',
        kelurahan_ktp_wali: null,
        kecamatan_ktp_wali: null,
        kota_ktp_wali: null,
        provinsi_ktp_wali: null,
        alamat_domisili_wali: '',
        kelurahan_domisili_wali: null,
        kecamatan_domisili_wali: null,
        kota_domisili_wali: null,
        provinsi_domisili_wali: null,
        no_hp_wali: '',
        email_wali: '',
        pekerjaan_wali: null,  // Store the ID or name depending on your frontend logic
        pendidikan_wali: null,  // Store the ID or name depending on your frontend logic
        posyandu: null,
    });

  const navigate = useNavigate();

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  return (
    <Routes>
      <Route
        path="/register"
        element={
          <Register
            formData={formData}
            setFormData={updateFormData} // Passing down the update function
            navigate={navigate}
          />
        }
      />
      <Route
        path="/register/details"
        element={
          <RegistrationDetails
            formData={formData}
            updateFormData={updateFormData}
            navigate={navigate}
          />
        }
      />
      <Route
        path="/register/data-diri-ibu"
        element={
          <DataDiriIbu
            formData={formData}
            updateFormData={updateFormData}
            navigate={navigate}
          />
        }
      />
      <Route
        path="/register/data-diri-ayah"
        element={
          <DataDiriAyah
            formData={formData}
            updateFormData={updateFormData}
            navigate={navigate}
          />
        }
      />
      <Route
        path="/register/data-diri-wali"
        element={
          <DataDiriWali
            formData={formData}
            updateFormData={updateFormData}
            navigate={navigate}
          />
        }
      />
      <Route
        path="/register/summary"
        element={
          <Summary/>
        }
      />
    </Routes>
  );
};

export default RegistrationFlow;
