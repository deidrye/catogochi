import axios from 'axios';
import { CLIENT_IP } from '@env';
import { z } from 'zod';

export const envSchema = z.object({
  CLIENT_IP: z.string().ip(),
});

export const env = envSchema.parse({ CLIENT_IP });

// Для Android эмулятора используем 10.0.2.2 вместо localhost
// Для iOS симулятора используем localhost
// Для физического устройства используем IP компьютера
const API_URL = __DEV__
  ? `http://${env.CLIENT_IP}:3000/api` // IP вашего компьютера в локальной сети
  : 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const authAPI = {
  login: (data: LoginData) => api.post('/auth/login', data),
  register: (data: RegisterData) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  checkAuth: () => api.get('/auth/me'),
};
