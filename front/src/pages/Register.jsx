import { Button, Input, message, Image } from 'antd'
import { useForm, Controller } from 'react-hook-form' 
import { UserContext } from '../context/UserContext';
import axios from 'axios'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register(){
    const { control, handleSubmit } = useForm()

    function handleOk(data){
        console.log(data);
    }

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
                    <Image width="50px" height="50px" src='C:\Users\guilh\OneDrive\Documentos\GitHub\project-films\front\src\assets'/>
                    <img width="50px" height="50px" src="../assets/Netflix.jpg" alt="netflix" />
                    <img width="250px" height="250px" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fmundoeducacao.uol.com.br%2Fgeografia%2Fmapa-mundi.htm&psig=AOvVaw1QBIUqkKzMRJBPrGhz3ntm&ust=1696025323356000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCH-OmozoEDFQAAAAAdAAAAABAE" alt="netflix" />
                    <img width="50px" height="50px" src="C:\Users\guilh\OneDrive\Documentos\GitHub\project-films\front\src\assets/Netflix.jpg" alt="netflix" />
                </div>
            </div>
            
        </>
    )
}


