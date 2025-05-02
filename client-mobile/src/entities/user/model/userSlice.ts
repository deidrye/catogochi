import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { exitGame, fetchUserPoints } from './userThunks';
import { UserSliceT } from './userTypes';

const initialState: UserSliceT = {
  points: 0,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPoints(state, action: PayloadAction<number>) {
      if (state.points + action.payload >= 0) state.points += action.payload;
    },
    clearPoints(state) {
      state.points = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPoints.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserPoints.fulfilled, (state, action) => {
        state.points = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserPoints.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(exitGame.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(exitGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { setPoints, clearPoints } = userSlice.actions;

export default userSlice.reducer;
