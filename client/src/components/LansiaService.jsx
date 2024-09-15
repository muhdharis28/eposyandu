// LansiaService.js
import api from '../api'; // Import the Axios instance

const API_URL = '/lansia'; // Use relative path since baseURL is already set in api.js

export const getLansia = () => {
  return api.get(API_URL); // Authenticated request via interceptor
};

export const createLansia = (lansia) => {
  return api.post(API_URL, lansia); // Authenticated request via interceptor
};

export const updateLansia = (id, lansia) => {
  return api.put(`${API_URL}/${id}`, lansia); // Authenticated request via interceptor
};

export const deleteLansia = (id) => {
  return api.delete(`${API_URL}/${id}`); // Authenticated request via interceptor
};

export const getLansiaById = (id) => {
  return api.get(`${API_URL}/${id}`); // Authenticated request via interceptor
};

export const getLansiaByWali = (waliId) => {
  return api.get(`${API_URL}/?wali=${waliId}`);
};
