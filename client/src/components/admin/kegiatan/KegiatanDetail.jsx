// KegiatanDetail.jsx
import React from 'react';

const KegiatanDetail = ({ kegiatan, onClose }) => {
  if (!kegiatan) return null;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Detail Kegiatan</h2>
      <p><strong>Nama:</strong> {kegiatan.nama}</p>
      <p><strong>Tanggal:</strong> {kegiatan.tanggal}</p>
      <p><strong>Jenis:</strong> {kegiatan.jenis}</p>
      <p><strong>Deskripsi:</strong> {kegiatan.deskripsi}</p>
      <button
        onClick={onClose}
        className="mt-4 p-2 bg-gray-500 text-white rounded"
      >
        Close
      </button>
    </div>
  );
};

export default KegiatanDetail;
