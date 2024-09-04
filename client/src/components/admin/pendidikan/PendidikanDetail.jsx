// PendidikanDetail.js
import React from 'react';

const PendidikanDetail = ({ pendidikan }) => {
  if (!pendidikan) return null;

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">Detail Pendidikan</h3>
      <p><strong>Nama:</strong> {pendidikan.nama}</p>
      <p><strong>Deskripsi:</strong> {pendidikan.deskripsi}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default PendidikanDetail;
