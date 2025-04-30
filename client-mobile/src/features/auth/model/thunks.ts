import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../../shared/api/authApi';
import { LoginData, RegisterData } from '../../../shared/lib/zod/schemas';

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginData, { rejectWithValue }) => {
    try {
      return await authApi.login(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка входа');
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      return await authApi.register(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка регистрации');
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authApi.logout();
    return null;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка выхода');
  }
});

export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
  try {
    return await authApi.checkAuth();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка проверки аутентификации');
  }
});
