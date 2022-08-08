import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import './select.scss';

interface SelectProps {
  selectValue: string;
  setSelectValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Select: FunctionComponent<SelectProps> = ({ selectValue, setSelectValue }) => {
  const [twoWeeksAgo, settwoWeeksAgo] = useState('2 недели назад');
  const [isVisible, setIsVisible] = useState(false);
  const [lastWeek, setLastWeek] = useState('Прошедшая неделя');

  const selectRef = useRef(null);

  function optionLaskWeekHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const text = e.currentTarget.textContent;
    setIsVisible(!isVisible);

    setLastWeek(selectValue);
    if (text) {
      setSelectValue(text);
    }
  }

  function optionTwoWeeksAgoHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const text = e.currentTarget.textContent;
    setIsVisible(!isVisible);

    settwoWeeksAgo(selectValue);
    if (text) {
      setSelectValue(text);
    }
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (selectRef.current !== e.target) setIsVisible(false);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isVisible]);

  return (
    <div className='select' onClick={() => setIsVisible(!isVisible)}>
      <div className={'select__header' + (isVisible ? ' select__header--visible' : '')} ref={selectRef}>
        {selectValue}
      </div>
      <div className={'select__drop ' + (isVisible ? 'select__drop--visible' : '')}>
        <div className='select__option' onClick={(e) => optionLaskWeekHandler(e)}>
          {lastWeek}
        </div>
        <div className='select__option' onClick={(e) => optionTwoWeeksAgoHandler(e)}>
          {twoWeeksAgo}
        </div>
      </div>
    </div>
  );
};
