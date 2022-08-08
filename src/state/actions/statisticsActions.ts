import { ActionCreator } from 'redux';
import { Week } from '../reducers/statisticsReducer';

export const SET_THIS_WEEK = 'SET_THIS_WEEK';
export type ThisWeekAction = {
  type: typeof SET_THIS_WEEK;
  payload: Week;
};

export const setThisWeek: ActionCreator<ThisWeekAction> = (week: Week) => ({
  type: SET_THIS_WEEK,
  payload: week,
});

export const SET_LAST_WEEK = 'SET_LAST_WEEK';
export type LastWeekAction = {
  type: typeof SET_LAST_WEEK;
  payload: Week;
};

export const setLastWeek: ActionCreator<LastWeekAction> = (week: Week) => ({
  type: SET_LAST_WEEK,
  payload: week,
});

export const SET_TWO_WEEKS_AGO = 'SET_TWO_WEEKS_AGO';
export type TwoWeeksAgoAction = {
  type: typeof SET_TWO_WEEKS_AGO;
  payload: Week;
};

export const setTwoWeeksAgo: ActionCreator<TwoWeeksAgoAction> = (week: Week) => ({
  type: SET_TWO_WEEKS_AGO,
  payload: week,
});
