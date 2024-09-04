import React, { useState, useEffect } from 'react';
import { createDoctor, updateDoctor, getDoctors } from './DokterService';

const DokterForm = ({ id, refreshList }) => {
  const [nama, setNama] = useState('');

  useEffect(() => {
    if (id) {
      loadDoctor(); // Load doctor data if an ID is provided (for editing)
    }
  }, [id]);

  const loadDoctor = async () => {
    try {
      const result = await getDoctors();
      const doctor = result.data.find((doctor) => doctor.id === id);
      if (doctor) {
        setNama(doctor.nama); // Set the name of the doctor in the form input
      }
    } catch (error) {
      console.error('Failed to load doctor data:', error);
    }
  };

  const isUserAuthorized = () => {
    const userRole = localStorage.getItem('role'); // Assuming roles are stored in local storage
    return userRole === 'admin'; // Only admin can edit or add doctors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserAuthorized()) {
      alert('You are not authorized to perform this action.');
      return; // Prevent submission if user is not authorized
    }

    const doctor = { nama };
    try {
      if (id) {
        await updateDoctor(id, doctor); // Update doctor if an ID is provided
      } else {
        await createDoctor(doctor); // Create a new doctor if no ID is provided
      }
      refreshList(); // Refresh the list after adding or updating a doctor
      setNama(''); // Reset form fields after submission
    } catch (error) {
      console.error('Error submitting doctor data:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Dokter' : 'Tambah Dokter'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Dokter</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-500 px-4 py-2 rounded"
        >
          {id ? 'Update' : 'Tambah'}
        </button>
      </form>
    </div>
  );
};

export default DokterForm;
