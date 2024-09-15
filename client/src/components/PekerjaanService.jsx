import api from '../api'; // Import the Axios instance

const API_URL = '/pekerjaan'; // Base API URL for pekerjaan

// Get all jobs
export const getJobs = () => {
  return api.get(API_URL); // Fetches all jobs
};

// Get a specific job by ID
export const getJobById = (id) => {
  return api.get(`${API_URL}/${id}`); // Fetches job details by ID
};

// Create a new job
export const createJob = (job) => {
  return api.post(API_URL, job); // Creates a new job
};

// Update an existing job by ID
export const updateJob = (id, job) => {
  return api.put(`${API_URL}/${id}`, job); // Updates a job by ID
};

// Delete a job by ID
export const deleteJob = (id) => {
  return api.delete(`${API_URL}/${id}`); // Deletes a job by ID
};
