import api from '../api'; // Adjust the path to your axios instance

const API_URL = '/pemeriksaan-lansia'; // The base endpoint for pemeriksaan lansia

// Get all pemeriksaan lansia records
export const getPemeriksaanLansia = () => {
  return api.get(API_URL); // Make GET request to fetch all records
};

// Get a specific pemeriksaan lansia by ID
export const getPemeriksaanLansiaById = (id) => {
  return api.get(`${API_URL}/${id}`); // Make GET request to fetch a single record by ID
};

// Create a new pemeriksaan lansia record
export const createPemeriksaanLansia = (pemeriksaanLansia) => {
  return api.post(API_URL, pemeriksaanLansia); // Make POST request to create a new record
};

// Update an existing pemeriksaan lansia record
export const updatePemeriksaanLansia = (id, pemeriksaanLansia) => {
  return api.put(`${API_URL}/${id}`, pemeriksaanLansia); // Make PUT request to update an existing record
};

// Delete a pemeriksaan lansia record by ID
export const deletePemeriksaanLansia = (id) => {
  return api.delete(`${API_URL}/${id}`); // Make DELETE request to remove a record by ID
};

export const getPemeriksaanByLansiaId = (lansiaId) => {
  return api.get(`${API_URL}/lansia/${lansiaId}`);
};
