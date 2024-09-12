import axios from 'axios';

const API_URL = '/api/balita'; // Ensure this matches the route defined on the server

export const getBayi = async () => {
  return await axios.get(API_URL);
};

export const createBayi = async (data) => {
  return await axios.post(API_URL, data);
};

export const updateBayi = async (id, data) => {
  return await axios.put(`${API_URL}/${id}`, data);
};

export const deleteBayi = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
