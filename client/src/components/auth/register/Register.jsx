import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios
import posyanduLogo from '@/assets/posyandu.png';

const Register = ({ formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [phoneCheckInProgress, setPhoneCheckInProgress] = useState(false);
  const [posyanduOptions, setPosyanduOptions] = useState([]); // State for posyandu options

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posyandu options from the backend
    const fetchPosyandus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posyandu`);
        setPosyanduOptions(response.data);
      } catch (error) {
        console.error('Error fetching posyandu options:', error);
      }
    };

    fetchPosyandus();
  }, []);

  const validate = () => {
    let formErrors = {};

    if (!formData.nama) {
      formErrors.nama = 'Nama Pengguna is required';
    }

    if (!formData.no_hp) {
      formErrors.no_hp = 'No HP is required';
    } else if (!/^\d{10,15}$/.test(formData.no_hp)) {
      formErrors.no_hp = 'No HP is invalid, must be 10-15 digits';
    }

    if (!formData.kata_sandi) {
      formErrors.kata_sandi = 'Kata Sandi is required';
    } else if (formData.kata_sandi.length < 6) {
      formErrors.kata_sandi = 'Kata Sandi must be at least 6 characters';
    }

    if (!formData.posyandu) {
      formErrors.posyandu = 'Posyandu is required';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // If the user is typing their phone number, check if it is already registered
    if (name === 'no_hp' && /^\d{10,15}$/.test(value)) {
      setPhoneCheckInProgress(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/pengguna/check-phone`, { no_hp: value });
        if (response.data.exists) {
          setErrors((prev) => ({ ...prev, no_hp: 'No HP sudah digunakan.' }));
        } else {
          setErrors((prev) => ({ ...prev, no_hp: undefined })); // Clear error if not used
        }
      } catch (error) {
        console.error('Error checking phone number:', error);
      } finally {
        setPhoneCheckInProgress(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return; // Check for validation errors before proceeding

    // Check if the phone number is already registered before submitting
    setPhoneCheckInProgress(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/pengguna/check-phone`, { no_hp: formData.no_hp });
      if (response.data.exists) {
        setErrors((prev) => ({ ...prev, no_hp: 'No HP sudah digunakan.' }));
        setPhoneCheckInProgress(false);
        return; // Stop submission if the phone number is already used
      } else {
        setErrors((prev) => ({ ...prev, no_hp: undefined })); // Clear error if not used
        setPhoneCheckInProgress(false);

        // Proceed with navigation if no validation or phone number errors
        navigate('/register/details');
      }
    } catch (error) {
      console.error('Error checking phone number during submission:', error);
      setPhoneCheckInProgress(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full py-4 px-6 bg-gray-200 shadow-md">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Link to="/" className="flex items-center">
            <img src={posyanduLogo} alt="Logo" className="h-10 w-auto" />
            <span className="text-lg font-semibold ml-2 text-gray-700">ePosyandu Tanjungpinang</span>
          </Link>
          <Link to="/" className="text-gray-600 text-sm font-medium hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
      {/* Form Container */}
      <div className="flex justify-center items-center h-full py-10">
        <div className="flex flex-col w-full max-w-4xl shadow-xl rounded-3xl overflow-hidden bg-white border-2 border-gray-300">
          <div className="flex w-full">
            {/* Left side: Welcome back for existing users */}
            <div className="w-1/2 bg-gray-100 text-blue-800 flex flex-col justify-center items-center p-8 rounded-bl-3xl">
              <h1 className="text-4xl font-bold text-center" style={{ color: '#008EB3' }}>Sudah Punya Akun?</h1>
              <p className="text-center mb-6">Masuk untuk mengakses akun anggota ePosyandu Tanjungpinang</p>
              <Link to="/login" className="py-2 px-6 rounded-full shadow-lg transition duration-300"
                style={{ backgroundColor: '#008EB3', color: 'white' }}
              >
                Masuk
              </Link>
            </div>

            {/* Right side: Register new users */}
            <div className="w-1/2 bg-white text-blue-800 flex flex-col justify-center items-center p-8 rounded-br-3xl">
              <h1 className="text-4xl font-bold text-center" style={{ color: '#008EB3' }}>Buat Akun</h1>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#008EB3' }}>Anggota ePosyandu</h3>
              <p className="text-center mb-6">Isi semua data yang diperlukan untuk mendaftar</p>
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="nama"
                    placeholder="Nama Anggota"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="w-full py-3 px-6 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                </div>
                <div className="mb-4 relative">
                  <input
                    type="text"
                    name="no_hp"
                    placeholder="No HP"
                    value={formData.no_hp}
                    onChange={handleInputChange}
                    className="w-full py-3 px-6 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {phoneCheckInProgress && <span className="absolute right-4 top-4 text-gray-500">Checking...</span>}
                  {errors.no_hp && <p className="text-red-500 text-sm mt-1">{errors.no_hp}</p>}
                </div>
                <div className="mb-4 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="kata_sandi"
                    placeholder="Kata Sandi"
                    value={formData.kata_sandi}
                    onChange={handleInputChange}
                    className="w-full py-3 px-6 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500 px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                  {errors.kata_sandi && <p className="text-red-500 text-sm mt-1">{errors.kata_sandi}</p>}
                </div>

                {/* New Posyandu Dropdown */}
                <div className="mb-4">
                  <select
                    name="posyandu"
                    value={formData.posyandu}
                    onChange={handleInputChange}
                    className="w-full py-3 px-6 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="">Pilih Posyandu</option>
                    {posyanduOptions.map((posyandu) => (
                      <option key={posyandu.id} value={posyandu.id}>
                        {posyandu.nama}
                      </option>
                    ))}
                  </select>
                  {errors.posyandu && <p className="text-red-500 text-sm mt-1">{errors.posyandu}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full shadow-lg transition duration-300 mt-10"
                  style={{ backgroundColor: '#008EB3', color: 'white' }}
                >
                  Daftar
                </button>
                {errors.server && <p className="text-red-500 text-sm mt-4 text-center">{errors.server}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
