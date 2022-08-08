import { ActionCreator } from 'redux';
import { MyTask } from '../reducers/taskReducer';

export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
export type CurrentTaskAction = {
  type: typeof SET_CURRENT_TASK;
  payload: MyTask;
};

export const setCurrentTask: ActionCreator<CurrentTaskAction> = (task: MyTask) => ({
  type: SET_CURRENT_TASK,
  payload: task,
});

export const SET_CURRENT_POMIDORO = 'SET_CURRENT_POMIDORO';
export type CurrentPomidoroAction = {
  type: typeof SET_CURRENT_POMIDORO;
};

export const setCurrentPomidoro: ActionCreator<CurrentPomidoroAction> = () => ({
  type: SET_CURRENT_POMIDORO,
});

export const SET_CURRENT_TASK_NUMBER = 'SET_CURRENT_TASK_NUMBER';
export type CurrentTaskNumberAction = {
  type: typeof SET_CURRENT_TASK_NUMBER;
};

export const setCurrentTaskNumber: ActionCreator<CurrentTaskNumberAction> = () => ({
  type: SET_CURRENT_TASK_NUMBER,
});
