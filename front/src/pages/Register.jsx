import { Button, Input, message, Image } from 'antd'
import { useForm, Controller } from 'react-hook-form' 
import { UserContext } from '../context/UserContext';
import axios from 'axios'
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
                <div id='card'>
                    {data && 
                        // <img src={data}  width={50} height={50} alt="teste" />
                        data.map((img, k)=>{
                            // console.log(URL.createObjectURL(img.path))
                            return <img key={k} src={img.path} alt={img.path} width={50} height={50}/>
                        })
                    }
                </div>
            </div>
            
        </>
    )
}


