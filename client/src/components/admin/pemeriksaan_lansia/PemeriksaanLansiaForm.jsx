import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPemeriksaanLansiaById, createPemeriksaanLansia, updatePemeriksaanLansia } from '../../PemeriksaanLansiaService';
import { getLansia } from '../../LansiaService';
import { getDoctors } from '../../DokterService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext'; 
import {getPosyandus} from '../../PosyanduService';

const PemeriksaanLansiaForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    lansia: '',
    tanggal_kunjungan: '',
    berat_badan: '',
    tinggi_badan: '',
    lingkar_perut: '',
    tekanan_darah: '',
    gula_darah: '',
    kolestrol: '',
    asam_urat: '',
    kesehatan_mata: '',
    keterangan: '',
    riwayat_obat: '',
    riwayat_penyakit: '',
    posyandu: null,
    dokter: null,
    kader: null
  });

  const [lansiaOptions, setLansiaOptions] = useState([]);
  const [dokterOptions, setDokterOptions] = useState([]);
  const navigate = useNavigate();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [posyanduOptions,
    setPosyanduOptions] = useState([]);

  useEffect(() => {
    if (id) {
      loadPemeriksaanLansia();
    }
    loadLansiaOptions();
    loadDokterOptions();
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

  const loadPemeriksaanLansia = async () => {
    try {
      const result = await getPemeriksaanLansiaById(id);
      setFormData(result.data);
    } catch (error) {
      console.error('Failed to load pemeriksaan lansia data:', error);
    }
  };

  const loadLansiaOptions = async () => {
    try {
      const result = await getLansia();
      setLansiaOptions(result.data);
    } catch (error) {
      console.error('Failed to fetch Lansia data:', error);
    }
  };

  const loadDokterOptions = async () => {
    try {
      const result = await getDoctors();
      setDokterOptions(result.data);
    } catch (error) {
      console.error('Failed to fetch Dokter data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePemeriksaanLansia(id, formData);
      } else {
        await createPemeriksaanLansia(formData);
      }
      navigate('/pemeriksaan-lansia');
    } catch (error) {
      console.error('Error submitting pemeriksaan lansia data:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/pemeriksaan-lansia');
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
            <nav className="text-sm text-gray-600 mb-4">
                <button onClick={handleBackToList} className="text-blue-500 hover:underline">
                &lt; Kembali ke Daftar Pengguna
                </button>
            </nav>
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Pemeriksaan Lansia' : 'Tambah Pemeriksaan Lansia'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-gray-700">Lansia</span>
                    <select
                    name="lansia"
                    value={formData.lansia}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                    >
                    <option value="">Pilih Lansia</option>
                    {lansiaOptions.map((lansia) => (
                        <option key={lansia.id} value={lansia.id}>
                        {lansia.nama_lansia}
                        </option>
                    ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-700">Tanggal Kunjungan</span>
                    <input
                    type="date"
                    name="tanggal_kunjungan"
                    value={formData.tanggal_kunjungan}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Berat Badan (kg)</span>
                    <input
                    type="number"
                    name="berat_badan"
                    value={formData.berat_badan}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Tinggi Badan (cm)</span>
                    <input
                    type="number"
                    name="tinggi_badan"
                    value={formData.tinggi_badan}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Lingkar Perut (cm)</span>
                    <input
                    type="number"
                    name="lingkar_perut"
                    value={formData.lingkar_perut}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Tekanan Darah (mmHg)</span>
                    <input
                    type="number"
                    name="tekanan_darah"
                    value={formData.tekanan_darah}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-gray-700">Gula Darah (mg/dL)</span>
                    <input
                    type="number"
                    name="gula_darah"
                    value={formData.gula_darah}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Kolesterol (mg/dL)</span>
                    <input
                    type="number"
                    name="kolestrol"
                    value={formData.kolestrol}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Asam Urat (mg/dL)</span>
                    <input
                    type="number"
                    name="asam_urat"
                    value={formData.asam_urat}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Kesehatan Mata (/10)</span>
                    <input
                    type="number"
                    name="kesehatan_mata"
                    value={formData.kesehatan_mata}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-gray-700">Riwayat Obat</span>
                    <textarea
                    name="riwayat_obat"
                    value={formData.riwayat_obat}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Riwayat Penyakit</span>
                    <textarea
                    name="riwayat_penyakit"
                    value={formData.riwayat_penyakit}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Posyandu</span>
                    <select
                    name="posyandu"
                    value={formData.posyandu}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                    >
                    <option value="">Pilih Posyandu</option>
                    {posyanduOptions.map((posyandu) => (
                        <option key={posyandu.id} value={posyandu.id}>
                        {posyandu.nama}
                        </option>
                    ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-700">Dokter</span>
                    <select
                    name="dokter"
                    value={formData.dokter}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    >
                    <option value="">Pilih Dokter</option>
                    {dokterOptions.map((dokter) => (
                        <option key={dokter.id} value={dokter.id}>
                        {dokter.nama}
                        </option>
                    ))}
                    </select>
                </label>
                </div>

                <div className="flex justify-start">
                <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">
                    {id ? 'Edit' : 'Tambah'}
                </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default PemeriksaanLansiaForm;
