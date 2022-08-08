import React, { FunctionComponent } from 'react';
import { setCurrentTask, setCurrentTaskNumber } from '../../../../state/actions/timerActions';
import { setDayTime, setDayWork, setStop } from '../../../../state/actions/currentDayAction';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../../../state/reducers/rootReducer';
import './stopButton.scss';

interface StopButtonProps {
  timerIsActive: boolean;
  timerRef: React.MutableRefObject<NodeJS.Timer | undefined>;
  dayTime: number;
  workTime: number;
  setCount: React.Dispatch<React.SetStateAction<string>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPomidoroCount: React.Dispatch<React.SetStateAction<number>>;
}

export const StopButton: FunctionComponent<StopButtonProps> = ({ timerIsActive, timerRef, dayTime, workTime, setCount, setActive, setPomidoroCount }) => {
  const dispatch = useDispatch();
  const currentDay = useSelector((store: RootReducer) => store.currentDay);

  function stopHandler() {
    clearInterval(timerRef.current);

    setCount('25:00');
    setActive(false);
    setPomidoroCount(1);

    dispatch(setCurrentTaskNumber());
    dispatch(setCurrentTask({ name: '', time: 0 }));
    dispatch(setDayTime(dayTime));
    dispatch(setDayWork(workTime));
    dispatch(setStop());
    localStorage.setItem('currentDay', JSON.stringify(currentDay));
    timerRef.current = undefined;
  }

  return (
    <button className={timerIsActive ? 'stop-button stop-button--active' : 'stop-button'} onClick={() => stopHandler()} disabled={!timerIsActive}>
      Стоп
    </button>
  );
};
