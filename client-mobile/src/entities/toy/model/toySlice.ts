import { createSlice } from '@reduxjs/toolkit';
import {
  addToyToShop,
  buyToy,
  deleteToyFromShop,
  fetchShopToys,
  fetchToyFromShop,
  updateToyInShop,
} from './toyThunks';
import { ToySliceType } from './toyType';

const initialState: ToySliceType = {
  shopToys: [],
  ownedToys: [],
  currentToy: null,
  isLoading: false,
  error: null,
};

export const toySlice = createSlice({
  name: 'toy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShopToys.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchShopToys.fulfilled, (state, action) => {
      state.shopToys = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchShopToys.rejected, (state, action) => {
      state.error = action.error.message ?? null;
      state.isLoading = false;
    });

    builder.addCase(fetchToyFromShop.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchToyFromShop.fulfilled, (state, action) => {
      state.currentToy = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchToyFromShop.rejected, (state, action) => {
      state.error = action.error.message ?? null;
      state.isLoading = false;
    });

    builder.addCase(addToyToShop.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToyToShop.fulfilled, (state, action) => {
      state.shopToys.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addToyToShop.rejected, (state, action) => {
      state.error = action.error.message ?? null;
      state.isLoading = false;
    });

    builder.addCase(deleteToyFromShop.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteToyFromShop.fulfilled, (state, action) => {
      state.shopToys = state.shopToys.filter((toy) => toy.id !== action.payload);
      state.isLoading = false;
    });
    builder.addCase(deleteToyFromShop.rejected, (state, action) => {
      state.error = action.error.message ?? null;
      state.isLoading = false;
    });

    builder.addCase(updateToyInShop.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateToyInShop.fulfilled, (state, action) => {
      state.shopToys = state.shopToys.map((toy) => {
        if (toy.id === action.payload.id) {
          return action.payload;
        }
        return toy;
      });
      state.isLoading = false;
    });
    builder.addCase(updateToyInShop.rejected, (state, action) => {
      state.error = action.error.message ?? null;
      state.isLoading = false;
    });

    // Покупка игрушки
    builder.addCase(buyToy.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(buyToy.fulfilled, (state, action) => {
      state.isLoading = false;

      const existingToyIndex = state.ownedToys.findIndex(
        (toy) => toy.toy.id === action.payload.toy.id,
      );

      if (existingToyIndex >= 0) {
        state.ownedToys[existingToyIndex] = action.payload;
      } else {
        state.ownedToys.push(action.payload);
      }
    });

    builder.addCase(buyToy.rejected, (state, action) => {
      state.error = action.error.message ?? 'Что-то пошло не так при покупке игрушки';
      state.isLoading = false;
    });
  },
});

export const {} = toySlice.actions;

export default toySlice.reducer;
