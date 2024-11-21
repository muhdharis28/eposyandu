import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const Documentation = ({ selectedPosyandu }) => {
  const [documentation,
    setDocumentation] = useState([]);
  const [error,
    setError] = useState(null);
  const [selectedDoc,
    setSelectedDoc] = useState(null);

  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dokumentasi/dashboard?posyandu=${selectedPosyandu}`);
        const docs = Array.isArray(response.data) ? response.data : [];
        setDocumentation(docs);
      } catch (err) {
        setError('Failed to load documentation');
      }
    };

    fetchDocumentation();
  }, [selectedPosyandu]);

  const openModal = (doc) => {
    setSelectedDoc(doc);
  };

  const closeModal = () => {
    setSelectedDoc(null);
  };


  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <section
      id="dokumentasi"
      className="py-20 bg-gradient-to-b from-blue-600 to-[#008EB3]">
      <div className="container mx-auto text-center px-6 md:px-12">
        <h2 className="text-4xl font-extrabold text-white mb-12">Dokumentasi</h2>

        <Slider {...sliderSettings}>
          {documentation.map((doc) => (
            <div key={doc.id} className="p-4" onClick={() => openModal(doc)}
>
              <div
                className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer">
                <img src={`${import.meta.env.VITE_API_URL}${doc.foto}`}
                  alt={doc.judul}
                  className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"/>
                <div
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center text-white text-xl font-bold transition-opacity duration-300">
                  <span className="opacity-0 group-hover:opacity-100">{doc.judul}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {selectedDoc && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl w-11/12 max-w-4xl">
              <div className="flex justify-center">
                <img
                  src={`${import.meta.env.VITE_API_URL}${selectedDoc.foto}`}
                  alt={selectedDoc.judul}
                  className="w-full max-w-[300px] h-[300px] object-contain rounded-xl mb-6 border-2 border-[#008EB3]"/>
              </div>
              <h2 className="text-3xl font-extrabold text-[#008EB3] mb-4">{selectedDoc.judul}</h2>

              <div className="max-h-[200px] overflow-y-auto mb-4">
                <p className="text-gray-700">{selectedDoc.deskripsi}</p>
              </div>

              <p className="text-gray-500 mb-4">
                <strong>Tanggal: </strong>
                {new Date(selectedDoc.tanggal).toLocaleDateString()}
              </p>

              <button
                className="mt-4 px-6 py-2 bg-gradient-to-r from-[#008EB3] to-blue-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transform transition hover:scale-105"
                onClick={closeModal}>
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
