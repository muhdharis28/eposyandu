import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog'; // Make sure you have PrimeReact installed

const PenggunaDetail = ({ pengguna }) => {
  const [zoomedImage, setZoomedImage] = useState(null);

  if (!pengguna) return null;

  const handleImageClick = (src) => {
    setZoomedImage(src);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h3 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
        Detail Pengguna
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: User Details */}
        <div className="space-y-4 text-gray-700">
          <DetailItem label="Nama" value={pengguna.nama} />
          <DetailItem label="Email" value={pengguna.email} />
          <DetailItem label="Role" value={pengguna.role} />
          <DetailItem label="No. HP" value={pengguna.no_hp} />
          <DetailItem label="No. KK" value={pengguna.no_kk} />
          <DetailItem label="No. KTP" value={pengguna.no_ktp} />
        </div>

        {/* Right Column: Image Previews */}
        <div className="flex flex-col items-center space-y-6">
          <ImagePreview
            src={pengguna.foto_kk ? `${import.meta.env.VITE_API_URL}${pengguna.foto_kk}` : null}
            alt="Foto KK"
            placeholderText="Foto KK not available"
            onClick={() => handleImageClick(`${import.meta.env.VITE_API_URL}${pengguna.foto_kk}`)}
          />
          {/* Add more image previews as needed */}
        </div>
      </div>

      {/* Image Zoom Dialog */}
      {zoomedImage && (
        <Dialog
          visible={true}
          onHide={handleCloseZoom}
          style={{ width: '50vw' }}
          header="Preview Image"
        >
          <img src={encodeURI(zoomedImage)} alt="Zoomed Image" className="w-full h-full object-cover" />
        </Dialog>
      )}
    </div>
  );
};

// Reusable component to display each detail item
const DetailItem = ({ label, value }) => (
  <p className="flex items-center">
    <strong className="w-32 text-gray-600">{label}:</strong>
    <span>{value || '-'}</span>
  </p>
);

// Reusable component for image preview with click-to-zoom functionality
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
