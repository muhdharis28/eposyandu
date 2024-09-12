// WaliService.js
import api from '../../../api'; // Import the Axios instance

const API_URL = '/wali'; // Use relative path since baseURL is already set in api.js

export const getWali = () => {
  return api.get(API_URL); // Authenticated request via interceptor
};

export const createWali = (wali) => {
  return api.post(API_URL, wali); // Authenticated request via interceptor
};

export const updateWali = (id, wali) => {
  return api.put(`${API_URL}/${id}`, wali); // Authenticated request via interceptor
};

export const deleteWali = (id) => {
  return api.delete(`${API_URL}/${id}`); // Authenticated request via interceptor
};

export const getWaliById = (id) => {
  return api.get(`${API_URL}/${id}`); // Authenticated request via interceptor
};
