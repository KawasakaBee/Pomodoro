import React from 'react';
import { Form } from './Form/Form';
import './todo.scss';

export const Todo = () => {
  return (
    <div className='todo'>
      <h1 className='todo__title'>Ура! Теперь можно начать работать:</h1>
      <ul className='todo__list'>
        <li className='todo__item'>Выберите категорию и напишите название текущей задачи</li>
        <li className='todo__item'>Запустите таймер («помидор»)</li>
        <li className='todo__item'>Работайте пока «помидор» не прозвонит</li>
        <li className='todo__item'>Сделайте короткий перерыв (3-5 минут)</li>
        <li className='todo__item'>
          Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
        </li>
      </ul>
      <Form />
    </div>
  );
};
