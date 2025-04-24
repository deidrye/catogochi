import axios from 'axios';

// Для Android эмулятора используем 10.0.2.2 вместо localhost
// Для iOS симулятора используем localhost
// Для физического устройства используем IP компьютера
const API_URL = __DEV__
  ? 'http://172.18.42.82:3000/api' // IP вашего компьютера в локальной сети
  : 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
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
