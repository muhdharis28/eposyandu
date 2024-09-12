import api from '../../../api'; // Import the Axios instance

const API_URL = '/balita'; // Use the correct relative path for bayi API

// Fetch all bayi
export const getBayi = () => {
  return api.get(API_URL); // Authenticated request via interceptor
};

// Create a new bayi
export const createBayi = (bayi) => {
  return api.post(API_URL, bayi); // Authenticated request via interceptor
};

// Update bayi by id
export const updateBayi = (id, bayi) => {
  return api.put(`${API_URL}/${id}`, bayi); // Authenticated request via interceptor
};

// Delete bayi by id
export const deleteBayi = (id) => {
  return api.delete(`${API_URL}/${id}`); // Authenticated request via interceptor
};

// Fetch bayi details by id
export const getBayiById = (id) => {
  return api.get(`${API_URL}/${id}`); // Authenticated request via interceptor
};
