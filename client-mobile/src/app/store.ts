import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from '../features/auth/model/slice';
import toyReducer from '../entities/toy/model/toySlice';
import userReducer from '../entities/user/model/userSlice';
import achieveReducer from '../entities/achievements/model/slice';
import catReducer from '../entities/cat/model/slice';
import logReducer from '../entities/log/model/slice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    toy: toyReducer,
    achievements: achieveReducer,
    cat: catReducer,
    user: userReducer,
    log: logReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
