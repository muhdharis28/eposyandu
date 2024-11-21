import React, { useState, useEffect } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { createBayi, updateBayi, getBayiById } from '../../BayiService';
import { getOrangTua } from '../../OrangTuaService';
import { useNavigate, useParams } from 'react-router-dom';
import {getPosyandus} from '../../PosyanduService';

const BayiForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama_balita: '',
    orangtua: null,
    nik_balita: '',
    jenis_kelamin_balita: '',
    tempat_lahir_balita: '',
    tanggal_lahir_balita: '',
    berat_badan_awal_balita: '',
    tinggi_badan_awal_balita: '',
    riwayat_penyakit_balita: '',
    riwayat_kelahiran_balita: '',
    keterangan_balita: '',
    posyandu: null,
  });
  const [orangtuaList, setOrangtuaList] = useState([]);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [kader, setKader] = useState('');
  const [posyanduOptions,
    setPosyanduOptions] = useState([]);
  const [errors,
    setErrors] = useState({});

  useEffect(() => {
    if (id) {
      loadBayi();
    }
    fetchOrangtua();
    loadPosyandu();
  }, [id]);

  const loadPosyandu = async() => {
    try {
      const result = await getPosyandus();
      setPosyanduOptions(result.data);
    } catch (error) {
      console.error('Failed to load posyandu options:', error);
    }
  };

  const loadBayi = async () => {
    try {
      const result = await getBayiById(id);
      console.log(result.data)
      setFormData(result.data);
    } catch (error) {
      console.error('Failed to load bayi data:', error);
    }
  };

  const fetchOrangtua = async () => {
    try {
      const result = await getOrangTua();
      setOrangtuaList(result.data);
    } catch (error) {
      console.error('Failed to fetch orangtua data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.posyandu) {
      formErrors.posyandu = 'Posyandu wajib diisi';
    }

    if (!formData.orangtua) {
      formErrors.orangtua = 'Orangtua wajib diisi';
    }

    if (!formData.nik_balita) {
      formErrors.nik_balita = 'NIK Balita wajib diisi';
    } else if (!/^\d{16}$/.test(formData.nik_balita)) {
      formErrors.nik_balita = 'NIK Balita harus 16 digit';
    }

    if (!formData.nama_balita) {
      formErrors.nama_balita = 'Nama Balita wajib diisi';
    }

    if (!formData.tempat_lahir_balita) {
      formErrors.tempat_lahir_balita = 'Tempat Lahir Balita wajib diisi';
    }

    if (!formData.tanggal_lahir_balita) {
      formErrors.tanggal_lahir_balita = 'Tanggal Lahir Balita wajib diisi';
    }
    
    if (!formData.berat_badan_awal_balita) {
      formErrors.tanggal_lahir_balita = 'Berat Badan Awal Balita wajib diisi';
    }

    if (!formData.tinggi_badan_awal_balita) {
      formErrors.tanggal_lahir_balita = 'Tinggi Badan Awal Balita wajib diisi';
    }

    setErrors(formErrors);
    return Object
      .keys(formErrors)
      .length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (id) {
        await updateBayi(id, formData);
      } else {
        await createBayi(formData);
      }
      navigate('/balita');
    } catch (error) {
      console.error('Error submitting bayi data:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/balita');
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Balita
            </button>
          </nav>
          <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Balita' : 'Tambah Balita'}</h2>
          <div
              className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
              <p className="text-sm font-bold">
                <span className="text-red-500">*</span>
                Wajib diisi
              </p>
            </div>
          <form className="space-y-6">
            <div className="p-4 border border-gray-200 rounded-md">
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mb-5">
                <div>
                  <label className="block text-sm font-semibold">Orang Tua
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="orangtua"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.orangtua}
                    onChange={handleChange}>
                    <option value="">Pilih orangtua</option>
                    {orangtuaList.map((orangtua) => (
                      <option key={orangtua.id} value={orangtua.id}>
                        {orangtua.nama_ayah} - {orangtua.nama_ibu}
                      </option>
                    ))}
                  </select>
                  {errors.wali && <p className="text-red-500 text-sm mt-1">{errors.wali}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">Posyandu
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="posyandu"
                    value={formData.posyandu}
                    onChange={(e) => setFormData({
                    ...formData,
                    posyandu: e.target.value
                  })}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                    <option value="">Pilih Posyandu</option>
                    {posyanduOptions.length > 0 && posyanduOptions.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.nama}
                      </option>
                    ))}
                  </select>
                  {errors.posyandu && <p className="text-red-500 text-sm mt-1">{errors.posyandu}</p>}
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">Data Balita</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0">
                  <div>
                    <label className="block text-sm font-semibold">NIK Balita
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nik_balita"
                      value={formData.nik_balita}
                      onChange={(e) => setFormData({
                      ...formData,
                      nik_balita: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nik_balita && <p className="text-red-500 text-sm mt-1">{errors.nik_balita}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Nama Balita
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nama_balita"
                      value={formData.nama_balita}
                      onChange={(e) => setFormData({
                      ...formData,
                      nama_balita: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.nama_balita && <p className="text-red-500 text-sm mt-1">{errors.nama_balita}</p>}
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Tempat Lahir Balita
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="tempat_lahir_balita"
                      value={formData.tempat_lahir_balita}
                      onChange={(e) => setFormData({
                      ...formData,
                      tempat_lahir_balita: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tempat_lahir_balita && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir_balita}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Tanggal Lahir Balita
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="tanggal_lahir_balita"
                      value={formData.tanggal_lahir_balita}
                      onChange={(e) => setFormData({
                      ...formData,
                      tanggal_lahir_balita: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tanggal_lahir_balita && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir_balita}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Jenis Kelamin
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="jenis_kelamin_balita"
                      value={formData.jenis_kelamin_balita}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="l">Laki-laki</option>
                      <option value="p">Perempuan</option>
                    </select>
                    {errors.jenis_kelamin_balita && <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin_balita}</p>}
                  </div>
                  
                  <div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-semibold">Berat Badan Awal (kg)
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="berat_badan_awal_balita"
                          value={formData.berat_badan_awal_balita}
                          onChange={(e) => setFormData({
                          ...formData,
                          berat_badan_awal_balita: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.berat_badan_awal_balita && <p className="text-red-500 text-sm mt-1">{errors.berat_badan_awal_balita}</p>}
                      </div>
                      <div>
                      <label className="block text-sm font-semibold">Tinggi Badan Awal (cm)
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="tinggi_badan_awal_balita"
                          value={formData.tinggi_badan_awal_balita}
                          onChange={(e) => setFormData({
                          ...formData,
                          tinggi_badan_awal_balita: e.target.value
                        })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.tinggi_badan_awal_balita && <p className="text-red-500 text-sm mt-1">{errors.tinggi_badan_awal_balita}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Riwayat Penyakit</label>
                    <textarea
                      name="riwayat_penyakit_balita"
                      value={formData.riwayat_penyakit_balita}
                      onChange={(e) => setFormData({
                      ...formData,
                      riwayat_penyakit_balita: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      rows="4"/> {errors.riwayat_penyakit_balita && <p className="text-red-500 text-sm mt-1">{errors.riwayat_penyakit_balita}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Riwayat Kelahiran</label>
                    <textarea
                      name="riwayat_kelahiran_balita"
                      value={formData.riwayat_kelahiran_balita}
                      onChange={(e) => setFormData({
                      ...formData,
                      riwayat_kelahiran_balita: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      rows="4"/> {errors.riwayat_kelahiran_balita && <p className="text-red-500 text-sm mt-1">{errors.riwayat_kelahiran_balita}</p>}
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
                  <div>
                    <label className="block text-sm font-semibold">Keterangan</label>
                    <textarea
                      name="keterangan_balita"
                      value={formData.keterangan_balita}
                      onChange={(e) => setFormData({
                      ...formData,
                      keterangan_balita: e.target.value
                    })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      rows="4"/> {errors.keterangan_balita && <p className="text-red-500 text-sm mt-1">{errors.keterangan_balita}</p>}
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
              {id
                ? 'Edit'
                : 'Tambah'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BayiForm;
