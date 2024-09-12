// OrangTuaService.js
import api from '../../../api'; // Import the Axios instance

const API_URL = '/orangtua'; // Relative path since baseURL is set in api.js

export const getOrangTua = () => {
  return api.get(API_URL); // Authenticated request via interceptor
};

export const createOrangTua = (orangtua) => {
  return api.post(API_URL, orangtua); // Authenticated request via interceptor
};

export const updateOrangTua = (id, orangtua) => {
  return api.put(`${API_URL}/${id}`, orangtua); // Authenticated request via interceptor
};

export const deleteOrangTua = (id) => {
  return api.delete(`${API_URL}/${id}`); // Authenticated request via interceptor
};

export const getOrangTuaById = (id) => {
  return api.get(`${API_URL}/${id}`); // Authenticated request via interceptor
};
