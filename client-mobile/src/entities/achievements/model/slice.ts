import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AchieveSliceT, AchieveT } from './types';
import { fetchAchieves, fetchAchievesOfUser } from './thunks';

const initialState: AchieveSliceT = {
  list: [],
  userAchieves: [],
};

const achieveSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    pushUserAchieve(state, action: PayloadAction<AchieveT>) {
      state.userAchieves.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAchieves.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(fetchAchieves.rejected, () => {
      console.error('ERROR GETTING ALL ACHIEVEMENTS (AXIOS SERVICE)');
    });

    builder.addCase(fetchAchievesOfUser.fulfilled, (state, action) => {
      state.userAchieves = action.payload;
    });
    builder.addCase(fetchAchievesOfUser.rejected, () => {
      console.error('ERROR GETTING ALL USER ACHIEVEMENTS (AXIOS SERVICE)');
    });
  },
});

export const { pushUserAchieve } = achieveSlice.actions;
export default achieveSlice.reducer;
