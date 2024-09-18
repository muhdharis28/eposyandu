// KegiatanService.js
import api from '../api'; // Import the Axios instance

const API_URL = '/kegiatan'; // Use relative path since baseURL is already set in api.js

export const getKegiatan = () => {
  return api.get(API_URL); // Authenticated request via interceptor
};

export const createKegiatan = (kegiatan) => {
  return api.post(API_URL, kegiatan); // Authenticated request via interceptor
};

export const updateKegiatan = (id, kegiatan) => {
  return api.put(`${API_URL}/${id}`, kegiatan); // Authenticated request via interceptor
};

export const deleteKegiatan = (id) => {
  return api.delete(`${API_URL}/${id}`); // Authenticated request via interceptor
};

export const getKegiatanById = (id) => {
  return api.get(`${API_URL}/${id}`); // Authenticated request via interceptor
};
