import axios from 'axios';
import { Platform } from 'react-native';
import { CLIENT_IP } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Определяем базовый URL
const baseUrl = Platform.select({
  web: 'http://localhost:3000', // Браузер (Expo Web)
  android: `http://${CLIENT_IP}:3000`, // Эмулятор Android
  default: `http://${CLIENT_IP}:3000`, // Реальное устройство
});

// console.log('[Axios] Base URL:', baseUrl); // Логируем базовый URL

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// Добавляем токен авторизации к каждому запросу
axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  console.log(`[Axios Request] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
  return config;
});

// Логирование каждого ответа
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(`[Axios Response] ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('[Axios Error]', error.message, error.config?.url || '');
    return Promise.reject(error);
  },
);

export default axiosInstance;
