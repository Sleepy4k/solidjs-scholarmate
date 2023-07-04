const APP_NAME = import.meta.env.VITE_APP_NAME || 'Solid App';
const APP_ENV = import.meta.env.VITE_APP_ENV || 'development';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export {
  APP_NAME,
  APP_ENV,
  API_URL
};