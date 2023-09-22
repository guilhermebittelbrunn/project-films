import { Button, Input, message } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { UserContext } from '../context/UserContext';
import axios from 'axios'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const {handleSubmit, control} = useForm();
    const {user,setUser} = useContext(UserContext);
    const navigate = useNavigate()

    async function handleLogin(data){
        
        try{
            const res = await axios.post('api/user/login', data);
            const {status} = res.request;
            if(status !== 200) throw res.data
            message.success(`Bem-vindo ${res.data.name}`);
            setUser(res.data);
            navigate('/teste');
        }catch(err){
            console.log(err);
            message.error('E-mail ou senha incorretos')
        }
        
    }

    return(
        <>
            <h3>Login page</h3>
            <form onSubmit={handleSubmit(handleLogin)} className='w-[300px]'>
                <Controller
                    name='email'
                    control={control}
                    render={({field})=>{
                        return <Input value={field} {...field} placeholder='email' onChange={(v)=>field.onChange(v)}/>
                    }}
                />

                <Controller
                    name='password'
                    control={control}
                    render={({field})=>{
                        return <Input type='password' value={field}  {...field} placeholder='password' onChange={(v)=>field.onChange(v)}/>
                    }}
                />
                

                <Button htmlType='submit' type='primary' className='bg-blue-500'>Entrar</Button>
            </form>
        </>
    )
}