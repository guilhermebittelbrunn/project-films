import React, { useEffect, useState } from 'react';
import { Spin, Tabs } from 'antd';
import Slider from '../../components/Slider'
import useFetch from '../../hooks/useFetch';

const obj = {
  action: [
      {
      id: 1,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 2,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 3,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 4,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 5,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 6,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 7,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 8,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 9,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 10,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 11,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
  ],
  fantasy: [
      {
      id: 1,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 2,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 3,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 4,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 5,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 6,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 7,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 8,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 9,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 10,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 11,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
  ],
  scyfi:  [
      {
      id: 1,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 2,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 3,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 4,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 5,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 6,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 7,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 8,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 9,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 10,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 11,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
  ],
  sport:  [
      {
      id: 1,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 2,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 3,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 4,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 5,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 6,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 7,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 8,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 9,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 10,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
    {
      id: 11,
      image: 'https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
      description: 'teste'
    },
  ],
}
function Content({url}){
  const [movieList, setMovieList] = useState([]);
  const {data, loading, error} = useFetch(url);

  useEffect(() => {
    if(loading || error || !data){
      return;
    }
    const htmlElementCollection = [];
    for(let key in data){
      // eslint-disable-next-line no-prototype-builtins
      if(data.hasOwnProperty(key) && data[key].length > 6){
        htmlElementCollection.push(
          <div className='mt-[-28px]'>
            <h3 className='text-primary font-semibold text-xl absolute left-2 uppercase font max-sm:text-lg'>{key}</h3>
            <Slider key={key}>
                {data[key].map(movie=>{
                  const movieItem = {
                    id: movie.id,
                    image: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                    imageBg: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                    title: movie.title,
                    description: movie.sinopse,
                  }
                  return <Slider.Item movie={movieItem} key={key + movie.id}>item1</Slider.Item>
                })} 
            </Slider>
          </div>  
        )
      }
    }
    setMovieList(htmlElementCollection);
  }, [data]);


  return(
    <>
      <div className='flex flex-col min-h-[600px] items-center w-12/12 mt-10' key={2}>
        {error ?
          <div className='text-center text-red-500 text-xl font-bold mt-10'>
            {error}
          </div>
        :
          loading ? 
          <div className='w-full flex justify-center items-center'>
            <Spin size='large'/>
          </div>
          :
          movieList
          }
      </div> 
    </>
  )
}



export default function Main(){
  const [url,setUrl] = useState('/movie/genres')
  
  const tabItems = [
    {
      key: '1',
      label: <h3 className='text-xl font-bold mx-8 max-sm:mx-2 max-sm:text-sm uppercase'>Descobertas</h3>,
      children: <Content url={url}/>
    },
    {
      key: '2',
      label: <h3 className='text-xl font-bold mx-8 max-sm:mx-2 max-sm:text-sm uppercase'>Recomendações</h3>,
      children: <Content url={url}/>
    },
  ];

  function handleTabChange(e){
      if(e === '1'){
          setUrl('/movie/genres');
      }
      else{
        setUrl('/movie/genres');
      }
  }


    return (
        <>
        <Tabs 
          className='w-full'
          tabBarStyle={{width:'100%', margin: 'auto'}}
          centered defaultActiveKey="1" 
          items={tabItems} 
          size='large'
          onChange={handleTabChange}
          indicatorSize={160}
        />
        </>
    )
}

