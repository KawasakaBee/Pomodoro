import { Reducer } from 'react';
import {
  DayTimeAction,
  DayWorkAction,
  FocusAction,
  PauseAction,
  PomidoroAction,
  SET_DAY_TIME,
  SET_DAY_WORK,
  SET_FOCUS,
  SET_PAUSE,
  SET_POMIDORO,
  SET_STOP,
  StopAction,
} from '../actions/currentDayAction';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { thisWeek } from '../../utils/db/db';

export interface InitialDay {
  dayName: number;
  dayTime: number;
  dayWork: number;
  focus: number;
  pause: number;
  stop: number;
  pomidoroCount: number;
}

const storage = localStorage.getItem('currentDay');
const initialState: InitialDay =
  storage && JSON.parse(storage).dayName === new Date().getDay()
    ? JSON.parse(storage)
    : useLocalStorage('thisWeek', 'get', thisWeek)[new Date().getDay() === 0 ? 7 : new Date().getDay()];

type RootAction = DayTimeAction | DayWorkAction | FocusAction | PauseAction | StopAction | PomidoroAction;

export const currentDayReducer: Reducer<InitialDay, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case SET_DAY_TIME:
      return { ...state, dayTime: action.payload };
    case SET_DAY_WORK:
      return { ...state, dayWork: action.payload };
    case SET_FOCUS:
      return { ...state, focus: action.payload };
    case SET_PAUSE:
      return { ...state, pause: action.payload };
    case SET_STOP:
      return { ...state, stop: state.stop + 1 };
    case SET_POMIDORO:
      return { ...state, pomidoroCount: state.pomidoroCount + 1 };
    default:
      return state;
  }
};
