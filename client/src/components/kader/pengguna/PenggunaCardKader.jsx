import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getPenggunaKaders } from '../../PenggunaService'; // Service to fetch Kader data
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';

const PenggunaKaderCard = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const [kaderData, setKaderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKaderData = async () => {
      try {
        const response = await getPenggunaKaders();
        setKaderData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching Kader data:', error);
        setKaderData([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKaderData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = kaderData.filter((kader) =>
      kader.nama.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleAddKader = () => {
    navigate('/kader/baru');
  };

  const handleEditKader = (id) => {
    navigate(`/kader/edit/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={50} color={'#3498db'} loading={true} />
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
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddKader}
                className="flex items-center px-6 py-2 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
              >
                <FaPlus className="mr-2" />
                Tambah Kader
              </button>

              <input
                type="text"
                placeholder="Cari Nama Kader"
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Data Kader</h3>

            {filteredData.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Belum ada data kader yang tersedia.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((kader) => (
                  <Link key={kader.id} to={`/kader/${kader.id}`}>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      <h4 className="text-lg font-semibold text-gray-800">{kader.nama}</h4>
                      <p className="text-gray-600">Posyandu: {kader.posyanduDetail?.nama}</p>
                      <p className="text-gray-600">No HP: {kader.no_hp}</p>

                      <div className="flex justify-end mt-4">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditKader(kader.id);
                          }}
                        >
                          Edit
                        </button>
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

export default PenggunaKaderCard;
