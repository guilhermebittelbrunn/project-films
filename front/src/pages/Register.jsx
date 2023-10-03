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
            // const res = await axios.get('api/movie/provider');
            // console.log(res.blob);


            const res = await axios.get('api/movie/providerrr', {responseType: 'blob'});
            const urlIMG = URL.createObjectURL(res.data);
            setData(urlIMG);

            // const urlCreator = window.URL
            // const arrayBuffer = new Uint8Array([res.data]).buffer;
            // const blob = new Blob([arrayBuffer], { type: 'image/jpg' }); // Substitua 'jpeg' pelo formato da imagem, se necessário
            // console.log(arrayBuffer);
            // const imageUrl = URL.createObjectURL(blob);
            // const teste = urlCreator.createObjectURL(blob);
            // console.log(res.data);
            // setData(blob);
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
                    {/* <img src="https://www.w3schools.com/images/picture.jpg" alt="Mountain" style="width:300px"></img> */}
                    {data && 
                        <img src={data}  width={50} height={50} alt="teste" />
                    }
                </div>
            </div>
            
        </>
    )
}


