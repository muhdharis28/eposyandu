import api from '../api'; // Import the Axios instance, adjust the path as necessary

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

export const updatePenggunaOrtu = (id, pengguna) => {
  return api.post(`${API_URL}/${id}/orangtua`, pengguna); // Authenticated request via interceptor
};

export const updatePenggunaWali = (id, pengguna) => {
  return api.post(`${API_URL}/${id}/wali`, pengguna); // Authenticated request via interceptor
};

export const updatePenggunaVerifikasi = (id) => {
  return api.post(`${API_URL}/${id}/verifikasi`); // Authenticated request via interceptor
};

export const getPenggunabyOrtu = (orangtuaId) => {
  return api.get(`${API_URL}/?orangtua=${orangtuaId}`); // Use params to send query parameters
};

export const getPenggunabyWali = (waliId) => {
  return api.get(`${API_URL}/?wali=${waliId}`); // Authenticated request via interceptor
};

// Delete a pengguna
export const deletePengguna = (id) => {
  return api.delete(`${API_URL}/${id}`); // Authenticated request via interceptor
};

// Fetch pengguna details by ID
export const getPenggunaById = (id) => {
  return api.get(`${API_URL}/${id}`); // Authenticated request via interceptor
};

// Fetch pengguna with "kader" role
export const getKader = () => {
  return api.get(`${API_URL}/role/kader`); // Assuming your API has an endpoint for fetching users by role
};
