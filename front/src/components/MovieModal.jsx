import { CloseOutlined } from '@ant-design/icons'
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch'
import { Spin } from 'antd';
import { message } from 'antd';
export default function MovieModal({id, status, setIsModalOpen}){
    const {data, loading, error} = useFetch(`movie/${id}`);

    function handleCloseModal(e){
        const content = document.getElementById('content');
        if(e.target !== content){
            setIsModalOpen({id: null, status:false});
        }
    } 

    if(status){
        return(
            <>
                <div 
                    className='w-full h-screen z-20 left-0 top-0 absolute bg-red-300' 
                    style={{backgroundColor: 'rgba(27, 27, 27, .7)'}}
                    onClick={handleCloseModal}
                >
                    <div 
                        id='content'
                        className='bg-secondery opacity-100 rounded-sm border-[2px] border-primary 
                        flex flex-col justify-between  items-center absolute top-2/4
                        left-2/4 transform translate-x-[-50%] translate-y-[-50%] w-full max-w-[800px]
                        h-[400px]'
                    > 
                        {loading ? 
                            <Spin size='large'/>
                            :
                            <div className='flex justify-between items-center w-full'>
                                <CloseOutlined 
                                    className='absolute top-1 right-2 transition-all
                                    hover:cursor-pointer hover:scale-110'
                                    onClick={()=>{setIsModalOpen({id: null, status: false})}}
                                />
                                <div id='left-content' className='bg-slate-200 absolute top-0 bottom-0 w-3/12'>
                                    {data.sinopse}
                                </div>
                                <div id='right-content' className='bg-green-300 w-full'>
                                    <img src={`https://image.tmdb.org/t/p/w200/${data.backdrop_path}`} alt={data.title} className='w-full'/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }
}