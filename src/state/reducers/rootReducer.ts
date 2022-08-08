import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { InitialStatistic, statisticsReducer } from './statisticsReducer';
import { currentDayReducer, InitialDay } from './currentDayReducer';
import { InitialTimer, timerReducer } from './timerReducer';
import { InitialTask, taskReducer } from './taskReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export type RootReducer = {
  task: InitialTask;
  timer: InitialTimer;
  statistics: InitialStatistic;
  currentDay: InitialDay;
};

const rootReducer = combineReducers({
  task: taskReducer,
  timer: timerReducer,
  statistics: statisticsReducer,
  currentDay: currentDayReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
