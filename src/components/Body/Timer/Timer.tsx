import React, { useEffect, useRef, useState } from 'react';
import { setCurrentPomidoro, setCurrentTask, setCurrentTaskNumber } from '../../../state/actions/timerActions';
import { setDayTime, setDayWork, setPomidoro } from '../../../state/actions/currentDayAction';
import { useDispatch, useSelector } from 'react-redux';
import { ContinueButton } from './ContinueButton/ContinueButton';
import { StartButton } from './StartButton/StartButton';
import { RootReducer } from '../../../state/reducers/rootReducer';
import { PauseButton } from './PauseButton/PauseButton';
import { ReadyButton } from './ReadyButton/ReadyButton';
import { StopButton } from './StopButton/StopButton';
import { SkipButton } from './SkipButton/SkipButton';
import { addTime } from '../../../logic/addTime';
import { timer } from '../../../logic/timer';
import './timer.scss';

export const Timer = () => {
  const dispatch = useDispatch();
  const currentTimer = useSelector((store: RootReducer) => store.timer);
  const tasksArray = useSelector((store: RootReducer) => store.task.tasks);
  const currentDay = useSelector((store: RootReducer) => store.currentDay);
  const pauseTimeRef = useRef<NodeJS.Timer>();
  const timerRef = useRef<NodeJS.Timer>();

  const [timerIsActive, setTimerIsActive] = useState(false);
  const [pomidoroCount, setPomidoroCount] = useState(1);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [dayTimeAll, setDayTimeAll] = useState(currentDay.dayTime);
  const [pauseTime, setPauseTime] = useState(currentDay.pause);
  const [workTime, setWorkTime] = useState(currentDay.dayWork);
  const [isPause, setIsPause] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [count, setCount] = useState('25:00');

  useEffect(() => {
    if (timerRef.current !== undefined) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCount(timer(count));
        setDayTimeAll((prev) => prev + 1);

        if (!isBreak && !isLongBreak) {
          setWorkTime((prev) => prev + 1);
        }
      }, 1000);
      if (count === '00:00') {
        if (!isBreak && !isLongBreak) {
          if (currentTimer.currentPomidoro % 4 === 0) {
            setCount('30:00');
            setIsLongBreak(true);
          } else {
            setCount('05:00');
            setIsBreak(true);
          }
        } else {
          clearInterval(timerRef.current);
          timerRef.current = undefined;
          setCount('25:00');
          setTimerIsActive(false);
          setIsBreak(false);
          setIsLongBreak(false);
          setIsPause(false);

          if (pomidoroCount === currentTimer.currentTask.time) {
            setPomidoroCount(1);
            dispatch(setCurrentTaskNumber());
            dispatch(setCurrentTask({ name: '', time: 0 }));
          } else {
            setPomidoroCount((prev) => prev + 1);
          }
          dispatch(setPomidoro());
        }
        dispatch(setDayTime(dayTimeAll));
        dispatch(setDayWork(workTime));
        dispatch(setCurrentPomidoro());
        localStorage.setItem('currentDay', JSON.stringify(currentDay));
      }
    }
    return () => clearInterval(timerRef.current);
  }, [count]);

  return (
    <div className='timer'>
      <div className={'timer__head' + (isBreak ? ' timer__head--break' : isLongBreak ? ' timer__head--long-break' : timerIsActive ? ' timer__head--active' : '')}>
        <p className='timer__objective'>{currentTimer.currentTask.name === '' ? 'Добавьте задачу' : currentTimer.currentTask.name}</p>
        <p className='timer__tomato'>
          {currentTimer.currentTask.name === ''
            ? 'Нет помидоров'
            : isLongBreak
            ? 'Длинный перерыв'
            : isBreak
            ? `Перерыв ${pomidoroCount}`
            : `Помидор ${pomidoroCount} из ${currentTimer.currentTask.time}`}
        </p>
      </div>
      <div className='timer__screen'>
        <div className='timer__wrapper'>
          <div className={'timer__time' + (isBreak ? ' timer__time--break' : isLongBreak ? ' timer__time--long-break' : timerIsActive ? ' timer__time--active' : '')}>{count}</div>
          <button className='timer__plus' type='button' onClick={() => (!timerIsActive ? setCount(addTime(count)) : '')}></button>
        </div>
        <div className='timer__tasks'>
          <p className='timer__number'>Задача {currentTimer.currentTaskNumber} - </p>
          <p className='timer__task'>{currentTimer.currentTask.name === '' ? 'Задача не начата' : currentTimer.currentTask.name}</p>
        </div>
        <div className='timer__buttons'>
          {!timerIsActive && (
            <StartButton
              timerRef={timerRef}
              taskArray={tasksArray}
              count={count}
              pomidoroCount={pomidoroCount}
              currentTask={currentTimer.currentTask}
              setDayTime={setDayTimeAll}
              setCount={setCount}
              setActive={setTimerIsActive}
              setWorkTime={setWorkTime}
            />
          )}
          {timerIsActive && !isPause && <PauseButton timerRef={timerRef} pauseTimeRef={pauseTimeRef} setPause={setIsPause} setPauseTime={setPauseTime} />}
          {!isPause && !isBreak && !isLongBreak && (
            <StopButton
              timerIsActive={timerIsActive}
              timerRef={timerRef}
              dayTime={dayTimeAll}
              workTime={workTime}
              setActive={setTimerIsActive}
              setCount={setCount}
              setPomidoroCount={setPomidoroCount}
            />
          )}
          {isPause && (
            <ContinueButton
              count={count}
              timerRef={timerRef}
              pauseTimeRef={pauseTimeRef}
              pauseTime={pauseTime}
              dayTimeAll={dayTimeAll}
              setIsPause={setIsPause}
              setCount={setCount}
            />
          )}
          {isPause && !isBreak && !isLongBreak && (
            <ReadyButton
              currentPomidoro={currentTimer.currentPomidoro}
              pauseTime={pauseTime}
              pauseTimeRef={pauseTimeRef}
              dayTimeAll={dayTimeAll}
              workTime={workTime}
              setBreak={setIsBreak}
              setLongBreak={setIsLongBreak}
              setCount={setCount}
              setIsPause={setIsPause}
            />
          )}
          {(isBreak || isLongBreak) && (
            <SkipButton
              timerRef={timerRef}
              time={currentTimer.currentTask.time}
              pomidoroCount={pomidoroCount}
              dayTime={dayTimeAll}
              pauseTime={pauseTime}
              pauseTimeRef={pauseTimeRef}
              setCount={setCount}
              setActive={setTimerIsActive}
              setBreak={setIsBreak}
              setLongBreak={setIsLongBreak}
              setIsPause={setIsPause}
              setPomidoroCount={setPomidoroCount}
            />
          )}
        </div>
      </div>
    </div>
  );
};
