import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, totalTime } from '../../../../state/actions/taskActions';
import { RootReducer } from '../../../../state/reducers/rootReducer';
import { validation } from '../../../../logic/validation';
import { timeEditor } from '../../../../logic/timeEditor';
import { Task } from './Task/Task';
import './form.scss';

export const Form = () => {
  const [inputValue, setInputValue] = useState('');
  const [errorText, setErrorText] = useState('Название задачи');
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const time = useSelector((store: RootReducer) => store.task.totalTime);
  const arr = useSelector((store: RootReducer) => store.task.tasks);

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const clickHandler = () => {
    const [error, text] = validation(inputValue);
    setIsError(error);
    setErrorText(text);

    if (!error && arr.length < 57) {
      dispatch(setTasks({ name: inputValue, time: 1 }));
      dispatch(totalTime());
    }
    setInputValue('');
  };

  return (
    <div className='form'>
      <input className={isError ? 'form__input error' : 'form__input'} type='text' placeholder={errorText} onChange={(e) => changeHandler(e)} value={inputValue} />
      <button className='form__button' onClick={() => clickHandler()}>
        Добавить
      </button>
      <ul className='form__tasks'>{arr.length !== 0 && arr.map((task) => <Task title={task.name} time={task.time} key={Math.random()} />)}</ul>
      {time !== 0 && <div className='form__time'>{timeEditor(time)}</div>}
    </div>
  );
};
