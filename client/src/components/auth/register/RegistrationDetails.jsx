import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import image from '@/assets/register-detail.png';

const RegistrationDetails = ({ formData, updateFormData }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [nikCheckInProgress, setNikCheckInProgress] = useState(false); // To track NIK checking progress

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    // If the user is typing their NIK, check if it is already registered
    if (name === 'no_ktp' && /^\d{16}$/.test(value)) {
      setNikCheckInProgress(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/pengguna/check-nik`, { no_ktp: value });
        if (response.data.exists) {
          setErrors((prev) => ({ ...prev, no_ktp: 'NIK sudah terdaftar.' }));
        } else {
          setErrors((prev) => ({ ...prev, no_ktp: undefined })); // Clear the error if the NIK is not registered
        }
      } catch (error) {
        console.error('Error checking NIK:', error);
      } finally {
        setNikCheckInProgress(false);
      }
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.no_ktp) {
      formErrors.no_ktp = 'No KTP is required';
    } else if (!/^\d{16}$/.test(formData.no_ktp)) {
      formErrors.no_ktp = 'No KTP must be 16 digits';
    }

    if (!formData.no_kk) {
      formErrors.no_kk = 'No Kartu Keluarga is required';
    } else if (!/^\d{16}$/.test(formData.no_kk)) {
      formErrors.no_kk = 'No Kartu Keluarga must be 16 digits';
    }

    if (!formData.foto_kk) {
      formErrors.foto_kk = 'Foto Kartu Keluarga is required';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleNextStep = async (path) => {
    // Re-check the NIK on submit to ensure it is not registered
    if (validateForm() && !nikCheckInProgress && !errors.no_ktp) {
      setNikCheckInProgress(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/pengguna/check-nik`, { no_ktp: formData.no_ktp });
        if (response.data.exists) {
          setErrors((prev) => ({ ...prev, no_ktp: 'NIK sudah terdaftar.' }));
          setNikCheckInProgress(false);
          return; // Stop submission if NIK is already used
        } else {
          setErrors((prev) => ({ ...prev, no_ktp: undefined })); // Clear the error if the NIK is not registered
          setNikCheckInProgress(false);
          
          navigate(path, { state: { formData } }); // Navigate to the next step
        }
      } catch (error) {
        console.error('Error checking NIK on submit:', error);
        setNikCheckInProgress(false);
      }
    }
  };

  const handleBack = () => {
    navigate('/register', { state: { formData } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center h-full py-10">
        <div className="flex flex-col w-full max-w-6xl shadow-xl rounded-3xl overflow-hidden bg-white border-2 border-gray-300">
          <div className="flex w-full">
            {/* Left side: Form */}
            <div className="w-1/2 bg-white text-blue-800 flex flex-col justify-center items-center p-10 rounded-bl-3xl">
              <button
                className="text-blue-600 hover:underline self-end mb-6 text-base font-medium transition ease-in-out"
                onClick={handleBack}
              >
                ← Kembali
              </button>
              <h1 className="text-4xl font-bold text-center" style={{ color: '#008EB3' }}>
                Detail Pendaftaran
              </h1>
              <h3 className="text-xl font-semibold mb-8 text-center" style={{ color: '#008EB3' }}>
                Anggota SiLaBa Tanjungpinang
              </h3>
              <form className="w-full">
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">NIK</label>
                  <input
                    type="text"
                    name="no_ktp"
                    value={formData.no_ktp || ''}
                    onChange={handleInputChange}
                    placeholder="Inputkan NIK"
                    className={`w-full py-3 px-6 border ${errors.no_ktp ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                  />
                  {nikCheckInProgress && <p className="text-gray-500 text-sm">Memeriksa NIK...</p>}
                  {errors.no_ktp && <p className="text-red-500 text-sm mt-2">{errors.no_ktp}</p>}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">No Kartu Keluarga</label>
                  <input
                    type="text"
                    name="no_kk"
                    value={formData.no_kk || ''}
                    onChange={handleInputChange}
                    placeholder="Inputkan No Kartu Keluarga"
                    className={`w-full py-3 px-6 border ${errors.no_kk ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                  />
                  {errors.no_kk && <p className="text-red-500 text-sm mt-2">{errors.no_kk}</p>}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Foto KK</label>
                  <input
                    type="file"
                    name="foto_kk"
                    onChange={(e) => updateFormData({ foto_kk: e.target.files[0] })}
                    className={`w-full py-3 px-6 border ${errors.foto_kk ? 'border-red-500' : 'border-gray-300'} rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                  />
                  {errors.foto_kk && <p className="text-red-500 text-sm mt-2">{errors.foto_kk}</p>}
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    type="button"
                    className="w-full py-3 rounded-full shadow-lg transition duration-300"
                    style={{ backgroundColor: '#008EB3', color: 'white' }}
                    onClick={() => handleNextStep('/register/data-diri-ibu')}
                  >
                    Untuk Bayi
                  </button>
                  <button
                    type="button"
                    className="w-full py-3 rounded-full shadow-lg transition duration-300"
                    style={{ backgroundColor: '#008EB3', color: 'white' }}
                    onClick={() => handleNextStep('/register/data-diri-wali')}
                  >
                    Untuk Lansia
                  </button>
                </div>
              </form>
            </div>

            {/* Right side: Image illustration */}
            <div className="w-1/2 bg-gray-100 flex justify-center items-center p-8 rounded-br-3xl">
              <img src={image} alt="Illustration" className="w-full h-auto max-w-xl object-contain rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;
