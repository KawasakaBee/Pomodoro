import React, { SetStateAction, Dispatch, FunctionComponent } from 'react';
import { deleteTask, totalTime } from '../../../state/actions/taskActions';
import { useDispatch } from 'react-redux';
import './delete.scss';

interface DeleteProps {
  name: string;
  openModal: Dispatch<SetStateAction<boolean>>;
}

export const Delete: FunctionComponent<DeleteProps> = ({ name, openModal }) => {
  const dispatch = useDispatch();

  function clickHandler() {
    dispatch(deleteTask(name));
    dispatch(totalTime());
  }

  return (
    <div className='delete'>
      <h3 className='delete__title'>Удалить задачу?</h3>
      <button className='delete__button' onClick={() => clickHandler()}>
        Удалить
      </button>
      <button className='delete__cancel' onClick={() => openModal(false)}>
        Отмена
      </button>
    </div>
  );
};
