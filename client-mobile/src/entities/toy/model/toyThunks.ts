import { createAsyncThunk } from '@reduxjs/toolkit';
import toyService from '../api/toyService';
import { ToyCreateType, ToyEventCreateType, ToyEventWithToy } from './toyType';

export const fetchShopToys = createAsyncThunk('toy/fetchShopToys', () => {
  return toyService.getAll();
});

export const fetchToyFromShop = createAsyncThunk('toy/fetchToyFromShop', async (id: number) => {
  return toyService.getOne(id);
});

export const addToyToShop = createAsyncThunk('toy/addToyToShop', async (data: ToyCreateType) => {
  return toyService.addToy(data);
});

export const deleteToyFromShop = createAsyncThunk('toy/deleteToyFromShop', async (id: number) => {
  await toyService.deleteToy(id);
  return id;
});

export const updateToyInShop = createAsyncThunk(
  'toy/updateToyInShop',
  async ({ id, data }: { id: number; data: ToyCreateType }) => {
    const updatedToy = await toyService.updateToy(id, data);
    return updatedToy;
  },
);

export const buyToy = createAsyncThunk<ToyEventWithToy, { toyId: number; catId: number }>(
  'toy/buyToy',
  async ({ toyId, catId }) => {
    return toyService.buyToy(toyId, catId); // Возвращаем уже типизированный объект
  }
);
