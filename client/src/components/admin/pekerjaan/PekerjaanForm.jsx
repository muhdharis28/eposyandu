import React, { useState, useEffect } from 'react';
import { createJob, updateJob, getJobs } from './PekerjaanService';

const PekerjaanForm = ({ id, onClose, refreshList }) => {
  const [nama, setNama] = useState('');

  useEffect(() => {
    if (id) {
      loadJob();
    }
  }, [id]);

  const loadJob = async () => {
    try {
      const result = await getJobs();
      const job = result.data.find((job) => job.id === id);
      if (job) {
        setNama(job.nama);
      }
    } catch (error) {
      console.error('Failed to load job data:', error);
    }
  };

  const isUserAuthorized = () => {
    const userRole = localStorage.getItem('role'); // Assuming roles are stored in local storage
    return userRole === 'admin'; // Only admin can edit or add jobs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Alert if the user is not authorized
    if (!isUserAuthorized()) {
      alert('You are not authorized to perform this action.');
      return; // Prevent submission
    }

    const job = { nama };
    try {
      if (id) {
        await updateJob(id, job);
      } else {
        await createJob(job);
      }
      refreshList(); // Refresh the list after adding or updating a job
      onClose(); // Close the form and go back to the list
    } catch (error) {
      console.error('Error submitting job:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Pekerjaan' : 'Tambah Pekerjaan'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Pekerjaan</label>
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
        <button 
          type="button" 
          onClick={onClose} 
          className="text-gray-700 px-4 py-2 ml-4 rounded"
        >
          Batal
        </button>
      </form>
    </div>
  );
};

export default PekerjaanForm;
