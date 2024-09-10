import React from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa';

const BayiList = ({ bayiData, onEditBayi, onDeleteBayi }) => {
  return (
    <div className="grid gap-4">
      {bayiData.map((bayi) => (
        <div
          key={bayi.id}
          className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-bold">{bayi.name}</h3>
            <p className="text-gray-600">{bayi.parent}</p>
            <p className="text-gray-600">{bayi.id}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-blue-500" onClick={() => onEditBayi(bayi.id)}>
              <FaEye />
            </button>
            <button className="text-red-500" onClick={() => onDeleteBayi(bayi.id)}>
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BayiList;
