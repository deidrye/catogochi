import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createCat, fetchCat, fetchPresets, updateCat } from './thunks';
import { CatT, CatSliceT, CatPresetT } from './types';

const initialState: CatSliceT = {
  presets: [],
  selectedPresetIndex: 0,
  isLoading: false,
  error: null,
  cat: null,
};

const catSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {
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
      });
  },
});

export const { setPresets, setSelectedPresetIndex, setLoading, setError, setCat } =
  catSlice.actions;
export default catSlice.reducer;
