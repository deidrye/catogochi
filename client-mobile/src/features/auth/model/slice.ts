import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../shared/lib/zod/schemas';
import { login, register, logout, checkAuth } from './thunks';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  isCatLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isInitialized: false,
  isCatLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCatLoading: (state, action: PayloadAction<boolean>) => {
      state.isCatLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isInitialized = true;
      });
  },
});

export const { clearError, setCatLoading } = authSlice.actions;
export default authSlice.reducer;
