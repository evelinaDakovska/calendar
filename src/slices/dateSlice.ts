import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { InitialState } from './dateTypes';

const initialState: InitialState = {
  chosenMonth: undefined,
}

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setChosenMonth: (state, action) => {
      state.chosenMonth = action.payload;
    },
  }
});


export const getChosenMonth = (state: RootState) => state.date.chosenMonth;

export const { setChosenMonth } = dateSlice.actions

export default dateSlice.reducer;
