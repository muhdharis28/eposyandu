// DokterService.js
import api from '../api'; // Import the Axios instance

const API_URL = '/dokter'; // Use relative path since baseURL is already set in api.js

export const getDoctors = () => {
  return api.get(API_URL); // Authenticated request via interceptor
};

export const createDoctor = (doctor) => {
  return api.post(API_URL, doctor); // Authenticated request via interceptor
};

export const updateDoctor = (id, doctor) => {
  return api.put(`${API_URL}/${id}`, doctor); // Authenticated request via interceptor
};

export const deleteDoctor = (id) => {
  return api.delete(`${API_URL}/${id}`); // Authenticated request via interceptor
};

export const getDoctorById = (id) => {
  return api.get(`${API_URL}/${id}`); // Authenticated request via interceptor
};
