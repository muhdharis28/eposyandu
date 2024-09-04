// PekerjaanDetail.js
import React from 'react';

const PekerjaanDetail = ({ job }) => {
  if (!job) return null;

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">Detail Pekerjaan</h3>
      <p><strong>Nama Pekerjaan:</strong> {job.nama}</p>
      {/* Add more job fields if necessary */}
    </div>
  );
};

export default PekerjaanDetail;
