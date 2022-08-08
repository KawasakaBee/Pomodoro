import { ActionCreator } from 'redux';
import { MyTask } from '../reducers/taskReducer';

export const SET_TASKS = 'SET_TASKS';
export type TasksAction = {
  type: typeof SET_TASKS;
  payload: MyTask;
};

export const setTasks: ActionCreator<TasksAction> = (tasks: MyTask) => ({
  type: SET_TASKS,
  payload: tasks,
});

export const TOTAL_TIME = 'TOTAL_TIME';
export type TotalTimeAction = {
  type: typeof TOTAL_TIME;
};

export const totalTime: ActionCreator<TotalTimeAction> = () => ({
  type: TOTAL_TIME,
});

export const ADD_TIME = 'ADD_TIME';
export type AddTimeAction = {
  type: typeof ADD_TIME;
  payload: string;
};

export const addTime: ActionCreator<AddTimeAction> = (name: string) => ({
  type: ADD_TIME,
  payload: name,
});

export const REMOVE_TIME = 'REMOVE_TIME';
export type RemoveTimeAction = {
  type: typeof REMOVE_TIME;
  payload: string;
};

export const removeTime: ActionCreator<RemoveTimeAction> = (name: string) => ({
  type: REMOVE_TIME,
  payload: name,
});

export const EDIT_NAME = 'EDIT_NAME';
export type EditTaskName = {
  type: typeof EDIT_NAME;
  payload: {
    name: string;
    newName: string;
  };
};

export const editTaskName: ActionCreator<EditTaskName> = (name: string, newName: string) => ({
  type: EDIT_NAME,
  payload: {
    name,
    newName,
  },
});

export const DELETE_TASK = 'DELETE_TASK';
export type DeleteTaskAction = {
  type: typeof DELETE_TASK;
  payload: string;
};

export const deleteTask: ActionCreator<DeleteTaskAction> = (name: string) => ({
  type: DELETE_TASK,
  payload: name,
});
