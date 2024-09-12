import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
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
            email,
            kata_sandi: password,
        });

        const { token, role, userName, userEmail } = response.data;

        // Store the token, role, and user information in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userName', userName);  // Store user name
        localStorage.setItem('userEmail', userEmail);  // Store user email

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
        setError('Invalid email or password');
    }
};  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg">
        <div className="w-1/2 bg-pink-100 text-blue-800 flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Masuk Ke E-Posyandu Tanjungpinang</h1>
          <p className="text-center mb-6">Tolong inputkan data anda!</p>
          <form className="w-full" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Kata Sandi"
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="text-right mb-4">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Your Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
            >
              Masuk
            </button>
          </form>
        </div>
        <div className="w-1/2 bg-blue-800 text-white flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold mb-4">Hallo, Parent!</h1>
          <p className="text-center mb-6">Masukan data diri kamu dan bergabung bersama E-Posyandu Tanjungpinang.</p>
          <Link to="/register" className="bg-white text-blue-600 hover:bg-gray-100 py-2 px-4 rounded">Daftar</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
