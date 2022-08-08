import { Reducer } from 'react';
import { LastWeekAction, SET_LAST_WEEK, SET_THIS_WEEK, SET_TWO_WEEKS_AGO, ThisWeekAction, TwoWeeksAgoAction } from '../actions/statisticsActions';
import { lastWeek, thisWeek, twoWeeksAgo } from '../../utils/db/db';
import { InitialDay } from './currentDayReducer';

export type Week = {
  [key: number]: InitialDay;
};

export type InitialStatistic = {
  thisWeek: Week;
  lastWeek: Week;
  twoWeeksAgo: Week;
  currentWeek: string;
};

const initialState: InitialStatistic = {
  thisWeek: thisWeek,
  lastWeek: lastWeek,
  twoWeeksAgo: twoWeeksAgo,
  currentWeek: 'thisWeek',
};

type RootAction = ThisWeekAction | LastWeekAction | TwoWeeksAgoAction;

export const statisticsReducer: Reducer<InitialStatistic, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case SET_THIS_WEEK:
      return { ...state, thisWeek: action.payload };
    case SET_LAST_WEEK:
      return { ...state, lastWeek: action.payload };
    case SET_TWO_WEEKS_AGO:
      return { ...state, twoWeeksAgo: action.payload };
    default:
      return state;
  }
};
