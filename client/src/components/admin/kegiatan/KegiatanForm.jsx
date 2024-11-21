import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createKegiatan, updateKegiatan, getKegiatanById } from '../../KegiatanService';
import { getPosyandus } from '../../PosyanduService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const KegiatanForm = () => {
  const { id } = useParams();
  const [kegiatan, setKegiatan] = useState({
    nama: '',
    tanggal: '',
    jenis: null,
    deskripsi: '',
    kader: null,
    posyandu: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [posyanduOptions, setPosyanduOptions] = useState([]);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  useEffect(() => {
    if (id) {
      loadKegiatan();
    }
    loadPosyandu();
  }, [id]);

  const loadKegiatan = async () => {
    try {
      const result = await getKegiatanById(id);
      setKegiatan(result.data);
    } catch (error) {
      setError('Failed to load kegiatan data.');
      console.error('Failed to load kegiatan data:', error);
    }
  };

  const loadPosyandu = async () => {
    try {
      const result = await getPosyandus();
      console.log(result)
      setPosyanduOptions(result.data);
    } catch (error) {
      console.error('Failed to load posyandu data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKegiatan((prevKegiatan) => ({ ...prevKegiatan, [name]: value }));
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
            <div>
              <div className="mb-4">
                <label className="block text-gray-700">Nama Kegiatan</label>
                <input
                  type="text"
                  name="nama"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={kegiatan.nama}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Tanggal</label>
                <input
                  type="date"
                  name="tanggal"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={kegiatan.tanggal}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Jenis</label>
                <select
                  name="jenis"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={kegiatan.jenis}
                  onChange={handleChange}
                  required
                >
                  <option value="balita">Balita</option>
                  <option value="lansia">Lansia</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Posyandu</label>
                <select
                  name="posyandu"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={kegiatan.posyandu}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih posyandu</option>
                  {posyanduOptions.map((posyandu) => (
                    <option key={posyandu.id} value={posyandu.id}>
                      {posyandu.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-gray-700">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={kegiatan.deskripsi}
                  onChange={handleChange}
                  rows="8"
                ></textarea>
              </div>
              <div className="mt-4 flex space-x-4">
                <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">
                  {id ? 'Edit' : 'Tambah'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KegiatanForm;
