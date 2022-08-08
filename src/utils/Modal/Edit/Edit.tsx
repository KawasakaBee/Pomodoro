import React, { FunctionComponent, useState } from 'react';
import { editTaskName } from '../../../state/actions/taskActions';
import { useDispatch } from 'react-redux';
import { validation } from '../../../logic/validation';
import './edit.scss';

interface EditProps {
  name: string;
}

export const Edit: FunctionComponent<EditProps> = ({ name }) => {
  const [inputValue, setInputValue] = useState('');
  const [errorText, setErrorText] = useState('Название задачи');
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value);

  const clickHandler = () => {
    const [error, text] = validation(inputValue);
    setIsError(error);
    setErrorText(text);

    if (!error) dispatch(editTaskName(name, inputValue));
    setInputValue('');
  };

  return (
    <div className='edit'>
      <input className={isError ? 'edit__input error' : 'edit__input'} value={inputValue} onChange={(e) => changeHandler(e)} placeholder={errorText} />
      <button className='edit__button' type='button' onClick={() => clickHandler()}>
        Изменить
      </button>
    </div>
  );
};
