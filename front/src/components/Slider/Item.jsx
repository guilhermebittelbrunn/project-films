import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
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
            style={{position: 'relative'}}
          >
            {/* <img src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'} alt={movie.title}/> */}
            <img src={movie.image} alt={movie.title}/>
            {/* <span className='absolute bottom-0 left-0 text-center w-full'>
              {movie.title}
            </span> */}
          </div>
        );
      }}
    </SliderContext.Consumer>
  )
}

