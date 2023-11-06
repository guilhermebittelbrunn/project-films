import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { Select, Input, Spin } from 'antd';
import api from '../../api';

export default function SearchSection(){
    const [title, setTItle] = useState('');
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(true);


    function handleChange(e){
        setTItle(e.target.value);
    }

    useEffect(()=>{
        (async()=>{
            try{
                const moviesApi = await api.get('/movie?limit=200');
                const genresApi = await api.get('/genres');

                const genreSelectOptions = genresApi.data.map(genre=>{
                        return {value: genre.id, label: genre.name}
                });

                setMovies(moviesApi.data);
                setGenres([{value: '', label: 'Todos os gêneros'}, ...genreSelectOptions]);
            }catch(error){
                console.log(error);
                return;
            }finally{
                setLoading(false);
            }
        })();
    },[])

 
    
    useEffect(()=>{
        console.log(genre);
    },[genre])
    
    useEffect(()=>{
        (async()=>{
            try {
                // console.log(genre)
                const movies = await api.get(`/movie?limit=200&title=${title.trim()}&genres=[${genre}]`);
                console.log(`/movie?limit=200&title=${title.trim()}&genres[${genre}]`)
                setMovies(movies.data);
            } catch (error) {
                console.log(error);
            }
        })();
    },[title, genre])

    if(loading){
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <Spin />
            </div>
        )
    }

    return(
        <>
            <div className='flex w-full justify-center items-center my-2 gap-4'>
                <div className='flex gap-4'>
                    <Select
                        value={genre}
                        defaultValue={''}
                        size='large'
                        onChange={(v)=>{setGenre(v)}}
                        className='w-[240px] max-sm:w-[120px]'
                        dropdownStyle={{backgroundColor: 'black', color: 'red'}}
                        options={genres}
                    />

                    <Input 
                        type='text' 
                        value={title} 
                        onChange={handleChange} 
                        placeholder='Título' 
                        size='large'
                        className='bg-secondery w-[240px] max-sm:w-[200px]'

                    />
                </div>
            </div>
            <div>
                <div id='movie-section' className='flex flex-wrap justify-center gap-2 w-full overflow-auto h-[600px]'>
                    {movies.length > 0 ?
                        movies.map((movie, key)=>{
                            return(
                                <div key={key} className={`w-[155px] max-h-[320px] max-sm:w-[100px] border-2 ${movie.status ? 'border-primary' : 'border-gray-700'}`} onClick={()=>{handleMovieClick(movie.id)}}>
                                    <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} className='w-[160px] h-[220px] bg-posternull max-sm:w-[100px] max-sm:h-[130px]' style={{backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>
                                    <p className='text-sm text-font font-semibold text-center py-1 bg-red-300 mt-1 max-sm:text-xs'>{movie.title}</p>
                                </div>
                            )
                        })
                        :
                        <div className='flex justify-center items-center w-full'>
                            <h3 className='text-xl font-bold'>Filme não encontrado</h3>
                        </div>
                    }
                </div>    
            </div>
        </>
    )
}