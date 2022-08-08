import React, { FunctionComponent } from 'react';
import './card.scss';

interface CardProps {
  title: string;
  bgrndColor: string;
  unit: string;
  count: number;
  img: string;
}

export const Card: FunctionComponent<CardProps> = ({ title, bgrndColor, unit, count, img }) => {
  return (
    <div className={'card ' + bgrndColor} style={{ backgroundImage: `url(${img})` }}>
      <h3 className='card__title'>{title}</h3>
      <p className='card__info'>{count + unit}</p>
    </div>
  );
};
