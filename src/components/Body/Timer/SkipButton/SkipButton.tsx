import React, { FunctionComponent } from 'react';
import { setCurrentPomidoro, setCurrentTask, setCurrentTaskNumber } from '../../../../state/actions/timerActions';
import { useDispatch, useSelector } from 'react-redux';
import { setDayTime, setPause } from '../../../../state/actions/currentDayAction';
import { RootReducer } from '../../../../state/reducers/rootReducer';
import './skipButton.scss';

interface SkipButtonProps {
  timerRef: React.MutableRefObject<NodeJS.Timer | undefined>;
  time: number;
  pomidoroCount: number;
  dayTime: number;
  pauseTime: number;
  pauseTimeRef: React.MutableRefObject<NodeJS.Timer | undefined>;
  setCount: React.Dispatch<React.SetStateAction<string>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setBreak: React.Dispatch<React.SetStateAction<boolean>>;
  setLongBreak: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPause: React.Dispatch<React.SetStateAction<boolean>>;
  setPomidoroCount: React.Dispatch<React.SetStateAction<number>>;
}

export const SkipButton: FunctionComponent<SkipButtonProps> = ({
  timerRef,
  time,
  pomidoroCount,
  dayTime,
  pauseTime,
  pauseTimeRef,
  setCount,
  setActive,
  setBreak,
  setLongBreak,
  setIsPause,
  setPomidoroCount,
}) => {
  const dispatch = useDispatch();
  const currentDay = useSelector((store: RootReducer) => store.currentDay);

  function skipHandler() {
    clearInterval(timerRef.current);
    clearInterval(pauseTimeRef.current);
    timerRef.current = undefined;
    setCount('01:00'); //8
    setActive(false);
    setBreak(false);
    setLongBreak(false);
    setIsPause(false);

    if (pomidoroCount === time) {
      setPomidoroCount(1);
      dispatch(setCurrentTaskNumber());
      dispatch(setCurrentTask({ name: '', time: 0 }));
    } else {
      setPomidoroCount((prev) => prev + 1);
    }

    dispatch(setDayTime(dayTime));
    dispatch(setPause(pauseTime));
    dispatch(setCurrentPomidoro());
    localStorage.setItem('currentDay', JSON.stringify(currentDay));
  }
  return (
    <button className='skip-button' onClick={() => skipHandler()}>
      Пропустить
    </button>
  );
};
