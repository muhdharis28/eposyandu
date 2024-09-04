// PendidikanService.js
import api from '../../../api'; // Import the Axios instance

const API_URL = '/pendidikan'; // Relative path since baseURL is set in api.js

export const getPendidikan = () => {
  return api.get(API_URL); // Authenticated request via interceptor
};

export const createPendidikan = (pendidikan) => {
  return api.post(API_URL, pendidikan); // Authenticated request via interceptor
};

export const updatePendidikan = (id, pendidikan) => {
  return api.put(`${API_URL}/${id}`, pendidikan); // Authenticated request via interceptor
};

export const deletePendidikan = (id) => {
  return api.delete(`${API_URL}/${id}`); // Authenticated request via interceptor
};
