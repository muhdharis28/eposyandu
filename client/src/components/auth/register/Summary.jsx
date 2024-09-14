import React from 'react';
import { useNavigate } from 'react-router-dom';
import posyandu from '@/assets/posyandu.png';

const Summary = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Adjust the path to match your login route
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="flex flex-col w-full max-w-6xl shadow-xl rounded-3xl bg-white border-2 border-gray-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Success Message Section */}
          <div className="w-full md:w-2/3 p-10 bg-gradient-to-r from-pink via-white to-white text-blue-800">
            <div className="mb-8">
              <h1 className="text-5xl font-extrabold" style={{ color: '#008EB3' }}>
                Pendaftaran Berhasil!
              </h1>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              Selamat, akun Anda telah berhasil didaftarkan. Silakan masuk untuk melanjutkan dan mulai menggunakan layanan kami.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="w-full py-3 rounded-full shadow-lg transition duration-300 hover:bg-blue-700"
              style={{ backgroundColor: '#008EB3', color: 'white' }}
            >
              Kembali ke Login
            </button>
          </div>

          {/* Image or Illustration Section */}
          <div className="w-full md:w-1/3 flex items-center justify-center p-10" style={{ backgroundColor: '#008EB3' }}>
            <div className="flex flex-col items-center text-center">
            <img
              src={posyandu}
              alt="Posyandu Logo"
              className="w-40 mr-2 bg-white rounded-3xl shadow-md"
            />
              <h1 className="text-white text-3xl font-extrabold mt-4">
                ePosyandu Tanjungpinang
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
