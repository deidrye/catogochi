import { createAsyncThunk } from '@reduxjs/toolkit';
import toyService from '../api/toyService';
import { OwnedToyType, ToyCreateType, ToyEventCreateType, ToyEventWithToy } from './toyType';

export const fetchShopToys = createAsyncThunk('toy/fetchShopToys', (catId: number) => {
  return toyService.getAll(catId); // Передаем catId
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

export const buyToy = createAsyncThunk<OwnedToyType, { toyId: number; catId: number }>(
  'toy/buyToy',
  async ({ toyId, catId }) => {
    return toyService.buyToy(toyId, catId); // Возвращаем уже типизированный объект
  }
);

// Санка для получения купленных игрушек
export const fetchOwnedToys = createAsyncThunk<OwnedToyType[], number>(
  'toy/fetchOwnedToys',
  async (catId) => {
    return await toyService.getOwnedToys(catId); // Запрос на сервер для получения данных
  }
);

// export const getToys = createAsyncThunk('toy/getToys', async (catId: number) => {
//   return toyService.getToys(catId);
// });