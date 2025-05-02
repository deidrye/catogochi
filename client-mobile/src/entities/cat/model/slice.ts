import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createCat, fetchActions, fetchCat, fetchPresets, updateCat } from './thunks';
import { CatT, CatSliceT, CatPresetT, CatActionT } from './types';

const initialState: CatSliceT = {
  presets: [],
  selectedPresetIndex: 0,
  isLoading: false,
  error: null,
  cat: null,
  isCatOnline: false,
  actions: [],
};

const catSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {
    clearCat: () => initialState,
    setPresets: (state, action: PayloadAction<CatPresetT[]>) => {
      state.presets = action.payload;
    },
    setSelectedPresetIndex: (state, action: PayloadAction<number>) => {
      state.selectedPresetIndex = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCat: (state, action: PayloadAction<CatT | null>) => {
      state.cat = action.payload;
    },
    setOnline: (state) => {
      state.isCatOnline = true;
    },
    setOffline: (state) => {
      state.isCatOnline = false;
    },
    setActions: (state, action: PayloadAction<CatActionT[]>) => {
      state.actions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPresets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPresets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.presets = action.payload;
      })
      .addCase(fetchPresets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createCat.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCat.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createCat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCat.pending, (state) => {
        console.log('wowwwwwww');

        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cat = action.payload;
      })
      .addCase(fetchCat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCat.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cat = action.payload;
      })
      .addCase(updateCat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchActions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.actions = action.payload;
      })
      .addCase(fetchActions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearCat,
  setPresets,
  setSelectedPresetIndex,
  setLoading,
  setError,
  setCat,
  setOnline,
  setOffline,
  setActions,
} = catSlice.actions;
export default catSlice.reducer;
