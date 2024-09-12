import React, { useEffect, useState } from 'react';
import { getBayi } from './BayiService';

const BayiDetail = ({ id, onClose }) => {
  const [bayi, setBayi] = useState(null);

  useEffect(() => {
    if (id) {
      loadBayi();
    }
  }, [id]);

  const loadBayi = async () => {
    try {
      const result = await getBayi();
      const selectedBayi = result.data.find((b) => b.id === id);
      setBayi(selectedBayi);
    } catch (error) {
      console.error('Failed to load bayi detail:', error);
    }
  };

  if (!bayi) return null;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Detail Bayi</h2>
      <p><strong>Nama:</strong> {bayi.nama}</p>
      <p><strong>Orang Tua:</strong> {bayi.orangtua}</p>
      <p><strong>NIK:</strong> {bayi.nik}</p>
      <p><strong>Tempat Lahir:</strong> {bayi.tempat_lahir}</p>
      <p><strong>Tanggal Lahir:</strong> {bayi.tanggal_lahir}</p>
      <p><strong>Jenis Kelamin:</strong> {bayi.jenis_kelamin === 'l' ? 'Laki-laki' : 'Perempuan'}</p>
      <p><strong>Berat Badan Awal:</strong> {bayi.berat_badan_awal} kg</p>
      <p><strong>Tinggi Badan Awal:</strong> {bayi.tinggi_badan_awal} cm</p>
      <p><strong>Riwayat Penyakit:</strong> {bayi.riwayat_penyakit}</p>
      <p><strong>Riwayat Kelahiran:</strong> {bayi.riwayat_kelahiran}</p>
      <p><strong>Keterangan:</strong> {bayi.keterangan}</p>
      <button onClick={onClose} className="text-white bg-blue-500 px-4 py-2 rounded mt-4">
        Tutup
      </button>
    </div>
  );
};

export default BayiDetail;
