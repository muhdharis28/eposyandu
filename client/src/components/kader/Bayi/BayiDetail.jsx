import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog'; // Ensure PrimeReact is installed

const BayiDetail = ({ bayi }) => {
  const [zoomedImage, setZoomedImage] = useState(null);

  if (!bayi) return null;

  const handleImageClick = (src) => {
    setZoomedImage(src);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h3 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
        Detail Bayi
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 text-gray-700">
          <DetailItem label="Nama Bayi" value={bayi.name} />
          <DetailItem label="Nama Orang Tua" value={bayi.parent} />
          <DetailItem label="Tanggal Lahir" value={bayi.birthDate} />
          <DetailItem label="Berat Badan" value={bayi.weight} />
          <DetailItem label="Tinggi Badan" value={bayi.height} />
        </div>
        <div className="flex flex-col items-center space-y-6">
          <ImagePreview
            src={bayi.fotoBayi ? `${import.meta.env.VITE_API_URL}${bayi.fotoBayi}` : null}
            alt="Foto Bayi"
            placeholderText="Foto Bayi not available"
            onClick={() => handleImageClick(`${import.meta.env.VITE_API_URL}${bayi.fotoBayi}`)}
          />
        </div>
      </div>

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

const DetailItem = ({ label, value }) => (
  <p className="flex items-center">
    <strong className="w-32 text-gray-600">{label}:</strong>
    <span>{value || '-'}</span>
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

export default BayiDetail;
