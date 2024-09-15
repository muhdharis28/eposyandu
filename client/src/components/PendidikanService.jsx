import api from '../api'; // Import the Axios instance

const API_URL = '/pendidikan'; // Base API URL for pendidikan

// Get all jobs
export const getPendidikans = () => {
  return api.get(API_URL); // Fetches all jobs
};

// Get a specific job by ID
export const getPendidikanById = (id) => {
  return api.get(`${API_URL}/${id}`); // Fetches job details by ID
};

// Create a new job
export const createPendidikan = (job) => {
  return api.post(API_URL, job); // Creates a new job
};

// Update an existing job by ID
export const updatePendidikan = (id, job) => {
  return api.put(`${API_URL}/${id}`, job); // Updates a job by ID
};

// Delete a job by ID
export const deletePendidikan = (id) => {
  return api.delete(`${API_URL}/${id}`); // Deletes a job by ID
};
