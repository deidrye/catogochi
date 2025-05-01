import { createAsyncThunk } from '@reduxjs/toolkit';
import logService from '../api/logService';

export const fetchLogs = createAsyncThunk('toy/fetchToyFromShop', async (userId: number) =>
  logService.getAllByUser(userId),
);
