import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import dateSlice from '../slices/dateSlice';

export const store = configureStore({
  reducer: {
    date: dateSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
