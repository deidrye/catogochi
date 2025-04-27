import { createAsyncThunk } from '@reduxjs/toolkit';
import toyService from '../api/toyService';
import { ToyCreateType, ToyEventCreateType } from './toyType';

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

export const buyToy = createAsyncThunk('toy/buyToy',  async ({ toyId, catId }: { toyId: number; catId: number }) => {
  return toyService.buyToy(toyId, catId);
});
