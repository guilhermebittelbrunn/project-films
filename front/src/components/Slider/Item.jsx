import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import Mark from './Mark'
import './Item.scss'

const Item = ({ movie }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.id === movie.id;

      return (
        <div
          ref={elementRef}
          // style={{width:'80px'}}
          onClick={() => onSelectSlide(movie)}
          className={cx('item', {
            'item--open': isActive,
          })}
        
        >
          <img src={movie.image} alt=""/>
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
