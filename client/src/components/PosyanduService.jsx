import api from '../api'; // Import the Axios instance

const API_URL = '/posyandu'; // Base API URL for posyandu

// Get all jobs
export const getPosyandus = () => {
  return api.get(API_URL); // Fetches all jobs
};

// Get a specific job by ID
export const getPosyanduById = (id) => {
  return api.get(`${API_URL}/${id}`); // Fetches job details by ID
};

// Create a new job
export const createPosyandu = (job) => {
  return api.post(API_URL, job); // Creates a new job
};

// Update an existing job by ID
export const updatePosyandu = (id, job) => {
  return api.put(`${API_URL}/${id}`, job); // Updates a job by ID
};

// Delete a job by ID
export const deletePosyandu = (id) => {
  return api.delete(`${API_URL}/${id}`); // Deletes a job by ID
};
