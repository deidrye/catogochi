import { LoginData, RegisterData, userSchema } from '../lib/zod/schemas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { CLIENT_IP } from '@env';
import { z } from 'zod';

export const envSchema = z.object({
  CLIENT_IP: z.string().ip(),
});

export const env = envSchema.parse({ CLIENT_IP });

// IP адрес компьютера Windows в локальной сети
const WINDOWS_IP = env.CLIENT_IP;

const getApiUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      // Для Android (как эмулятор, так и реальное устройство через Expo Go)
      return `http://${env.CLIENT_IP}:3000/api`;
    }
    // Для iOS
    if (Platform.OS === 'ios') {
      // Для iOS симулятора и реальных устройств
      return `http://${env.CLIENT_IP}:3000/api`; // Используем локальный IP
    }
  }
  // Для production
  return 'http://localhost:3000/api';
};

export const API_URL = getApiUrl();

const handleResponse = async (response: Response, isJson = true) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  if (isJson) {
    const data = await response.json();
    console.log('Ответ от сервера:', data);
    return data;
  }
  return response;
};

export const authApi = {
  login: async (data: LoginData) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      const responseData = await handleResponse(response);
      try {
        const userData = userSchema.parse(responseData);
        console.log(userData);

        // Сохраняем токен
        await AsyncStorage.setItem('accessToken', userData.accessToken);
        return userData;
      } catch (validationError) {
        console.log('Ошибка валидации ответа:', validationError);
        throw new Error('Неверный формат данных от сервера');
      }
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  },
  register: async (data: RegisterData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      const responseData = await handleResponse(response);
      try {
        const userData = userSchema.parse(responseData);
        // Сохраняем токен
        await AsyncStorage.setItem('accessToken', userData.accessToken);
        return userData;
      } catch (validationError) {
        console.log('Ошибка валидации ответа:', validationError);
        throw new Error('Неверный формат данных от сервера');
      }
    } catch (error) {
      console.log('Register error:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      await handleResponse(response, false);
      // Удаляем токен
      await AsyncStorage.removeItem('accessToken');
    } catch (error) {
      console.log('Logout error:', error);
      throw error;
    }
  },
  checkAuth: async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Нет токена доступа');
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseData = await handleResponse(response);
      try {
        const userData = userSchema.parse(responseData);
        // Обновляем токен, если он пришел в ответе
        if (userData.accessToken) {
          await AsyncStorage.setItem('accessToken', userData.accessToken);
        }
        return userData;
      } catch (validationError) {
        console.log('Ошибка валидации ответа:', validationError);
        throw new Error('Неверный формат данных от сервера');
      }
    } catch (error) {
      console.log('Check auth error:', error);
      throw error;
    }
  },
};
