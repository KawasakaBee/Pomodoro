import React, { useEffect } from 'react';
import { setLastWeek, setThisWeek, setTwoWeeksAgo } from '../state/actions/statisticsActions';
import { lastWeek, thisWeek, twoWeeksAgo } from '../utils/db/db';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useLocalStorage } from '../utils/hooks/useLocalStorage';
import { useDispatch } from 'react-redux';
import { Statistics } from './Statistics/Statistics';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import './app.scss';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localThiwWeek = useLocalStorage('thisWeek', 'get', thisWeek);
    const localLastWeek = useLocalStorage('lastWeek', 'get', lastWeek);
    const localTwoWeeksAgo = useLocalStorage('twoWeeksAgo', 'get', twoWeeksAgo);

    dispatch(setThisWeek(localThiwWeek));
    dispatch(setLastWeek(localLastWeek));
    dispatch(setTwoWeeksAgo(localTwoWeeksAgo));

    if (localThiwWeek[7].dayTime !== 0 && new Date().getDay() !== 0) {
      dispatch(setThisWeek(useLocalStorage('thisWeek', 'set', thisWeek)));
      dispatch(setLastWeek(useLocalStorage('lastWeek', 'set', localThiwWeek)));
      dispatch(setTwoWeeksAgo(useLocalStorage('twoWeeksAgo', 'set', localLastWeek)));
    }
  }, []);

  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <div className='app__container'>
          <Routes>
            <Route path='/' element={<Body />} />
            <Route path='/statistics' element={<Statistics />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
