import { Reducer } from 'react';
import {
  SET_TASKS,
  TOTAL_TIME,
  ADD_TIME,
  REMOVE_TIME,
  EDIT_NAME,
  DELETE_TASK,
  TasksAction,
  TotalTimeAction,
  AddTimeAction,
  RemoveTimeAction,
  EditTaskName,
  DeleteTaskAction,
} from '../actions/taskActions';

export interface MyTask {
  name: string;
  time: number;
}

export type InitialTask = {
  tasks: MyTask[];
  totalTime: number;
};

const initialState: InitialTask = {
  tasks: [],
  totalTime: 0,
};

type RootAction = TasksAction | TotalTimeAction | AddTimeAction | RemoveTimeAction | EditTaskName | DeleteTaskAction;

export const taskReducer: Reducer<InitialTask, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case TOTAL_TIME: {
      const all = state.tasks.reduce((prev, next) => prev + next.time, 0);
      return { ...state, totalTime: all };
    }
    case ADD_TIME: {
      return {
        ...state,
        tasks: [
          ...state.tasks.map((obj) => {
            if (obj.name === action.payload) obj.time += 1;
            return obj;
          }),
        ],
      };
    }
    case REMOVE_TIME: {
      return {
        ...state,
        tasks: [
          ...state.tasks.map((obj) => {
            if (obj.name === action.payload && obj.time !== 1) obj.time -= 1;
            return obj;
          }),
        ],
      };
    }
    case EDIT_NAME: {
      return {
        ...state,
        tasks: [
          ...state.tasks.map((obj) => {
            if (obj.name === action.payload.name) obj.name = action.payload.newName;
            return obj;
          }),
        ],
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        tasks: [...state.tasks.filter((obj) => obj.name !== action.payload)],
      };
    }
    default:
      return state;
  }
};
