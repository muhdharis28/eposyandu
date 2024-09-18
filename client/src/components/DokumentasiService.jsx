import api from '../api'; // Adjust the path to your API instance

export const getDokumentasi = () => {
  return api.get('/dokumentasi');
};

export const getDokumentasiById = (id) => {
  return api.get(`/dokumentasi/${id}`);
};

export const createDokumentasi = (dokumentasi) => {
  return api.post('/dokumentasi', dokumentasi);
};

export const updateDokumentasi = (id, dokumentasi) => {
  return api.put(`/dokumentasi/${id}`, dokumentasi);
};

export const deleteDokumentasi = (id) => {
  return api.delete(`/dokumentasi/${id}`);
};
