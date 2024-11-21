import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import posyandu from '@/assets/silaba.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [noHp, setNoHp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!noHp || !password) {
      setError('No HP dan kata sandi diperlukan');
      return false;
    }
    if (!/^\d{10,15}$/.test(noHp)) {
      setError('Masukkan No HP yang valid (10-15 digit)');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/pengguna/login`, {
        no_hp: noHp,
        kata_sandi: password,
      });

      const { token, role, userName, userId, userPosyanduId, userPosyanduName } = response.data;
      console.log(response.data)
      // Store the token, role, and user information in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userName', userName); // Store user name
      localStorage.setItem('userId', userId); // Store user email
      localStorage.setItem('userPosyanduId', userPosyanduId); // Store user email
      localStorage.setItem('userPosyanduName', userPosyanduName); // Store user email

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else if (role === 'kader') {
        navigate('/kader-dashboard', { replace: true });
      } else if (role === 'user') {
        navigate('/user-dashboard', { replace: true });
      } else {
        setError('Unknown role');
      }
    } catch (err) {
      setError('No HP atau kata sandi salah');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Separate Topbar with toned-down color */}
      <div className="w-full py-4 px-6 bg-gray-200 shadow-md">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Link to="/" className="flex items-center">
            <img src={posyandu} alt="Logo" className="h-10 w-auto" />
            <span className="text-lg font-semibold ml-2 text-gray-700">SiLaBa Tanjungpinang</span>
          </Link>
          <Link to="/" className="text-gray-600 text-sm font-medium hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex justify-center items-center h-full py-10">
        {/* Added tight border to form container */}
        <div className="flex flex-col w-full max-w-4xl shadow-xl rounded-3xl overflow-hidden bg-white border-2 border-gray-300">
          <div className="flex w-full">
            {/* Left side: Login form */}
            <div className="w-1/2 bg-white text-blue-800 flex flex-col justify-center items-center p-8 rounded-bl-3xl">
              <h1 className="text-4xl font-bold text-center" style={{ color: '#008EB3' }}>Selamat Datang</h1>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#008EB3' }}>Anggota SiLaBa Tanjungpinang</h3>
              <p className="text-center mb-6 text-gray-600">Masukkan No HP dan kata sandi Anda untuk masuk</p>
              <form className="w-full" onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="No HP"
                  className="w-full py-3 px-6 mb-4 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2"
                  style={{ focus: { borderColor: '#008EB3' } }}
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                />
                <div className="relative w-full">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Kata Sandi"
                    className="w-full py-3 px-6 mb-4 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2"
                    style={{ focus: { borderColor: '#008EB3' } }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500 px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-3 rounded-full shadow-lg transition duration-300 mt-10"
                  style={{ backgroundColor: '#008EB3', color: 'white' }}
                >
                  Masuk
                </button>
              </form>
            </div>

            {/* Right side: Register invitation */}
            <div className="w-1/2 bg-gray-100 text-blue-800 flex flex-col justify-center items-center p-8 rounded-br-3xl">
              <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: '#008EB3' }}>Belum Punya Akun?</h1>
              <p className="text-center mb-6">Daftar sekarang dan bergabung menjadi anggota SiLaBa Tanjungpinang.</p>
              <Link to="/register" className="py-2 px-6 rounded-full shadow-lg transition duration-300"
                style={{ backgroundColor: '#008EB3', color: 'white' }}
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
