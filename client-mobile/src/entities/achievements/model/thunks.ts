import { createAsyncThunk } from '@reduxjs/toolkit';
import achieveService from '../api/achieveService';
import { AchieveT } from './types';

export const fetchAchieves = createAsyncThunk('achievements/fetchAchieves', () => achieveService.getAll());

export const fetchAchievesOfUser = createAsyncThunk('achievements/fetchAchievesOfUser', (id: number) =>
  achieveService.getAllUser(id),
);
