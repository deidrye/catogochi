import axios from 'axios';
import { Platform } from 'react-native';
import { CLIENT_IP } from '@env';

// Определяем базовый URL
const baseUrl = Platform.select({
  web: 'http://localhost:3000', // Браузер (Expo Web)
  android: 'http://10.0.2.2:3000', // Эмулятор Android
  default: `http://${CLIENT_IP}:3000`, // Реальное устройство
});

console.log('[Axios] Base URL:', baseUrl); // Логируем базовый URL

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// Логирование каждого запроса
axiosInstance.interceptors.request.use((config) => {
  console.log(`[Axios Request] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
  return config;
});

// Логирование каждого ответа
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[Axios Response] ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.log('[Axios Error]', error.message, error.config?.url || '');
    return Promise.reject(error);
  },
);

export default axiosInstance;
