import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import image from '@/assets/register-detail.png';

const RegistrationDetails = ({ formData, updateFormData }) => {  // Correctly receive props here
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
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

  const handleNext = () => {
    if (validateForm()) {
      navigate('/register/data-diri-ibu', { state: { formData } }); // Pass formData to the next component
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 py-10">
      <div className="flex w-full max-w-6xl shadow-lg">
        <div className="w-1/2 bg-pink-100 text-blue-800 flex flex-col justify-center p-16">
          <h1 className="text-3xl font-bold mb-8">Buat Akun</h1>
          <form className="w-full">
            <div className="mb-4">
              <label className="block text-sm mb-2">No KTP</label>
              <input
                type="text"
                name="no_ktp"
                value={formData.no_ktp || ''}
                onChange={handleInputChange}
                placeholder="Inputkan No KTP"
                className={`w-full p-3 border ${errors.no_ktp ? 'border-red-500' : 'border-gray-300'} rounded`}
              />
              {errors.no_ktp && <p className="text-red-500 text-sm mt-1">{errors.no_ktp}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">No Kartu Keluarga</label>
              <input
                type="text"
                name="no_kk"
                value={formData.no_kk || ''}
                onChange={handleInputChange}
                placeholder="Inputkan No Kartu Keluarga"
                className={`w-full p-3 border ${errors.no_kk ? 'border-red-500' : 'border-gray-300'} rounded`}
              />
              {errors.no_kk && <p className="text-red-500 text-sm mt-1">{errors.no_kk}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Foto KK</label>
              <input
                type="file"
                name="foto_kk"
                onChange={(e) => updateFormData({ foto_kk: e.target.files[0] })}
                className={`w-full p-3 border ${errors.foto_kk ? 'border-red-500' : 'border-gray-300'} rounded`}
              />
              {errors.foto_kk && <p className="text-red-500 text-sm mt-1">{errors.foto_kk}</p>}
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
                onClick={handleNext}
              >
                Untuk Bayi
              </button>
              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
                // Add your logic for "Untuk Lansia"
              >
                Untuk Lansia
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2 bg-white flex justify-center items-center p-8">
          <div className="w-full flex justify-center">
            <img
              src={image}
              alt="Illustration"
              className="w-3/4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;
