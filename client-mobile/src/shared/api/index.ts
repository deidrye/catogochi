import axios from 'axios';
import { CLIENT_IP } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const getApiUrl = () => {
  if (!CLIENT_IP) {
    throw new Error('CLIENT_IP not set in .env file');
  }

  // Для веб-версии используем относительный URL
  if (typeof window !== 'undefined') {
    return '/api';
  }

  // Для мобильной версии используем полный URL
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return `http://${CLIENT_IP}:3000/api`;
    }
    if (Platform.OS === 'ios') {
      return `http://${CLIENT_IP}:3000/api`;
    }
  }

  // Для production
  return 'http://localhost:3000/api';
};

export const api = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Добавляем интерсептор для авторизации
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Добавляем интерсептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    }
    return Promise.reject(error);
  },
);
