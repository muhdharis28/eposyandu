// BayiService.js
import api from '../../../api'; // Adjust the path according to your project structure

const API_URL = '/bayi'; // Define the endpoint for bayi

// Fetch all bayi data
export const getBayi = () => {
  return api.get(API_URL); // Authenticated request via interceptor
};

// Fetch a single bayi by ID
export const getBayiById = (id) => {
  return api.get(`${API_URL}/${id}`); // Fetch a single bayi by ID
};

// Create a new bayi
export const createBayi = (bayi) => {
  return api.post(API_URL, bayi); // Authenticated request via interceptor
};

// Update an existing bayi
export const updateBayi = (id, bayi) => {
  return api.put(`${API_URL}/${id}`, bayi); // Authenticated request via interceptor
};

// Delete a bayi
export const deleteBayi = (id) => {
  return api.delete(`${API_URL}/${id}`); // Authenticated request via interceptor
};
