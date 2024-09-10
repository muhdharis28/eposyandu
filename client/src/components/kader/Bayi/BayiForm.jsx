import React, { useState, useEffect } from 'react';

const BayiForm = ({ id, bayiData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({ name: '', parent: '' });

  useEffect(() => {
    if (id) {
      const bayiToEdit = bayiData.find((bayi) => bayi.id === id);
      if (bayiToEdit) setFormData(bayiToEdit);
    }
  }, [id, bayiData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama Bayi</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama Orang Tua</label>
        <input
          type="text"
          name="parent"
          value={formData.parent}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="bg-red-500 text-white p-2 rounded">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default BayiForm;
