import { useContext, useEffect, useState } from "react";
import { UserContext } from '../../context/UserContext'
import Slider from "../../components/Slider";
import { Spin } from "antd";
import { MovieContext } from "../../context/MovieLists";
import api from "../../api";

export default function Lists({setModalSettings}){
    const { user } = useContext(UserContext);
    const { selectedItems } = useContext(MovieContext)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        (async()=>{
            try{
                setLoading(true);
                const res = await api.get(`/lists/${user.id}`);
                setData(res.data);
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false)
            }
        })()

    },[selectedItems])



    return(
        <div>
            {loading ?
            <Spin size='large'/>
            :
            <div className="flex flex-col justify-center items-center">
               {data.map(list=>{
                    if(list.movies.length > 0){
                        return (
                            <div key={list.id} className="w-full relative">
                                <h3 className='text-primary font-semibold text-xl absolute left-10 uppercase font max-sm:text-lg'>{list.name}</h3>
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
                    }
               })}
            </div>

            }    
        </div>
    )




}