import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPenggunaById } from '../../PenggunaService';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { updatePenggunaVerifikasi } from '../../PenggunaService';

const PenggunaDetail = () => {
  const { id } = useParams();
  const [pengguna, setPengguna] = useState(null);
  const [error, setError] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    loadPenggunaDetail();
  }, [id]);

  const loadPenggunaDetail = async () => {
    try {
      const result = await getPenggunaById(id);
      console.log(result.data)
      setPengguna(result.data);
    } catch (error) {
      setError('Failed to load pengguna details.');
      console.error('Failed to load pengguna details:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/pengguna');
  };

  const handleImageClick = (src) => {
    setZoomedImage(src);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!pengguna) {
    return <div className="p-6">Loading...</div>;
  }

  const handleVerifikasi = async (id) => {
    try {
        await updatePenggunaVerifikasi(id);

      
        setPengguna(pengguna.id === id ? { ...pengguna, verifikasi: true } : pengguna);
    } catch (error) {
        console.error("Failed to verify user:", error);
    }
  };

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
              &lt; Kembali ke Daftar Pengguna
            </button>
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Detail Pengguna</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 text-gray-700">
                <DetailItem label="Nama" value={pengguna.nama} />
                <DetailItem label="Email" value={pengguna.email} />
                <DetailItem label="Role" value={pengguna.role} />
                <DetailItem label="No. HP" value={pengguna.no_hp} />
                <DetailItem label="No. KK" value={pengguna.no_kk} />
                <DetailItem label="No. KTP" value={pengguna.no_ktp} />
                <DetailItem label="Posyandu" value={pengguna.posyanduDetail?.nama || '-'} />
                <DetailItem 
                  label="Data Sebagai Orangtua" 
                  value={
                    pengguna.orangTuaDetail 
                      ? `${pengguna.orangTuaDetail.nama_ayah} & ${pengguna.orangTuaDetail.nama_ibu}` 
                      : '-'
                  }
                />
                <DetailItem 
                  label="Data Sebagai Wali" 
                  value={pengguna.waliDetail ? pengguna.waliDetail.nama_wali : '-'} 
                />
                <div className="flex items-center space-x-4">
                  <DetailItem 
                    label="Status" 
                    value={
                      <span
                        className={`px-2 py-1 rounded-full ${
                          pengguna.verifikasi ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {pengguna.verifikasi ? 'Verified' : 'Not Verified'}
                      </span>
                    }
                  />
                  {!pengguna.verifikasi && (
                    <Button
                      label="Verifikasi"
                      icon="pi pi-verified"
                      className="p-button-text bg-green-400 text-white hover:bg-blue-500 px-3 py-2 rounded"
                      onClick={() => handleVerifikasi(pengguna.id)}
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <ImagePreview
                  src={pengguna.foto_kk ? `${import.meta.env.VITE_API_URL}${pengguna.foto_kk}` : null}
                  alt="Foto KK"
                  placeholderText="Foto KK not available"
                  onClick={() => handleImageClick(`${import.meta.env.VITE_API_URL}${pengguna.foto_kk}`)}
                />
              </div>
            </div>
          </div>

          {zoomedImage && (
            <Dialog
              visible={true}
              onHide={handleCloseZoom}
              style={{ width: '50vw' }}
              header="Kartu Keluarga"
            >
              <img
                src={encodeURI(zoomedImage)}
                alt="Zoomed Image"
                className="w-full h-full object-cover"
              />
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <p className="flex items-center">
    <strong className="w-34 text-gray-600">{label} :</strong>
    <span className="ml-6">{value || '-'}</span>
  </p>
);

const ImagePreview = ({ src, alt, placeholderText, onClick }) => (
  <div
    className="w-48 h-48 rounded-lg overflow-hidden border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    onClick={src ? onClick : null}
  >
    {src ? (
      <img src={encodeURI(src)} alt={alt} className="object-cover w-full h-full" />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
        {placeholderText}
      </div>
    )}
  </div>
);

export default PenggunaDetail;
