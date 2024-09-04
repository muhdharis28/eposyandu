// api.js
import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Ensure the base URL points to your API
});

// Get the token from local storage or other secure storage
const getToken = () => localStorage.getItem('token');

// Set default headers for authorization if the token exists
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is expired or invalid
      localStorage.removeItem('token'); // Clear the token
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
