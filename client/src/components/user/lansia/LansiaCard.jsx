import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getLansiaByWali } from '../../LansiaService';
import { getPenggunaById } from '../../PenggunaService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'; // Icon for the Add button
import ClipLoader from 'react-spinners/ClipLoader'; // Import a spinner for loading state

const LansiaCard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [lansiaData, setLansiaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchUserAndLansia = async () => {
      try {
        const userResponse = await getPenggunaById(userId);
        const userData = userResponse.data;
        setUser(userData);

        if (userData.wali) {
          const lansiaResponse = await getLansiaByWali(userData.wali);
          setLansiaData(lansiaResponse.data);
        } else {
          setLansiaData([]);
        }
      } catch (error) {
        console.error('Error fetching Lansia or user data:', error);
        setLansiaData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndLansia();
  }, []);

  const handleAddLansia = () => {
    navigate('/user-lansia/baru');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={50} color={"#3498db"} loading={true} />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className={`flex-1 bg-gray-50 p-6 transition-all duration-500 ease-in-out mt-16`}>
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleAddLansia}
              disabled={!user?.wali} // Disable button if user does not have Orangtua data
              className={`flex items-center px-6 py-2 rounded-lg shadow-md transition-all duration-300 ${
                user?.wali ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              <FaPlus className="mr-2" /> Tambah Data Lansia
            </button>
          </div>

          {/* Display a message if the user needs to complete Orangtua data first */}
          {!user?.wali && (
            <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
              <p>
                Anda harus melengkapi data Orangtua terlebih dahulu sebelum menambah data lansia. Silakan lengkapi data
                Orangtua di bagian Pengaturan pengguna.
              </p>
            </div>
          )}

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Data Lansia</h3>

            {lansiaData.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Belum ada data lansia yang terkait dengan user ini.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lansiaData.map((lansia) => (
                  <Link key={lansia.id} to={`/user-lansia/${lansia.id}`}>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      <h4 className="text-lg font-semibold text-gray-800">{lansia.nama_lansia}</h4>
                      <p className="text-gray-600">
                        Tanggal Lahir: {new Date(lansia.tanggal_lahir_lansia).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">Alamat: {lansia.alamat_lansia}</p>
                      <p className="text-gray-600">Nomor HP: {lansia.no_hp_lansia}</p>
                      <p className="text-gray-600">
                        Jenis Kelamin: {lansia.jenis_kelamin_lansia === 'l' ? 'Laki-laki' : 'Perempuan'}
                      </p>

                      <div className="flex justify-end mt-4">
                        <Link to={`/user-lansia/edit/${lansia.id}`}>
                          <button className="text-blue-500 hover:text-blue-700">
                            Edit
                          </button>
                        </Link>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LansiaCard;
