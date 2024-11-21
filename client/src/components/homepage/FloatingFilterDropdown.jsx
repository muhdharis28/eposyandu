import React, { useEffect, useState } from 'react';
import { getPosyandus } from '../PosyanduService';
import { FaFilter } from 'react-icons/fa';

const FloatingFilterDropdown = ({ onFilterChange }) => {
  const [posyanduList, setPosyanduList] = useState([]);
  const [selectedPosyandu, setSelectedPosyandu] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPosyandu = async () => {
      try {
        const response = await getPosyandus();
        const posyanduData = response.data;
  
        if (posyanduData.length > 0) {
          setPosyanduList(posyanduData);
        }
      } catch (error) {
        console.error('Error fetching posyandu:', error);
      }
    };
  
    fetchPosyandu();
  }, []);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setSelectedPosyandu(selectedId);
    if (typeof onFilterChange === 'function') {
      onFilterChange(selectedId);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-blue-600 text-white shadow-lg rounded-full p-4 flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200"
        aria-label="Toggle Filter"
        >
        <FaFilter size={20} className="text-white mr-5" />  Filter Posyandu
    </button>

      {isOpen && (
        <div className="mt-4 bg-white shadow-lg rounded-lg p-4 w-64">
          <h4 className="text-lg font-semibold mb-2 text-gray-800">Pilih Posyandu</h4>
          <select
            value={selectedPosyandu}
            onChange={handleChange}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Semua Posyandu</option>
            {posyanduList.map((posyandu) => (
              <option key={posyandu.id} value={posyandu.id}>
                {posyandu.nama}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all"
          >
            Tutup
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingFilterDropdown;
