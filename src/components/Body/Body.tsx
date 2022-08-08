import React from 'react';
import { Timer } from './Timer/Timer';
import { Todo } from './Todo/Todo';
import './body.scss';

export const Body = () => {
  return (
    <div className='body'>
      <Todo />
      <Timer />
    </div>
  );
};
