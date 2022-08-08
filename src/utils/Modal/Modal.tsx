import React, { FunctionComponent, Dispatch, SetStateAction } from 'react';
import ReactDOM from 'react-dom';
import { Delete } from './Delete/Delete';
import { Edit } from './Edit/Edit';
import './modal.scss';

interface ModalProps {
  name: string;
  type: string;
  openModal: Dispatch<SetStateAction<boolean>>;
}

const modalBox = document.getElementById('modal');

export const Modal: FunctionComponent<ModalProps> = ({ name, type, openModal }) => {
  if (!modalBox) return <></>;

  return ReactDOM.createPortal(
    <div className='modal' onClick={() => openModal(false)}>
      <div className='modal__wrapper' onClick={(e) => e.stopPropagation()}>
        <div className='modal__close' onClick={() => openModal(false)}>
          X
        </div>
        {type === 'edit' && <Edit name={name} />}
        {type === 'delete' && <Delete name={name} openModal={openModal} />}
      </div>
    </div>,
    modalBox
  );
};
