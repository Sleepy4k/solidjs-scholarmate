const APP_NAME = import.meta.env.VITE_APP_NAME || 'Solid App';
const APP_ENV = import.meta.env.VITE_APP_ENV || 'development';

const MAIN_API_URL = import.meta.env.VITE_API_MAIN_SERVER_URL || 'http://localhost:8000';
const EXPORT_API_URL = import.meta.env.VITE_API_EXPORT_DATA_URL || 'http://localhost:8001';
const AUTH_API_URL = import.meta.env.VITE_API_AUTH_SERVICE_URL || 'http://localhost:8002';

export {
  APP_NAME,
  APP_ENV,
  MAIN_API_URL,
  EXPORT_API_URL,
  AUTH_API_URL,
};