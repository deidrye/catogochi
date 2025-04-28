import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from '../features/auth/model/slice';
import toyReducer from '../entities/toy/model/toySlice';
import achieveReducer from '../entities/achievements/model/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toy: toyReducer,
    achievements: achieveReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
