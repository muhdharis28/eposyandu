import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrangTuaById } from '../../OrangTuaService'; // Import the service to get OrangTua data
import { getBayiByOrangtua } from '../../BayiService'; // Import the service to get Balita data
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const OrangTuaDetailKader = () => {
  const { id } = useParams();
  const [orangTua, setOrangTua] = useState(null);
  const [balitaList, setBalitaList] = useState([]); // State for Balita list
  const [isLoading, setIsLoading] = useState(true);
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrangTuaDetail = async () => {
      try {
        const response = await getOrangTuaById(id);
        setOrangTua(response.data);
      } catch (error) {
        console.error('Error fetching OrangTua details:', error);
      }
    };

    const fetchBalitaList = async () => {
      try {
        const response = await getBayiByOrangtua(id); // Fetch Balita data by Orang Tua ID
        setBalitaList(response.data);
      } catch (error) {
        console.error('Error fetching Balita list:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrangTuaDetail();
    fetchBalitaList();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-gray-600 mb-4">
            <Link to="/kader-orangtua" className="hover:underline">Orang Tua List</Link> &gt; Detail Orang Tua
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{orangTua.nama_ibu}</h1>
            </div>

            {orangTua ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-3" />
                    <strong className="mr-2">Nama Ibu:</strong> {orangTua.nama_ibu}
                  </div>
                  <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-3" />
                    <strong className="mr-2">Nama Ayah:</strong> {orangTua.nama_ayah || 'Tidak tersedia'}
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-blue-500 mr-3" />
                    <strong className="mr-2">Alamat Domisili Ibu:</strong> {orangTua.alamat_domisili_ibu || 'Tidak tersedia'}
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-blue-500 mr-3" />
                    <strong className="mr-2">No HP Ibu:</strong> {orangTua.no_hp_ibu || 'Tidak tersedia'}
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-500 mr-3" />
                    <strong className="mr-2">Email Ibu:</strong> {orangTua.email_ibu || 'Tidak tersedia'}
                  </div>
                </div>

                {/* Additional Section */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Detail Tambahan</h2>
                  <p className="text-gray-700">Pekerjaan Ibu: {orangTua.pekerjaan_ibu || 'Tidak tersedia'}</p>
                  <p className="text-gray-700">Pendidikan Ibu: {orangTua.pendidikan_ibu || 'Tidak tersedia'}</p>
                  <p className="text-gray-700">Pekerjaan Ayah: {orangTua.pekerjaan_ayah || 'Tidak tersedia'}</p>
                  <p className="text-gray-700">Pendidikan Ayah: {orangTua.pendidikan_ayah || 'Tidak tersedia'}</p>
                </div>

                {/* Balita List Section */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Daftar Balita</h2>
                  {balitaList.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-300">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b">Nama</th>
                          <th className="py-2 px-4 border-b">NIK</th>
                          <th className="py-2 px-4 border-b">Jenis Kelamin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {balitaList.map(balita => (
                          <tr key={balita.id}>
                            <td className="py-2 px-4 border-b">
                              <Link to={`/kader-balita/${balita.id}`} className="text-blue-500 hover:underline">
                                {balita.nama_balita}
                              </Link>
                            </td>
                            <td className="py-2 px-4 border-b">{balita.nik_balita}</td>
                            <td className="py-2 px-4 border-b">{balita.jenis_kelamin_balita === 'l' ? 'Laki-laki' : 'Perempuan'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-700">Tidak ada balita terdaftar untuk orang tua ini.</p>
                  )}
                </div>
              </div>
            ) : (
              <p>No details available for this Orang Tua.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrangTuaDetailKader;
