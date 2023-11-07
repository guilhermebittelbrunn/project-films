import { useContext, useEffect } from "react";
import { UserContext } from '../../context/UserContext'
import Slider from "../../components/Slider";
import useFetch from "../../hooks/useFetch";
import { Spin } from "antd";

export default function Lists({setModalSettings}){
    const { user } = useContext(UserContext);
    const { data, error, loading } = useFetch(`/lists/${user.id}`);

    useEffect(()=>{
        console.log(data);
    },[data])

    return(
        <div>
            {loading ?
            <Spin size='large'/>
            :
            <div className="flex flex-col justify-center items-center">
               {data.map(list=>{
                    return (
                        <div key={list.id} className="w-full relative">
                            <h3 className='text-primary font-semibold text-xl absolute left-2 uppercase font max-sm:text-lg'>{list.name}</h3>
                            <Slider>
                                {list.movies.map((movie, k)=>{
                                    const movieItem = {
                                        id: movie.id,
                                        image: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                                        imageBg: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                                        title: movie.title,
                                        description: movie.sinopse,
                                    }
                                    return <Slider.Item setModalSettings={setModalSettings} movie={movieItem} key={movie.id}>item1</Slider.Item>
                                })} 
                            </Slider>
                        
                        </div>
                    )
               })}
            </div>

            }    
        </div>
    )




}