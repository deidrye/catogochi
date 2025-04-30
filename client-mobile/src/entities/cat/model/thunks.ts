import { createAsyncThunk } from '@reduxjs/toolkit';
import { CatService } from '../api/catService';
import { CatT, CreateCatT } from './types';
import { setError, setLoading, setPresets, setCat, setActions } from './slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchPresets = createAsyncThunk('cat/fetchPresets', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const presets = await CatService.getPresets();
    dispatch(setPresets(presets));
    return presets;
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Ошибка загрузки пресетов'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
});

export const createCat = createAsyncThunk(
  'cat/createCat',
  async (catData: CreateCatT, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const cat = await CatService.createCat(catData);
      return cat;
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Ошибка создания кота'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const fetchCat = createAsyncThunk('cat/fetchCat', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const cat = await CatService.getCat();
    if (!cat) {
      throw new Error('Ошибка: Кот не найден');
    }
    dispatch(setCat(cat));
    return cat;
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Ошибка загрузки кота'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
});

export const updateCat = createAsyncThunk('cat/updateCat', async (cat: CatT, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const updatedCat = await CatService.updateCat(cat);
    if (!updatedCat) {
      throw new Error('Ошибка: Кот не обновился');
    }
    dispatch(setCat(updatedCat));
    return updatedCat;
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Ошибка обновления кота'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
});

export const fetchActions = createAsyncThunk('cat/fetchActions', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const actions = await CatService.getActions();
    dispatch(setActions(actions));
    return actions;
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Ошибка загрузки действий'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
});