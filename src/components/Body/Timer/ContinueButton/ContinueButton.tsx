import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDayTime, setPause } from '../../../../state/actions/currentDayAction';
import { RootReducer } from '../../../../state/reducers/rootReducer';
import { timer } from '../../../../logic/timer';
import './continueButton.scss';

interface ContinueButtonProps {
  count: string;
  timerRef: React.MutableRefObject<NodeJS.Timer | undefined>;
  pauseTimeRef: React.MutableRefObject<NodeJS.Timer | undefined>;
  pauseTime: number;
  dayTimeAll: number;
  setIsPause: React.Dispatch<React.SetStateAction<boolean>>;
  setCount: React.Dispatch<React.SetStateAction<string>>;
}

export const ContinueButton: FunctionComponent<ContinueButtonProps> = ({ count, timerRef, pauseTimeRef, pauseTime, dayTimeAll, setIsPause, setCount }) => {
  const dispatch = useDispatch();
  const currentDay = useSelector((store: RootReducer) => store.currentDay);

  function continueHandler() {
    timerRef.current = setInterval(() => {
      setCount(timer(count));
    }, 1000);
    setIsPause(false);

    clearInterval(pauseTimeRef.current);
    dispatch(setDayTime(dayTimeAll));
    dispatch(setPause(pauseTime));
    localStorage.setItem('currentDay', JSON.stringify(currentDay));
  }

  return (
    <button className='continue-button' onClick={() => continueHandler()}>
      Продолжить
    </button>
  );
};
