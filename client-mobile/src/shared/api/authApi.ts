import { LoginData, RegisterData, userSchema } from '../lib/zod/schemas';

const API_URL = 'http://localhost:3000/api';

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
        return userSchema.parse(responseData);
      } catch (validationError) {
        console.error('Ошибка валидации ответа:', validationError);
        throw new Error('Неверный формат данных от сервера');
      }
    } catch (error) {
      console.error('Login error:', error);
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
        return userSchema.parse(responseData);
      } catch (validationError) {
        console.error('Ошибка валидации ответа:', validationError);
        throw new Error('Неверный формат данных от сервера');
      }
    } catch (error) {
      console.error('Register error:', error);
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
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
  checkAuth: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include',
      });
      const responseData = await handleResponse(response);
      try {
        return userSchema.parse(responseData);
      } catch (validationError) {
        console.error('Ошибка валидации ответа:', validationError);
        throw new Error('Неверный формат данных от сервера');
      }
    } catch (error) {
      console.error('Check auth error:', error);
      throw error;
    }
  },
};
