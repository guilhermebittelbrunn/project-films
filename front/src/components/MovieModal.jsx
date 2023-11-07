import { CloseOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch'
import { Spin, Tooltip  } from 'antd';
import { listOfStreaming } from '../assets/images'
import { useContext } from 'react';
import {UserContext} from '../context/UserContext'

export default function MovieModal({id, status, setIsModalOpen}){
    const {user} = useContext(UserContext);
    const {data, loading, error} = useFetch(`movie/${id}?idUser=${user.id}`);

    useEffect(() => {
        if(error){
            message.error(error.message);
        }
        if(!loading){
            if('Lists' in data){
                console.log(data.Lists);
            }
            // console.log(data?.Lists.indexOf(list=>list.name === 'favorite'));
        }
    }, [data])

    function handleClickMovieList(listName, status){
        status ? postMovieList(listName) : removeMovieList(listName)
    }

    function postMovieList(lisName){
        console.log('add', lisName)
    }
    function removeMovieList(){
        console.log('remove', lisName)
    }

    function handleCloseModal(e){
        const content = document.getElementById('content');
        if(!content.contains(e.target)){
            setIsModalOpen({id: null, status:false});
        }
    } 

    if(status && !loading){
        return(
            <>
                <div 
                    className='w-full h-screen z-20 left-0 top-0 absolute bg-red-300 overflow-hidden' 
                    style={{backgroundColor: 'rgba(27, 27, 27, .7)'}}
                    onClick={handleCloseModal}
                >
                    <div 
                        id='content'
                        className='bg-secondery opacity-100 rounded-md border-[2px] border-primary 
                        flex flex-col justify-between  items-center absolute top-2/4
                        left-2/4 transform translate-x-[-50%] translate-y-[-50%] w-[95%] max-w-[600px]
                    '>
                        <div className='flex flex-col justify-between items-center w-full'>
                            <CloseOutlined 
                                className='absolute top-3 right-3 transition-all font-bold
                                hover:cursor-pointer hover:scale-110 z-20 text-2xl'
                                onClick={()=>{setIsModalOpen({id: null, status: false})}}
                            />
                            {
                                data.id ?
                                    <StarFilled 
                                        className='absolute top-3 left-2 transition-all 
                                        hover:cursor-pointer hover:scale-110 z-20 text-2xl
                                        text-yellow-400'
                                        onClick={()=>{handleClickMovieList('favourites',false)}}
                                    />
                                    :
                                    <StarOutlined 
                                        className='absolute top-3 left-2 transition-all 
                                        hover:cursor-pointer hover:scale-110 z-20 text-2xl
                                        text-yellow-400'
                                        onClick={()=>{handleClickMovieList('favourites',true)}}
                                    />
                            }
                            {loading ?
                            <Spin/>
                            :
                            <>
                                <div className='relative flex justify-center items-center w-full'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`} alt={data.title} className='w-full z-10'/>
                                    <div className='absolute gap-4 left-[0%] bottom-0 w-full flex justify-center items-centerbottom-0 z-20 py-2' style={{backgroundColor: 'rgb(0,0,0, .3)'}}>
                                        {data.streamings &&
                                            data.streamings.map(streaming=>{
                                                return listOfStreaming.filter(icon=>{
                                                    if(icon.id === streaming.id){
                                                        return icon?.icon
                                                    }
                                                })
                                                
                                            }).map(t=>{
                                                console.log(t);
                                                return(
                                                    <Tooltip title={t[0]?.name} key={t.id}>
                                                        <img src={t[0]?.icon} className='w-[35px] rounded-full transition-all hover:scale-150' alt={t[0]?.name}/>
                                                    </Tooltip>
                                                ) 
                                            })
                                        }
                                    </div>
                                    <Spin className='absolute left-[45%] top-24' size='large'/>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <span className='font-bold my-2 text-center text-primary text-lg'>{data.title}</span>
                                    <div id='tags' className='flex items-center justify-center gap-4 flex-wrap max-sm:gap-0'>
                                        {data.genres &&
                                            data.genres.map(genre=>{
                                                return(
                                                    <div key={genre.id} className='borde rounded-sm border-primary px-2 text-sm'>
                                                        {genre.name}   
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='flex justify-between px-4 mt-2 w-full'>
                                        <div className='flex justify-center items-center'>
                                            <span className='font-bold my-2 text-center text-sm text-gray-200'>Nota: {String(data.vote).slice(0,3)} </span>
                                            <span className='font-bold text-sm text-gray-400'>/ 10</span>
                                        </div>
                                        <div className='flex justify-center items-center gap-1 mr-2'>
                                            <span className='font-bold my-2 text-center text-sm text-gray-200'>Duração: {data.duration} </span>
                                            <span className='font-bold text-sm text-gray-400'> minutos</span>
                                        </div>
                                        
                                    </div>
                                    <p id='modal-section' className='text-sm mx-4 pr-2 my-2 text-justify max-h-[200px] overflow-auto rounded-lg'>{data.sinopse}</p>
                                    <div id='bts' className='flex flex-col justify-center items-center gap-2 mt-4 pb-2 w-full'>
                                        <button 
                                            className='border border-primary py-2 px-4 text-sm rounded-md w-[97%] transition-all
                                          bg-primary font-medium drop-shadow-2xl hover:opacity-80'
                                        >
                                            Adicionar em assistir mais tarde
                                        </button>

                                        <button 
                                            className='border border-white py-2 px-4 text-sm rounded-md w-[97%] transition-all
                                            font-medium hover:text-primary hover:border-primary' onClick={()=>{handleClickMovieList('assitidos',)}}
                                        >   
                                            Marcar como assistido
                                        </button>
                                    </div>
                                </div>
                            </>
                            }
                        </div> 
                    </div>
                </div>
            </>
        )
    }
}