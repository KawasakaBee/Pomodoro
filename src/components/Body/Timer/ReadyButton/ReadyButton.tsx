import React, { FunctionComponent } from 'react';
import { setDayTime, setDayWork, setPause, setPomidoro } from '../../../../state/actions/currentDayAction';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../../../state/reducers/rootReducer';
import './readyButton.scss';

interface ReadyButtonProps {
  currentPomidoro: number;
  pauseTime: number;
  pauseTimeRef: React.MutableRefObject<NodeJS.Timer | undefined>;
  dayTimeAll: number;
  workTime: number;
  setBreak: React.Dispatch<React.SetStateAction<boolean>>;
  setLongBreak: React.Dispatch<React.SetStateAction<boolean>>;
  setCount: React.Dispatch<React.SetStateAction<string>>;
  setIsPause: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReadyButton: FunctionComponent<ReadyButtonProps> = ({
  currentPomidoro,
  pauseTime,
  pauseTimeRef,
  dayTimeAll,
  workTime,
  setBreak,
  setLongBreak,
  setCount,
  setIsPause,
}) => {
  const dispatch = useDispatch();
  const currentDay = useSelector((store: RootReducer) => store.currentDay);

  function readyHandler() {
    setIsPause(false);

    if (currentPomidoro % 4 === 0) {
      setCount('30:00');
      setLongBreak(true);
    } else {
      setCount('05:00');
      setBreak(true);
    }

    clearInterval(pauseTimeRef.current);
    dispatch(setPomidoro());
    dispatch(setDayTime(dayTimeAll));
    dispatch(setPause(pauseTime));
    dispatch(setDayWork(workTime));
    localStorage.setItem('currentDay', JSON.stringify(currentDay));
  }
  return (
    <button className='ready-button' onClick={() => readyHandler()}>
      Сделано
    </button>
  );
};
