import { Reducer } from 'react';
import { SET_CURRENT_TASK, SET_CURRENT_POMIDORO, SET_CURRENT_TASK_NUMBER, CurrentTaskAction, CurrentPomidoroAction, CurrentTaskNumberAction } from '../actions/timerActions';
import { MyTask } from './taskReducer';

export type InitialTimer = {
  currentTask: MyTask;
  currentPomidoro: number;
  currentTaskNumber: number;
};

const initialState: InitialTimer = {
  currentTask: {
    name: '',
    time: 0,
  },
  currentPomidoro: 1,
  currentTaskNumber: 1,
};

type RootAction = CurrentTaskAction | CurrentPomidoroAction | CurrentTaskNumberAction;

export const timerReducer: Reducer<InitialTimer, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TASK:
      return { ...state, currentTask: action.payload };
    case SET_CURRENT_POMIDORO:
      return { ...state, currentPomidoro: state.currentPomidoro + 1 };
    case SET_CURRENT_TASK_NUMBER:
      return { ...state, currentTaskNumber: state.currentTaskNumber + 1 };
    default:
      return state;
  }
};
