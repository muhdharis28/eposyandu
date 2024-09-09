// PenggunaService.js
import api from '../../../api'; // Import the Axios instance, adjust the path as necessary

const API_URL = '/pengguna'; // Define the endpoint for pengguna

// Fetch all pengguna data
export const getPengguna = () => {
  return api.get(API_URL); // Authenticated request via interceptor
};

// Create a new pengguna
export const createPengguna = (pengguna) => {
  return api.post(API_URL, pengguna); // Authenticated request via interceptor
};

// Update an existing pengguna
export const updatePengguna = (id, pengguna) => {
  return api.put(`${API_URL}/${id}`, pengguna); // Authenticated request via interceptor
};

// Delete a pengguna
export const deletePengguna = (id) => {
  return api.delete(`${API_URL}/${id}`); // Authenticated request via interceptor
};
