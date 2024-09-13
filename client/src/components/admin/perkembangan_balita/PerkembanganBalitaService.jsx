import api from '../../../api'; // Import your configured Axios instance, adjust the path as needed

const API_URL = '/perkembangan-balita'; // Define the endpoint for Perkembangan Balita

// Fetch all Perkembangan Balita data
export const getPerkembanganBalitas = () => {
  return api.get(API_URL); // GET request to fetch all records
};

// Fetch a single Perkembangan Balita by ID
export const getPerkembanganBalitaById = (id) => {
  return api.get(`${API_URL}/${id}`); // GET request to fetch a specific record by ID
};

// Create a new Perkembangan Balita record
export const createPerkembanganBalita = (perkembanganBalita) => {
  return api.post(API_URL, perkembanganBalita); // POST request to create a new record
};

// Update an existing Perkembangan Balita record by ID
export const updatePerkembanganBalita = (id, perkembanganBalita) => {
  return api.put(`${API_URL}/${id}`, perkembanganBalita); // PUT request to update a specific record by ID
};

// Delete a Perkembangan Balita record by ID
export const deletePerkembanganBalita = (id) => {
  return api.delete(`${API_URL}/${id}`); // DELETE request to remove a record by ID
};
