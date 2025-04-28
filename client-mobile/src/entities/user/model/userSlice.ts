import { createSlice } from '@reduxjs/toolkit';
import { fetchUserPoints } from './userThunks';
import { UserSliceT } from './userTypes';

const initialState: UserSliceT = {
  points: 0,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPoints.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserPoints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.points = action.payload;
      })
      .addCase(fetchUserPoints.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
