import React, { Component } from 'react';
import Slider from './components/Slider'


const movies = [
  {
    id: 1,
    image: '/images/slide1.jpg',
    imageBg: '/images/slide1b.webp',
    title: '1983',
    description: 'teste'
    
  },
  {
    id: 2,
    image: '/images/slide2.jpg',
    imageBg: '/images/slide2b.webp',
    title: 'Russian doll',
    description: 'teste'
    
  }
  ,
  {
    id: 3,
    image: '/images/slide3.jpg',
    imageBg: '/images/slide3b.webp',
    title: 'The rain',
    description: 'teste'
  }
  ,
  {
    id: 4,
    image: '/images/slide4.jpg',
    imageBg: '/images/slide4b.webp',
    title: 'Sex education',
    description: 'teste'
  }
  ,
  {
    id: 5,
    image: '/images/slide5.jpg',
    imageBg: '/images/slide5b.webp',
    title: 'Elite',
    description: 'teste'
  }
  ,
  {
    id: 6,
    image: '/images/slide6.jpg',
    imageBg: '/images/slide6b.webp',
    title: 'Black mirror',
    description: 'teste'
  
  }
];

class App extends Component {
  render() {
    return (
      
      <main>
        <nav>
        </nav>
        <div className='w-[800px]'>
          <div className="app">
          <Slider>
            {movies.map(movie => (
              <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
            ))}
          </Slider>
          <Slider>
            {movies.map(movie => (
              <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
            ))}
          </Slider>
          <Slider>
            {movies.map(movie => (
              <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
            ))}
          </Slider>
          <Slider>
            {movies.map(movie => (
              <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
            ))}
          </Slider>
        </div>
        </div>
      </main>
    );
  }
}

export default App;



