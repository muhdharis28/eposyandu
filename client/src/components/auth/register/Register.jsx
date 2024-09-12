import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ formData, setFormData, navigate }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    if (!formData.nama) {
      formErrors.nama = 'Nama Pengguna is required';
    }

    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }

    if (!formData.kata_sandi) {
      formErrors.kata_sandi = 'Kata Sandi is required';
    } else if (formData.kata_sandi.length < 6) {
      formErrors.kata_sandi = 'Kata Sandi must be at least 6 characters';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Navigate to the next step in the registration flow
    navigate('/register/details');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg">
        <div className="w-1/2 bg-blue-800 text-white flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold mb-4">Selamat Datang Kembali!</h1>
          <p className="text-center mb-6">
            Untuk Kembali Mengakses E-Posyandu Tanjungpinang, Silakan Masuk Menggunakan Data Pribadi Anda.
          </p>
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Masuk
          </Link>
        </div>
        <div className="w-1/2 bg-pink-100 text-blue-800 flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold mb-4">Buat Akun Anggota Posyandu</h1>
          <p className="text-center mb-6">Isi semua data yang di perlukan</p>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="nama"
                placeholder="Nama Anggota"
                value={formData.nama}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="No HP"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="kata_sandi"
                placeholder="Kata Sandi"
                value={formData.kata_sandi}
                onChange={handleInputChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
              />
              {errors.kata_sandi && <p className="text-red-500 text-sm mt-1">{errors.kata_sandi}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded">
              Daftar
            </button>
            {errors.server && <p className="text-red-500 text-sm mt-4 text-center">{errors.server}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
