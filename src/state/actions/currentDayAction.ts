import { ActionCreator } from 'redux';

export const SET_DAY_TIME = 'SET_DAY_TIME';
export type DayTimeAction = {
  type: typeof SET_DAY_TIME;
  payload: number;
};

export const setDayTime: ActionCreator<DayTimeAction> = (time: number) => ({
  type: SET_DAY_TIME,
  payload: time,
});

export const SET_DAY_WORK = 'SET_DAY_WORK';
export type DayWorkAction = {
  type: typeof SET_DAY_WORK;
  payload: number;
};

export const setDayWork: ActionCreator<DayWorkAction> = (time: number) => ({
  type: SET_DAY_WORK,
  payload: time,
});

export const SET_FOCUS = 'SET_FOCUS';
export type FocusAction = {
  type: typeof SET_FOCUS;
  payload: number;
};

export const setFocus: ActionCreator<FocusAction> = (count: number) => ({
  type: SET_FOCUS,
  payload: count,
});

export const SET_PAUSE = 'SET_PAUSE';
export type PauseAction = {
  type: typeof SET_PAUSE;
  payload: number;
};

export const setPause: ActionCreator<PauseAction> = (time: number) => ({
  type: SET_PAUSE,
  payload: time,
});

export const SET_STOP = 'SET_STOP';
export type StopAction = {
  type: typeof SET_STOP;
};

export const setStop: ActionCreator<StopAction> = () => ({
  type: SET_STOP,
});

export const SET_POMIDORO = 'SET_POMIDORO';
export type PomidoroAction = {
  type: typeof SET_POMIDORO;
};

export const setPomidoro: ActionCreator<PomidoroAction> = () => ({
  type: SET_POMIDORO,
});
