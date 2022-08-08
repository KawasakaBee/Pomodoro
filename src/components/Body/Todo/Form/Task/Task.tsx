import React, { FunctionComponent, useState } from 'react';
import { Burger } from './Burger/Burger';
import { Modal } from '../../../../../utils/Modal/Modal';
import './task.scss';

interface TaskProps {
  title: string;
  time: number;
}

export const Task: FunctionComponent<TaskProps> = ({ title, time }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalType, setModalType] = useState('edit');

  return (
    <li className='task'>
      <div className='task__name'>
        <span className='task__number'>{time}</span>
        <p className='task__title'>{title}</p>
      </div>
      <button className='task__menu' type='button' onClick={() => setIsVisible(true)}></button>
      {isVisible && <Burger hideBurger={setIsVisible} name={title} opened={isVisible} openModal={setModalIsOpen} setType={setModalType} />}
      {modalIsOpen && <Modal name={title} type={modalType} openModal={setModalIsOpen} />}
    </li>
  );
};
