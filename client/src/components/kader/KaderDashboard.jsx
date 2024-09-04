import React from 'react';
import { Link } from 'react-router-dom';

const KaderDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Posyandu</h2>
        </div>
        <nav className="flex flex-col flex-grow p-4">
          <Link to="/kader-dashboard" className="py-2 px-4 hover:bg-blue-700 rounded">
            Dashboard
          </Link>
          <Link to="/kader-data" className="py-2 px-4 hover:bg-blue-700 rounded">
            Data
          </Link>
          <Link to="/kader-kegiatan" className="py-2 px-4 hover:bg-blue-700 rounded">
            Kegiatan
          </Link>
          <Link to="/kader-pasien" className="py-2 px-4 hover:bg-blue-700 rounded">
            Pasien
          </Link>
          <Link to="/kader-laporan" className="py-2 px-4 hover:bg-blue-700 rounded">
            Laporan
          </Link>
          <Link to="/kader-pengaturan" className="py-2 px-4 hover:bg-blue-700 rounded">
            Pengaturan
          </Link>
        </nav>
        <div className="p-4 mt-auto">
          <Link to="/logout" className="text-red-400 hover:text-red-600">
            Logout
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-4 py-2 w-1/4"
          />
        </header>

        {/* Dashboard Stats */}
        <main className="flex-1 p-6 bg-gray-200">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Kegiatan</h2>
              <p className="text-4xl">132</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Pasien</h2>
              <p className="text-4xl">45</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Dokter</h2>
              <p className="text-4xl">5</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Laporan</h2>
              <p className="text-4xl">28</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Bayi</h2>
              <p className="text-4xl">12</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Lansia</h2>
              <p className="text-4xl">4</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default KaderDashboard;
