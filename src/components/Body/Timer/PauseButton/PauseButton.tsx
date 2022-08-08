import React, { FunctionComponent } from 'react';
import './pauseButton.scss';

interface PauseButtonProps {
  timerRef: React.MutableRefObject<NodeJS.Timer | undefined>;
  pauseTimeRef: React.MutableRefObject<NodeJS.Timer | undefined>;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  setPauseTime: React.Dispatch<React.SetStateAction<number>>;
}

export const PauseButton: FunctionComponent<PauseButtonProps> = ({ timerRef, pauseTimeRef, setPause, setPauseTime }) => {
  function pauseHandler() {
    clearInterval(timerRef.current);
    setPause(true);

    pauseTimeRef.current = setInterval(() => {
      setPauseTime((prev) => prev + 1);
    }, 1000);
  }

  return (
    <button className='pause-button' onClick={() => pauseHandler()}>
      Пауза
    </button>
  );
};
