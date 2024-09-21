// DataWali.js
import React from 'react';

const DataWali = ({pekerjaanOptions, pendidikanOptions}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        <div>
          <label className="block text-sm font-semibold">No KK</label>
          <input
            type="text"
            name="no_kk"
            value={waliDetails.no_kk}
            onChange={(e) => setWaliDetails({ ...waliDetails, no_kk: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errorsWali.no_kk && <p className="text-red-500 text-sm mt-1">{errorsWali.no_kk}</p>}
        </div>
        {/* Additional fields for Wali... */}
      </div>
      <button
        onClick={() => handleUpdateWali(waliDetails.id)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Update Wali
      </button>
    </div>
  );
};

export default DataWali;
