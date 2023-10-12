import { Button, Input, message, Image } from 'antd'
import { useForm, Controller } from 'react-hook-form' 
import { UserContext } from '../context/UserContext';
import axios from 'axios'
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listOfStreaming } from '../assets/images'

export default function Register(){
    const { control, handleSubmit } = useForm()
    const [data, setData] = useState([]); 

    function handleOk(data){
        console.log(data);
    }


    useEffect(()=>{
        (async()=>{


            // const res = await axios.get('api/movie/providerrr', {responseType: 'blob'});
            // console.log(res.data);
            // const urlIMG = URL.createObjectURL(res.data);
            // console.log(urlIMG);
            // setData(urlIMG);
            
            const res2 = await axios.get('api/movie/provider');
            console.log(res2.data[0].path)
            console.log(URL.createObjectURL(res2.data[0].path, {type: 'image/jpeg'}))
        })()
    },[])

    return(
        <>
            <h3>Register page</h3>
            <form onSubmit={handleSubmit(handleOk)}>
                <Controller control={control} name='name' render={({field})=>{
                    return <Input type='text' {...field} className='w-[200px]'/>
                }}/>
                <Controller control={control} name='password' render={({field})=>{
                    return <Input type='password' {...field} className='w-[200px]'/>
                }}/>
                <Button type='default' htmlType='submit'>Enviar</Button>
            </form> 

            <div>
                <div className='flex gap-2 flex-wrap bg-red-300 w-10/12 p-2'>
                    
                    {listOfStreaming.map((streaming, key)=>{
                        return (
                            <div id={streaming.id} key={key} className='bg-blue-950 flex flex-col rounded-md w-[120px] h-[150px] justify-center items-center'>
                                <img src={streaming.icon} alt={`${streaming.name}`} className='w-[80%] rounded-3xl'/>
                                <span>{streaming.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            
        </>
    )
}


