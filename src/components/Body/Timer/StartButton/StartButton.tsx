import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, totalTime } from '../../../../state/actions/taskActions';
import { setCurrentTask } from '../../../../state/actions/timerActions';
import { RootReducer } from '../../../../state/reducers/rootReducer';
import { MyTask } from '../../../../state/reducers/taskReducer';
import { timer } from '../../../../logic/timer';
import './startButton.scss';

interface StartButtonProps {
  timerRef: React.MutableRefObject<NodeJS.Timer | undefined>;
  taskArray: MyTask[];
  count: string;
  pomidoroCount: number;
  currentTask: MyTask;
  setDayTime: React.Dispatch<React.SetStateAction<number>>;
  setCount: React.Dispatch<React.SetStateAction<string>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setWorkTime: React.Dispatch<React.SetStateAction<number>>;
}

export const StartButton: FunctionComponent<StartButtonProps> = ({ timerRef, taskArray, count, pomidoroCount, currentTask, setDayTime, setCount, setActive, setWorkTime }) => {
  const dispatch = useDispatch();
  const currentDay = useSelector((store: RootReducer) => store.currentDay);

  function startkHandler() {
    if (taskArray.length !== 0 || currentTask.name !== '') {
      if (pomidoroCount === 1) {
        dispatch(setCurrentTask(taskArray[0]));
        dispatch(deleteTask(taskArray[0].name));
        dispatch(totalTime());
      }

      timerRef.current = setInterval(() => {
        setDayTime((prev) => prev + 1);
        setWorkTime((prev) => prev + 1);
        setCount(timer(count));
      }, 1000);
      setActive(true);
      localStorage.setItem('currentDay', JSON.stringify(currentDay));
    }
  }

  return (
    <button className='initial-button' onClick={() => startkHandler()}>
      Старт
    </button>
  );
};
