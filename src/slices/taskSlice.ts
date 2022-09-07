import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
export interface InitialState {
  tasks: { [key: string]: string[] };
}

const initialState: InitialState = {
  tasks: {},
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { date, taskDesc } = action.payload;
      const existingTask = state.tasks[date];
      if (existingTask) {
        existingTask.push(taskDesc)
      } else {
        state.tasks[date] = [taskDesc];
      }
    },
  }
});


export const getTasks = (state: RootState) => state.task.tasks;

export const { addTask } = taskSlice.actions

export default taskSlice.reducer;
