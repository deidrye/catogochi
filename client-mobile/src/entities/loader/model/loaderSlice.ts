import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoaderSliceT = {
  isLoading: boolean;
};

const initialState: LoaderSliceT = {
  isLoading: true,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
