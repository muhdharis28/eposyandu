import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getBayiByOrangtua } from '../../BayiService'; // Import bayi data service
import { getPenggunaById } from '../../PenggunaService';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate for programmatic navigation
import { FaPlus } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader'; // Loading spinner

const BayiCard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [bayiData, setBayiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchUserAndBayi = async () => {
      try {
        const userResponse = await getPenggunaById(userId);
        const userData = userResponse.data;
        setUser(userData);

        if (userData.orangtua) {
          const bayiResponse = await getBayiByOrangtua(userData.orangtua);
          setBayiData(bayiResponse.data);
        } else {
          setBayiData([]);
        }
      } catch (error) {
        console.error('Error fetching Bayi or user data:', error);
        setBayiData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndBayi();
  }, []);

  const handleAddBayi = () => {
    navigate('/user-balita/baru');
  };

  const handleEditBayi = (id) => {
    navigate(`/user-balita/edit/${id}`);
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
              onClick={handleAddBayi}
              disabled={!user?.orangtua || !user?.verifikasi} // Disable if user doesn't have Orangtua data or isn't verified
              className={`flex items-center px-6 py-2 rounded-lg shadow-md transition-all duration-300 ${
                user?.orangtua && user?.verifikasi ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              <FaPlus className="mr-2" /> Tambah Data Balita
            </button>
          </div>
          
          {/* Display a message if the user needs to complete Orangtua data first */}
          {!user?.orangtua && (
            <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
              <p>
                Anda harus melengkapi data Orangtua terlebih dahulu sebelum menambah data balita. Silakan lengkapi data
                Orangtua di bagian Pengaturan pengguna.
              </p>
            </div>
          )}

          {/* Display a message if the user needs to verify their account */}
          {!user?.verifikasi && (
            <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
              <p>
                Akun anda sedang diverifikasi sebelum dapat menambah atau mengakses data balita. Silakan hubungi admin untuk verifikasi.
              </p>
            </div>
          )}

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Data Balita</h3>

            {bayiData.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Tambahkan data balita anda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bayiData.map((balita) => (
                  user?.verifikasi ? (
                    // If the user is verified, allow clicking on the entire card
                    <Link key={balita.id} to={`/user-balita/${balita.id}`}>
                      <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        <h4 className="text-lg font-semibold text-gray-800">{balita.nama_balita}</h4>
                        <p className="text-gray-600">
                          Tanggal Lahir: {new Date(balita.tanggal_lahir_balita).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                          Jenis Kelamin: {balita.jenis_kelamin_balita === 'l' ? 'Laki-laki' : 'Perempuan'}
                        </p>

                        <div className="flex justify-end mt-4">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={(e) => {
                              e.preventDefault(); // Prevent Link click propagation
                              handleEditBayi(balita.id);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    // If the user is not verified, render the card without a link
                    <div key={balita.id} className="bg-gray-100 p-6 rounded-lg shadow-md transition-all duration-300 cursor-not-allowed">
                      <h4 className="text-lg font-semibold text-gray-800">{balita.nama_balita}</h4>
                      <p className="text-gray-600">
                        Tanggal Lahir: {new Date(balita.tanggal_lahir_balita).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        Jenis Kelamin: {balita.jenis_kelamin_balita === 'l' ? 'Laki-laki' : 'Perempuan'}
                      </p>

                      <div className="flex justify-end mt-4">
                        <button className="text-gray-500 cursor-not-allowed" disabled>
                          Tidak Dapat Diakses
                        </button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BayiCard;
