import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Documentation = () => {
  const [documentation, setDocumentation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null); // State for selected documentation

  // Fetch documentation data from the backend
  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dokumentasi`);
        setDocumentation(response.data); // Assuming the response data is an array of documentation objects
        setLoading(false);
      } catch (err) {
        setError('Failed to load documentation');
        setLoading(false);
      }
    };

    fetchDocumentation();
  }, []);

  const openModal = (doc) => {
    setSelectedDoc(doc); // Set the selected documentation to show in the modal
  };

  const closeModal = () => {
    setSelectedDoc(null); // Clear the selected documentation to close the modal
  };

  // Handle loading and error states
  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <section id="dokumentasi" className="py-20 bg-gray-50">
      <div className="container mx-auto text-center px-6 md:px-12">
        <h2 className="text-4xl font-bold text-blue-600 mb-6">Dokumentasi</h2>
        <p className="text-gray-700 text-lg mb-8">
          Foto dokumentasi kegiatan ePosyandu Tanjungpinang.
        </p>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
          {documentation.map((doc) => (
            <div
              key={doc.id}
              className="relative mb-6 break-inside-avoid cursor-pointer"
              onClick={() => openModal(doc)} // Open modal on click
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${doc.foto}`} // Assuming 'foto' contains the image path
                alt={doc.judul} // Using the title of the documentation as the alt text
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center text-white text-xl font-bold transition duration-300">
                {doc.judul}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for showing details */}
        {selectedDoc && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-96 max-w-full">
              <button
                className="absolute top-2 right-2 text-white text-2xl"
                onClick={closeModal}
              >
                &times;
              </button>
              <img
                src={`${import.meta.env.VITE_API_URL}${selectedDoc.foto}`}
                alt={selectedDoc.judul}
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{selectedDoc.judul}</h2>
              <p className="text-gray-700 mb-4">{selectedDoc.deskripsi}</p>
              <p className="text-gray-500">
                <strong>Tanggal:</strong> {new Date(selectedDoc.tanggal).toLocaleDateString()}
              </p>
              <button
                className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transform transition hover:scale-105"
                onClick={closeModal}
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Documentation;
