import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrangTuaById } from '../../OrangTuaService';
import { getBayiByOrangtua } from '../../BayiService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const OrangtuaDetail = () => {
  const { id } = useParams();
  const [orangtua, setOrangtua] = useState(null);
  const [bayiList, setBayiList] = useState([]);
  const [error, setError] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    loadOrangtuaDetail();
    loadBayiList();
  }, [id]);

  const loadOrangtuaDetail = async () => {
    try {
      const result = await getOrangTuaById(id);
      setOrangtua(result.data);
    } catch (error) {
      setError('Failed to load orangtua details.');
      console.error('Failed to load orangtua details:', error);
    }
  };

  const loadBayiList = async () => {
    try {
      const result = await getBayiByOrangtua(id);
      setBayiList(result.data);
    } catch (error) {
      console.error('Failed to load bayi list:', error);
    }
  };

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!orangtua) {
    return <div className="p-6">Loading...</div>;
  }

  const handleBackToList = () => {
    navigate('/orangtua');
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button onClick={handleBackToList} className="text-blue-500 hover:underline">
              &lt; Kembali ke Daftar Orangtua
            </button>
          </nav>

          <h2 className="text-2xl font-bold mb-6">Detail Orangtua</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Informasi Ibu</h3>
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>NIK :</strong> {orangtua.nik_ibu}
                </p>
                <p className="text-gray-700">
                  <strong>Nama :</strong> {orangtua.nama_ibu}
                </p>
                <p className="text-gray-700">
                  <strong>Tempat Lahir :</strong> {orangtua.pekerjaan_ibu}
                </p>
                <p className="text-gray-700">
                  <strong>Tanggal Lahir :</strong> {orangtua.pendidikan_ibu}
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-3">Alamat KTP:</h4>
                <p className="text-gray-700">{orangtua.alamat_ktp_ibu}</p>
                <p className="text-gray-700">{orangtua.kelurahan_ktp_ibu}, {orangtua.kecamatan_ktp_ibu}</p>
                <p className="text-gray-700">{orangtua.kota_ktp_ibu}, {orangtua.provinsi_ktp_ibu}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-3">Alamat Domisili:</h4>
                <p className="text-gray-700">{orangtua.alamat_domisili_ibu}</p>
                <p className="text-gray-700">{orangtua.kelurahan_domisili_ibu}, {orangtua.kecamatan_domisili_ibu}</p>
                <p className="text-gray-700">{orangtua.kota_domisili_ibu}, {orangtua.provinsi_domisili_ibu}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Informasi Ayah</h3>
              <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-gray-700">
                  <strong>NIK :</strong> {orangtua.nik_ayah}
                </p>
                <p className="text-gray-700">
                  <strong>Nama :</strong> {orangtua.nama_ayah}
                </p>
                <p className="text-gray-700">
                  <strong>Tempat Lahir :</strong> {orangtua.pekerjaan_ayah}
                </p>
                <p className="text-gray-700">
                  <strong>Tanggal Lahir :</strong> {orangtua.pendidikan_ayah}
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-3">Alamat KTP:</h4>
                <p className="text-gray-700">{orangtua.alamat_ktp_ayah}</p>
                <p className="text-gray-700">{orangtua.kelurahan_ktp_ayah}, {orangtua.kecamatan_ktp_ayah}</p>
                <p className="text-gray-700">{orangtua.kota_ktp_ayah}, {orangtua.provinsi_ktp_ayah}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-3">Alamat Domisili:</h4>
                <p className="text-gray-700">{orangtua.alamat_domisili_ayah}</p>
                <p className="text-gray-700">{orangtua.kelurahan_domisili_ayah}, {orangtua.kecamatan_domisili_ayah}</p>
                <p className="text-gray-700">{orangtua.kota_domisili_ayah}, {orangtua.provinsi_domisili_ayah}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Daftar Bayi</h3>
            {bayiList.length > 0 ? (
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Nama</th>
                    <th className="py-2 px-4 border">NIK</th>
                    <th className="py-2 px-4 border">Jenis Kelamin</th>
                  </tr>
                </thead>
                <tbody>
                  {bayiList.map((bayi) => (
                    <tr key={bayi.id} className="text-center">
                      <Link to={`/balita/${bayi.id}`} className="text-blue-500 hover:underline">
                        <td className="py-2 px-4 border">{bayi.nama_balita}</td>
                      </Link>
                      <td className="py-2 px-4 border">{bayi.nik_balita}</td>
                      <td className="py-2 px-4 border">{bayi.jenis_kelamin_balita === 'l' ? 'Laki-laki' : 'Perempuan'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-700">Tidak ada bayi terdaftar.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrangtuaDetail;
