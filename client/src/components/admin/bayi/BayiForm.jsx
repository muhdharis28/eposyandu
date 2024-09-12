import React, { useState, useEffect } from 'react';
import { createBayi, updateBayi, getBayi } from './BayiService';

const BayiForm = ({ id, onClose }) => {
  const [formData, setFormData] = useState({
    nama: '',
    orangtua: '',
    nik: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    berat_badan_awal: '',
    tinggi_badan_awal: '',
    riwayat_penyakit: '',
    riwayat_kelahiran: '',
    keterangan: '',
  });

  useEffect(() => {
    if (id) {
      loadBayi();
    }
  }, [id]);

  const loadBayi = async () => {
    try {
      const result = await getBayi();
      const bayi = result.data.find((b) => b.id === id);
      if (bayi) {
        setFormData({
          nama: bayi.nama,
          orangtua: bayi.orangtua,
          nik: bayi.nik,
          jenis_kelamin: bayi.jenis_kelamin,
          tempat_lahir: bayi.tempat_lahir,
          tanggal_lahir: bayi.tanggal_lahir,
          berat_badan_awal: bayi.berat_badan_awal,
          tinggi_badan_awal: bayi.tinggi_badan_awal,
          riwayat_penyakit: bayi.riwayat_penyakit,
          riwayat_kelahiran: bayi.riwayat_kelahiran,
          keterangan: bayi.keterangan,
        });
      }
    } catch (error) {
      console.error('Failed to load bayi data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateBayi(id, formData);
      } else {
        await createBayi(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting bayi:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Bayi' : 'Tambah Bayi'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama</label>
          <input
            type="text"
            name="nama"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Orang Tua</label>
          <input
            type="number"
            name="orangtua"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.orangtua}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">NIK</label>
          <input
            type="number"
            name="nik"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.nik}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Jenis Kelamin</label>
          <select
            name="jenis_kelamin"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.jenis_kelamin}
            onChange={handleChange}
            required
          >
            <option value="">Pilih</option>
            <option value="l">Laki-laki</option>
            <option value="p">Perempuan</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tempat Lahir</label>
          <input
            type="text"
            name="tempat_lahir"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.tempat_lahir}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tanggal Lahir</label>
          <input
            type="date"
            name="tanggal_lahir"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.tanggal_lahir}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Berat Badan Awal (kg)</label>
          <input
            type="number"
            name="berat_badan_awal"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.berat_badan_awal}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tinggi Badan Awal (cm)</label>
          <input
            type="number"
            name="tinggi_badan_awal"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.tinggi_badan_awal}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Riwayat Penyakit</label>
          <input
            type="text"
            name="riwayat_penyakit"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.riwayat_penyakit}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Riwayat Kelahiran</label>
          <input
            type="text"
            name="riwayat_kelahiran"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.riwayat_kelahiran}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Keterangan</label>
          <textarea
            name="keterangan"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.keterangan}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">
          {id ? 'Update' : 'Tambah'}
        </button>
        <button type="button" onClick={onClose} className="text-gray-700 px-4 py-2 ml-4 rounded">
          Batal
        </button>
      </form>
    </div>
  );
};

export default BayiForm;
