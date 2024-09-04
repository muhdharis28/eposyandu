import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();

  // Handle the logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="h-screen bg-blue-100 flex flex-col justify-between p-4">
      <div>
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Posyandu</h1>
        <ul>
          <li>
            <Link to="/admin-dashboard" className="flex items-center text-blue-700 mb-4">
              <span className="mr-2">🏠</span> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/data" className="flex items-center text-blue-700 mb-4">
              <span className="mr-2">📊</span> Data
            </Link>
          </li>
          <li>
            <Link to="/dokter" className="flex items-center text-blue-700 mb-4">
              <span className="mr-2">👩‍⚕️</span> Dokter
            </Link>
          </li>
          <li>
            <Link to="/pekerjaan" className="flex items-center text-blue-700 mb-4">
              <span className="mr-2">👨‍💼</span> Pekerjaan
            </Link>
          </li>
          <li>
            <Link to="/pendidikan" className="flex items-center text-blue-700 mb-4">
              <span className="mr-2">🎓</span> Pendidikan
            </Link>
          </li>
          <li>
            <Link to="/kegiatan" className="flex items-center text-blue-700 mb-4">
              <span className="mr-2">📅</span> Kegiatan
            </Link>
          </li>
          <li>
            <Link to="/patient" className="flex items-center text-blue-700 mb-4">
              <span className="mr-2">🧑‍🤝‍🧑</span> Pasien
            </Link>
          </li>
          <li>
            <Link to="/report" className="flex items-center text-blue-700 mb-4">
              <span className="mr-2">📄</span> Laporan
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center text-blue-700 mb-4">
              <span className="mr-2">⚙️</span> Pengaturan
            </Link>
          </li>
        </ul>
      </div>
      <div>
        {/* Replace the logout link with a button */}
        <button onClick={handleLogout} className="flex items-center text-red-600 mb-4">
          <span className="mr-2">🚪</span> Logout
        </button>
        <div className="flex items-center">
          <img src="/path/to/profile-image.jpg" alt="Profile" className="w-8 h-8 rounded-full mr-2" />
          <div>
            <p className="text-blue-700 font-bold">Haris</p>
            <p className="text-gray-500 text-sm">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
