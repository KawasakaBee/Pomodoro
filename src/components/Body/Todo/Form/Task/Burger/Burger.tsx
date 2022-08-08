import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useRef } from 'react';
import { addTime, removeTime, totalTime } from '../../../../../../state/actions/taskActions';
import { useDispatch } from 'react-redux';
import './burger.scss';

interface BurgerProps {
  name: string;
  opened: boolean;
  hideBurger: Dispatch<SetStateAction<boolean>>;
  openModal: Dispatch<SetStateAction<boolean>>;
  setType: Dispatch<SetStateAction<string>>;
}

export const Burger: FunctionComponent<BurgerProps> = ({ name, opened, hideBurger, openModal, setType }) => {
  const dispatch = useDispatch();
  const burgerRef = useRef(null);

  useEffect(() => {
    let firstOpen = true;

    const handleClick = (e: MouseEvent) => {
      if (firstOpen) {
        firstOpen = false;
        return;
      }
      if (burgerRef.current !== e.target) hideBurger(false);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [opened, hideBurger]);

  function plusHandler() {
    dispatch(addTime(name));
    dispatch(totalTime());
    hideBurger(false);
  }

  function minusHandler() {
    dispatch(removeTime(name));
    dispatch(totalTime());
    hideBurger(false);
  }

  function editHandler() {
    setType('edit');
    openModal(true);
    hideBurger(false);
  }

  function deleteHandler() {
    setType('delete');
    openModal(true);
    hideBurger(false);
  }

  return (
    <div className='burger' ref={burgerRef}>
      <button className='burger__button burger__button--plus' onClick={() => plusHandler()}>
        Увеличить
      </button>
      <button className='burger__button burger__button--minus' onClick={() => minusHandler()}>
        Уменьшить
      </button>
      <button className='burger__button burger__button--edit' onClick={() => editHandler()}>
        Редактировать
      </button>
      <button className='burger__button burger__button--delete' onClick={() => deleteHandler()}>
        Удалить
      </button>
    </div>
  );
};
