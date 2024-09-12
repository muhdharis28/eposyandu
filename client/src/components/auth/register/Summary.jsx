import React from 'react';
import { useNavigate } from 'react-router-dom';

const Summary = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Adjust the path to match your login route
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg">
        {/* Success Message Section */}
        <div className="flex-1 bg-pink-100 p-10">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Pendaftaran Berhasil!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Selamat, akun Anda telah berhasil didaftarkan. Silakan masuk untuk melanjutkan.
          </p>
          <button
            onClick={handleLoginRedirect}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Kembali ke Login
          </button>
        </div>
        {/* Optional Image or Illustration Section */}
        <div className="flex-1 bg-blue-800 p-10 hidden md:flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">E-Posyandu Tanjungpinang</h1>
        </div>
      </div>
    </div>
  );
};

export default Summary;
