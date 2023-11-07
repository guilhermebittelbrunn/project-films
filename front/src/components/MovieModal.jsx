import { CloseOutlined, StarFilled, StarOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch'
import { Spin, Tooltip  } from 'antd';
import { listOfStreaming } from '../assets/images'
import { useContext } from 'react';
import {UserContext} from '../context/UserContext'
import { Select, message } from 'antd'
import api from '../api';


export default function MovieModal({id, status, setIsModalOpen}){
    if(!id || !status)return
    
    const {user} = useContext(UserContext);
    const {data, loading, error} = useFetch(`movie/${id}?idUser=${user.id}`);
    const [selectedItems, setSelectedItems] = useState([]);
    const [options, setOptions] = useState([]);
    const filteredOptions = options.filter((o) => !selectedItems.includes(o));


    useEffect(() => {
        if(loading, error)return

        (async()=>{
            if(data){
                const res = await api.get(`/lists/${user.id}`);
                const listOptions = res.data.map(list=>list.name)
                setOptions(listOptions);
                setSelectedItems(data?.Lists.map(list=>list.name));
            }
        })()
    }, [data])

    function handleClickMovieList(listName, status){
        status ? postMovieList(listName) : removeMovieList(listName)
    }

    async function handleCreateList(){
        try{
            const listName = prompt('list name');
            const res = await api.post('/lists', {idUser: user.id, name: listName});
            setOptions(res.data.map(list=>list.name));
        }catch(err){
            if(err.response.data.error){
                message.error('Já existe uma lista com esse nome');
            }
        }
    }

    function postMovieList(lisName){
        console.log('add', lisName)
    }
    function removeMovieList(){
        console.log('remove', lisName)
    }

    function handleCloseModal(e){
        const content = document.getElementById('content');
        if(!content.contains(e.target) && e.target.className !== 'ant-select-item-option-content'){
            setIsModalOpen({id: null, status:false});
        }
    } 

    if(status){
        return(
            <>
                <div 
                    className='w-full h-[100%] z-20 left-0 top-0 fixed overflow-hidden' 
                    style={{backgroundColor: 'rgba(27, 27, 27, .7)'}}
                    onClick={handleCloseModal}
                >
                    <div 
                        id='content'
                        className='bg-secondery opacity-100 rounded-md border-[2px] border-primary 
                        flex flex-col justify-between  items-center absolute top-2/4 min-h-[300px]
                        left-2/4 transform translate-x-[-50%] translate-y-[-50%] w-[95%] max-w-[600px]
                    '>
                        {loading ? 
                        <Spin size='large' className='m-auto'/>
                        :
                        <div className='flex flex-col justify-between items-center w-full'>
                            <CloseOutlined 
                                className='absolute top-3 right-3 transition-all font-bold
                                hover:cursor-pointer hover:scale-110 z-20 text-2xl'
                                onClick={()=>{setIsModalOpen({id: null, status: false})}}
                            />
                            {
                                selectedItems.find(list=>{return list === 'favorites'}) ?
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
                                         
                                        <div className='flex w-full m-auto justify-center items-center gap-1'>
                                            <Select
                                                id='select-modal'
                                                mode="multiple"
                                                placeholder="Listas"
                                                value={selectedItems}
                                                onChange={setSelectedItems}
                                                style={{
                                                    width: '90%',
                                                }}
                                                options={filteredOptions.map((item) => ({
                                                    value: item,
                                                    label: item,
                                                }))}
                                            />
                                            <Tooltip title="Criar uma lista nova">
                                                <button onClick={handleCreateList} className='border border-primary px-2 rounded-sm text-primary font-bold text-lg'>
                                                    <PlusOutlined/>
                                                </button>
                                            </Tooltip>
                                        </div>

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
                            
                            
                        </div> 
                        
                        }
                    </div>
                </div>
            </>
        )
    }
}