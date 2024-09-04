// PekerjaanService.js
import api from '../../../api'; // Import the Axios instance

const API_URL = '/pekerjaan'; // Relative path since baseURL is set in api.js

export const getJobs = () => {
  return api.get(API_URL); // Authenticated request via interceptor
};

export const createJob = (job) => {
  return api.post(API_URL, job); // Authenticated request via interceptor
};

export const updateJob = (id, job) => {
  return api.put(`${API_URL}/${id}`, job); // Authenticated request via interceptor
};

export const deleteJob = (id) => {
  return api.delete(`${API_URL}/${id}`); // Authenticated request via interceptor
};
