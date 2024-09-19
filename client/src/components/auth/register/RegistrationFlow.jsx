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
        pekerjaan_ibu: '',  // Store the ID or name depending on your frontend logic
        pendidikan_ibu: '', // Store the ID or name depending on your frontend logic
        nik_ayah: '',
        nama_ayah: '',
        tempat_lahir_ayah: '',
        tanggal_lahir_ayah: '',
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
        pekerjaan_ayah: '',  // Store the ID or name depending on your frontend logic
        pendidikan_ayah: '',  // Store the ID or name depending on your frontend logic
        nik_wali: '',
        nama_wali: '',
        tempat_lahir_wali: '',
        jenis_kelamin_wali: '',
        tanggal_lahir_wali: '',
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
        pekerjaan_wali: '',  // Store the ID or name depending on your frontend logic
        pendidikan_wali: '',  // Store the ID or name depending on your frontend logic
        posyandu: '',
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
