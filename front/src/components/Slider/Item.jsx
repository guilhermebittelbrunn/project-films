import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import Mark from './Mark'
import './Item.scss'

export default function  Item({ movie, setModalSettings }){

  return (
    <SliderContext.Consumer>
      {({ currentSlide, elementRef }) => {
        const isActive = currentSlide && currentSlide.id === movie.id;

        return (
          <div
            ref={elementRef}
            // style={{width:'80px'}}
            onClick={() => setModalSettings({id: movie.id, status:true})}
            className={cx('item', {
              'item--open': isActive,
            })}
          
          >
            <img src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'} alt=""/>
            {/* <img src={movie.image} alt=""/> */}
            {isActive && <Mark />}
          </div>
        );
      }}
    </SliderContext.Consumer>
  )
}

