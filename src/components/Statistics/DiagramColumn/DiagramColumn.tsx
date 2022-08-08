import React, { FunctionComponent } from 'react';
import { InitialDay } from '../../../state/reducers/currentDayReducer';
import './diagramColumn.scss';

interface DiagramColumnProps {
  text: string;
  currentDay: InitialDay;
  dayOfWeek: number;
  dayNumber: number;
  selectedDay: React.Dispatch<React.SetStateAction<number>>;
}

export const DiagramColumn: FunctionComponent<DiagramColumnProps> = ({ text, currentDay, dayOfWeek, dayNumber, selectedDay }) => {
  const height = Math.ceil(currentDay.dayWork / 60);

  function clickHandle() {
    selectedDay(dayOfWeek);
  }

  return (
    <div className='column' onClick={() => clickHandle()}>
      <p className={'column__name ' + (dayOfWeek === dayNumber ? 'column__name--selected' : '')}>{text}</p>
      <button
        className={'column__button' + (currentDay.dayWork !== 0 ? ' column__button--hv' + (dayOfWeek === dayNumber ? ' column__button--selected' : '') : '')}
        type='button'
        style={{ height: height === 0 ? 5 : height * 4 > 500 ? 500 : height * 4 }}
      ></button>
    </div>
  );
};
