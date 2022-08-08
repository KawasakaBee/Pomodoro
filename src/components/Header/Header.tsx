import React from 'react';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { setThisWeek } from '../../state/actions/statisticsActions';
import { useDispatch } from 'react-redux';
import { thisWeek } from '../../utils/db/db';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './header.scss';

export const Header = () => {
  const dispatch = useDispatch();

  function clickHandler() {
    dispatch(setThisWeek(useLocalStorage('thisWeek', 'get', thisWeek)));
  }
  return (
    <header className='header'>
      <Link className='header__logo' to='./' onClick={() => clickHandler()}>
        <img className='header__img' src={logo} alt='logo' />
        <p className='header__text'>pomodoro_box</p>
      </Link>
      <Link className='header__statistics' to='./statistics'>
        Статистика
      </Link>
    </header>
  );
};
