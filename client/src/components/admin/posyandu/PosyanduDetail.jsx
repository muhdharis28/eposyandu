import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPosyanduById } from '../../PosyanduService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';

const PosyanduDetail = () => {
  const { id } = useParams();
  const [posyandu, setPosyandu] = useState(null);
  const [error, setError] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    loadPosyanduDetail();
  }, [id]);

  const loadPosyanduDetail = async () => {
    try {
      const result = await getPosyanduById(id);
      setPosyandu(result.data);
    } catch (error) {
      setError('Failed to load posyandu details.');
      console.error('Failed to load posyandu details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/posyandu');
  };

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!posyandu) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} className="w-full" />

      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />

        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          <nav className="text-sm text-gray-600 mb-4">
            <button
              onClick={handleBackToList}
              className="text-blue-500 hover:underline"
            >
              &lt; Kembali ke Daftar Posyandu
            </button>
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Detail Posyandu</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Nama Posyandu</h3>
                  <p className="text-gray-600">{posyandu.nama}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Alamat Posyandu</h3>
                  <p className="text-gray-600">{posyandu.alamat}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosyanduDetail;
