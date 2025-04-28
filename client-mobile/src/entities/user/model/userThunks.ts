import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../api/userService";

export const fetchUserPoints = createAsyncThunk('user/fetchUserPoints', async (id: number) => {
  return await userService.getUserPoints(id);
});