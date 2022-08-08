import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { DiagramColumn } from './DiagramColumn/DiagramColumn';
import { timeConvertor } from '../../logic/timeConvertor';
import { RootReducer } from '../../state/reducers/rootReducer';
import { setFocus } from '../../state/actions/currentDayAction';
import { Select } from './Select/Select';
import { Card } from './Card/Card';
import focusImageActive from '../../assets/focus-image-active.svg';
import pauseImageActive from '../../assets/pause-image-active.svg';
import stopImageActive from '../../assets/stop-image-active.svg';
import focusImage from '../../assets/info-focus.svg';
import pauseImage from '../../assets/info-pause.svg';
import stopImage from '../../assets/info-stop.svg';
import './statistics.scss';

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

export const Statistics = () => {
  const dispatch = useDispatch();
  const currentDay = useSelector((store: RootReducer) => store.currentDay);
  const weeks = useSelector((store: RootReducer) => store.statistics);

  const [currentWeek, setCurrentWeek] = useState(weeks.thisWeek);
  const [selectValue, setSelectValue] = useState('Эта неделя');
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    dispatch(setFocus(Math.round(Number(((currentDay.dayTime - currentDay.pause < 0 ? 0 : currentDay.dayTime - currentDay.pause) / currentDay.dayTime).toFixed(2)) * 100)));
    localStorage.setItem('currentDay', JSON.stringify(currentDay));

    const thisWeek = useLocalStorage('thisWeek', 'get', weeks.thisWeek);
    thisWeek[currentDay.dayName] = currentDay;
    setCurrentWeek(useLocalStorage('thisWeek', 'set', thisWeek));
  }, []);

  useEffect(() => {
    switch (selectValue) {
      case 'Эта неделя':
        setCurrentWeek(useLocalStorage('thisWeek', 'get', weeks.thisWeek));
        break;
      case 'Прошедшая неделя':
        setCurrentWeek(useLocalStorage('lastWeek', 'get', weeks.lastWeek));
        break;
      case '2 недели назад':
        setCurrentWeek(useLocalStorage('twoWeeksAgo', 'get', weeks.twoWeeksAgo));
        break;
    }
  }, [selectValue]);

  return (
    <div className='statistics'>
      <div className='statistics__activity'>
        <h2 className='statistics__title'>Ваша активность</h2>
        <Select selectValue={selectValue} setSelectValue={setSelectValue} />
      </div>
      <div className='statistics__info'>
        <h3 className='statistics__day'>{selectedDay ? days[selectedDay - 1] : 'Выберите день недели'}</h3>
        {selectedDay ? (
          <p className='statistics__data-time'>
            Вы работали над задачами в течение <span className='statistics__data-minutes'>{timeConvertor(currentWeek[selectedDay].dayWork)}</span>
          </p>
        ) : (
          <p className='statistics__data-time'>Нет данных</p>
        )}
      </div>
      <div className={'statistics__pomidoro ' + (selectedDay ? 'statistics__pomidoro--active' : 'statistics__pomidoro--disabled')}>
        {selectedDay !== 0 && <div className='statistics__icon'>{'X ' + currentWeek[selectedDay].pomidoroCount}</div>}
        {selectedDay !== 0 && <div className='statistics__count'>{currentWeek[selectedDay].pomidoroCount + ' помидора'}</div>}
      </div>
      <div className='statistics__diagram diagram'>
        <div className='diagram__row'>1 ч 40 мин</div>
        <div className='diagram__row'>1 ч 15 мин</div>
        <div className='diagram__row'>50 мин</div>
        <div className='diagram__row'>25 мин</div>
        <div className='diagram__row--last'></div>

        <div className='diagram__footer'>
          <DiagramColumn text='Пн' dayOfWeek={1} currentDay={currentWeek[1]} dayNumber={selectedDay} selectedDay={setSelectedDay} />
          <DiagramColumn text='Вт' dayOfWeek={2} currentDay={currentWeek[2]} dayNumber={selectedDay} selectedDay={setSelectedDay} />
          <DiagramColumn text='Ср' dayOfWeek={3} currentDay={currentWeek[3]} dayNumber={selectedDay} selectedDay={setSelectedDay} />
          <DiagramColumn text='Чт' dayOfWeek={4} currentDay={currentWeek[4]} dayNumber={selectedDay} selectedDay={setSelectedDay} />
          <DiagramColumn text='Пт' dayOfWeek={5} currentDay={currentWeek[5]} dayNumber={selectedDay} selectedDay={setSelectedDay} />
          <DiagramColumn text='Сб' dayOfWeek={6} currentDay={currentWeek[6]} dayNumber={selectedDay} selectedDay={setSelectedDay} />
          <DiagramColumn text='Вс' dayOfWeek={7} currentDay={currentWeek[7]} dayNumber={selectedDay} selectedDay={setSelectedDay} />
        </div>
      </div>
      <div className='statistics__footer'>
        <Card
          title='Фокус'
          bgrndColor={selectedDay ? 'card--focus' : ''}
          unit='%'
          count={selectedDay ? currentWeek[selectedDay].focus : 0}
          img={selectedDay ? focusImageActive : focusImage}
        />
        <Card
          title='Время на паузе'
          bgrndColor={selectedDay ? 'card--pause' : ''}
          unit='м'
          count={selectedDay ? Math.ceil(currentWeek[selectedDay].pause / 60) : 0}
          img={selectedDay ? pauseImageActive : pauseImage}
        />
        <Card
          title='Остановки'
          bgrndColor={selectedDay ? 'card--stop' : ''}
          unit=''
          count={selectedDay ? currentWeek[selectedDay].stop : 0}
          img={selectedDay ? stopImageActive : stopImage}
        />
      </div>
    </div>
  );
};
