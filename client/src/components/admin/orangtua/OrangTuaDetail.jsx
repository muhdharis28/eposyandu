import React, { useEffect, useState } from 'react';
import { getOrangTua } from './OrangTuaService'; // Import the service function to fetch orangtua data

const OrangtuaDetail = ({ id, onClose }) => {
  const [orangtua, setOrangtua] = useState(null);

  useEffect(() => {
    if (id) {
      fetchOrangtuaDetail();
    }
  }, [id]);

  const fetchOrangtuaDetail = async () => {
    try {
      const result = await getOrangTua();
      const selectedOrangtua = result.data.find((o) => o.id === id);
      setOrangtua(selectedOrangtua);
    } catch (error) {
      console.error('Failed to fetch orangtua details:', error);
    }
  };

  if (!orangtua) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Detail Orangtua</h2>

      {/* Mother's Details */}
      <div className="mb-4">
        <label className="block font-semibold">No KK:</label>
        <p>{orangtua.no_kk}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">NIK Ibu:</label>
        <p>{orangtua.nik_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Nama Ibu:</label>
        <p>{orangtua.nama_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Tempat Lahir Ibu:</label>
        <p>{orangtua.tempat_lahir_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Tanggal Lahir Ibu:</label>
        <p>{orangtua.tanggal_lahir_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Alamat KTP Ibu:</label>
        <p>{orangtua.alamat_ktp_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kelurahan KTP Ibu:</label>
        <p>{orangtua.kelurahan_ktp_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kecamatan KTP Ibu:</label>
        <p>{orangtua.kecamatan_ktp_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kota KTP Ibu:</label>
        <p>{orangtua.kota_ktp_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Provinsi KTP Ibu:</label>
        <p>{orangtua.provinsi_ktp_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Alamat Domisili Ibu:</label>
        <p>{orangtua.alamat_domisili_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kelurahan Domisili Ibu:</label>
        <p>{orangtua.kelurahan_domisili_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kecamatan Domisili Ibu:</label>
        <p>{orangtua.kecamatan_domisili_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kota Domisili Ibu:</label>
        <p>{orangtua.kota_domisili_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Provinsi Domisili Ibu:</label>
        <p>{orangtua.provinsi_domisili_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">No HP Ibu:</label>
        <p>{orangtua.no_hp_ibu}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Email Ibu:</label>
        <p>{orangtua.email_ibu}</p>
      </div>

      {/* Father's Details */}
      <div className="mb-4">
        <label className="block font-semibold">NIK Ayah:</label>
        <p>{orangtua.nik_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Nama Ayah:</label>
        <p>{orangtua.nama_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Tempat Lahir Ayah:</label>
        <p>{orangtua.tempat_lahir_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Tanggal Lahir Ayah:</label>
        <p>{orangtua.tanggal_lahir_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Alamat KTP Ayah:</label>
        <p>{orangtua.alamat_ktp_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kelurahan KTP Ayah:</label>
        <p>{orangtua.kelurahan_ktp_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kecamatan KTP Ayah:</label>
        <p>{orangtua.kecamatan_ktp_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kota KTP Ayah:</label>
        <p>{orangtua.kota_ktp_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Provinsi KTP Ayah:</label>
        <p>{orangtua.provinsi_ktp_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Alamat Domisili Ayah:</label>
        <p>{orangtua.alamat_domisili_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kelurahan Domisili Ayah:</label>
        <p>{orangtua.kelurahan_domisili_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kecamatan Domisili Ayah:</label>
        <p>{orangtua.kecamatan_domisili_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kota Domisili Ayah:</label>
        <p>{orangtua.kota_domisili_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Provinsi Domisili Ayah:</label>
        <p>{orangtua.provinsi_domisili_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">No HP Ayah:</label>
        <p>{orangtua.no_hp_ayah}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Email Ayah:</label>
        <p>{orangtua.email_ayah}</p>
      </div>

      <button
        onClick={onClose}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
};

export default OrangtuaDetail;
