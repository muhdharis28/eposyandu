import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createKegiatan, updateKegiatan, getKegiatanById } from '../../KegiatanService';
import { getKader } from '../../PenggunaService'; // Assume this fetches users with the 'kader' role
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const KegiatanForm = () => {
  const { id } = useParams();
  const [nama, setNama] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jenis, setJenis] = useState('balita');
  const [deskripsi, setDeskripsi] = useState('');
  const [kader, setKader] = useState(''); // Store selected kader
  const [kaderOptions, setKaderOptions] = useState([]); // Store list of kader options
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  useEffect(() => {
    if (id) {
      loadKegiatan(); // Load kegiatan data for editing
    }
    loadKaders(); // Load kader options
  }, [id]);

  const loadKegiatan = async () => {
    try {
      const result = await getKegiatanById(id);
      const kegiatan = result.data;
      setNama(kegiatan.nama);
      setTanggal(kegiatan.tanggal);
      setJenis(kegiatan.jenis);
      setDeskripsi(kegiatan.deskripsi);
      setKader(kegiatan.kader); // Set kader if available
    } catch (error) {
      setError('Failed to load kegiatan data.');
      console.error('Failed to load kegiatan data:', error);
    }
  };

  const loadKaders = async () => {
    try {
      const result = await getKader(); // Fetch kader data (users with the role 'kader')
      console.log(result.data)
      setKaderOptions(result.data);
    } catch (error) {
      setError('Failed to load kader options.');
      console.error('Failed to load kader options:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const kegiatan = { nama, tanggal, jenis, deskripsi, kader };

    try {
      if (id) {
        await updateKegiatan(id, kegiatan);
      } else {
        await createKegiatan(kegiatan);
      }
      navigate('/kegiatan');
    } catch (error) {
      setError('Failed to save kegiatan data.');
      console.error('Error saving kegiatan:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/kegiatan');
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Kegiatan
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Kegiatan' : 'Tambah Kegiatan'}</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Nama Kegiatan</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Tanggal</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Jenis</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                  required
                >
                  <option value="balita">Balita</option>
                  <option value="lansia">Lansia</option>
                </select>
              </div>

              {/* Kader Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700">Kader</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={kader}
                  onChange={(e) => setKader(e.target.value)}
                  required
                >
                  <option value="">Pilih Kader</option>
                  {kaderOptions.map((kader) => (
                    <option key={kader.id} value={kader.id}>
                      {kader.nama} - {kader.posyanduDetail?.nama}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">
                {id ? 'Update' : 'Tambah'}
              </button>
            </div>

            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700">Deskripsi</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows="8"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KegiatanForm;
