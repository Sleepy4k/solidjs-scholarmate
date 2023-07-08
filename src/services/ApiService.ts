import axios from 'axios';
import { MAIN_API_URL, EXPORT_API_URL, AUTH_API_URL } from '@consts';

const mainApi = axios.create({
  baseURL: MAIN_API_URL || 'http://localhost:8000',
});

const exportApi = axios.create({
  baseURL: EXPORT_API_URL || 'http://localhost:8001',
});

const authApi = axios.create({
  baseURL: AUTH_API_URL || 'http://localhost:8002',
});

export {
  mainApi,
  exportApi,
  authApi,
};