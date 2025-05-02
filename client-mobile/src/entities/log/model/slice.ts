import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LogSliceT } from './types';
import { fetchLogs } from './thunks';

const initialState: LogSliceT = {
  list: [],
  showModal: false,
};

export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
    clearLogs(state) {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogs.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { setShowModal, clearLogs } = logSlice.actions;

export default logSlice.reducer;
