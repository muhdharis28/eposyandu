// DokterDetail.js
import React from 'react';

const DokterDetail = ({ doctor }) => {
  if (!doctor) return null;

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">Detail Dokter</h3>
      <p><strong>Nama:</strong> {doctor.nama}</p>
      <p><strong>Spesialisasi:</strong> {doctor.spesialisasi}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Telepon:</strong> {doctor.telepon}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default DokterDetail;
