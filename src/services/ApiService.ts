import axios from 'axios';
import { API_URL } from '@consts';

const api = axios.create({
  baseURL: API_URL || 'http://localhost:3000',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;