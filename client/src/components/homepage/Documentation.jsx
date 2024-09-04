import React from 'react';

const Documentation = () => (
  <section id="dokumentasi" className="py-20 bg-gray-50">
    <div className="container mx-auto text-center px-6 md:px-12">
      <h2 className="text-4xl font-bold text-blue-600 mb-6">Dokumentasi</h2>
      <p className="text-gray-700 text-lg mb-8">
        Berikut adalah foto dokumentasi ePosyandu desa banjarsari.
      </p>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="relative mb-6 break-inside-avoid">
            <img
              src={`https://via.placeholder.com/300?text=Foto+${i}`}
              alt={`Dokumentasi ${i}`}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center text-white text-xl font-bold transition duration-300">
              Foto {i}
            </div>
          </div>
        ))}
      </div>
      <button className="mt-12 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:from-blue-700 hover:to-blue-500 transition duration-300 transform hover:scale-105">
        Selengkapnya
      </button>
    </div>
  </section>
);

export default Documentation;
