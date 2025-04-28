// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { catAPI } from '../api/catService';
// import type { CatPreset, CatState } from './types';

// const initialState: CatState = {
//   presets: [],
//   selectedPresetIndex: 0,
//   isLoading: false,
//   error: null,
// };

// export const fetchPresets = createAsyncThunk('cat/fetchPresets', async (_, { rejectWithValue }) => {
//   try {
//     const response = await catAPI.getPresets();
//     return response;
//   } catch (error) {
//     return rejectWithValue('Не удалось загрузить пресеты котов');
//   }
// });

// export const createCat = createAsyncThunk(
//   'cat/createCat',
//   async (preset: CatPreset, { rejectWithValue }) => {
//     try {
//       const response = await catAPI.createCat({
//         name: preset.name,
//         catPresetId: preset.id,
//       });
//       return response;
//     } catch (error) {
//       return rejectWithValue('Не удалось создать кота');
//     }
//   },
// );

// const catSlice = createSlice({
//   name: 'cat',
//   initialState,
//   reducers: {
//     setSelectedPresetIndex: (state, action) => {
//       state.selectedPresetIndex = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPresets.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchPresets.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.presets = action.payload;
//       })
//       .addCase(fetchPresets.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(createCat.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(createCat.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(createCat.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setSelectedPresetIndex } = catSlice.actions;
// export default catSlice.reducer;
