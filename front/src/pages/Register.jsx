import { Button, Input, message, Image } from 'antd'
import { UserOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons'
import { useForm, Controller } from 'react-hook-form' 
import { UserContext } from '../context/UserContext';
import axios from 'axios'
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listOfStreaming } from '../assets/images'
import { Link } from 'react-router-dom'

export default function Register(){
    const { control, handleSubmit } = useForm();
    const [phase, setPhase] = useState(1);
    const [movies, setMovies] = useState([])
    const [providersList, setProvidersList] = useState(listOfStreaming.map(streaming=>{return{...streaming, status:false}}));

    function handleProviderClick(id){
        const x = providersList.reduce((acc,streaming)=>{
            if(streaming.id === id){
                acc.push({
                    ...streaming,
                    status: !streaming.status
                })
                return acc
            }
            acc.push(streaming);
            return acc
        },[])
        setProvidersList(x);
    }

    function handleSubmitForm(data){
        const favoriteProviders = providersList.filter(provider=>provider.status);
        const x = {...data, streamings: favoriteProviders}
        console.log(x);

    }

    useEffect(()=>{
        (async()=>{
            try{
                const {data} = await axios.get('/api/movie/register');
                setMovies(data);
            }catch(err){
                console.log(err);
                message.error('Um erro ocorreu ao carregar os filmes, por favor tente novamente mais tarde');
            }
        })()
    },[])

    return(
        <>

            <div className={`w-full max-w-5xl m-auto py-2 flex justify-center items-center md:absolute md:top-2/4 md:left-2/4 md:transform md:translate-x-[-50%] md:translate-y-[-50%]`}>
                <div className='flex flex-col justify-center items-center text-font w-full'>
            
                    <form className='flex flex-col justify-center items-center gap-2' onSubmit={handleSubmit(handleSubmitForm)}>
                    {phase === 1 &&
                        <>
                            <h1 className='font-bold text-xl'>Crie a sua conta</h1>                    
                            <div className='border-[1.5px] mb-2 bg-secondery gap-4 px-10 py-8 border-primary flex flex-col justify-center items-center rounded-lg'>
                                    <Controller control={control} name='name' render={({field})=>{
                                        return(
                                            <div className='flex px-2 py-1 border-[1px] rounded-md border-primary bg-secondery text-font text-lg'>
                                                <div className='w-[24px] mr-[10px] text-primary flex justify-center items-center'>
                                                    <UserOutlined/>
                                                </div>
                                                <input type='text' {...field} placeholder='Nome' className='bg-secondery outline-none text-font border-hidden w-full text-lg'/>
                                            </div>
                                        ) 
                                        
                                    }}/>
                                    <Controller control={control} name='email' render={({field})=>{
                                        return(
                                            <div className='flex px-2 py-1 border-[1px] rounded-md border-primary bg-secondery text-font'>
                                                <div className='w-[24px] mr-[10px] text-primary flex justify-center items-center'>
                                                    <MailOutlined />
                                                </div>
                                                <input type='email' {...field} placeholder='E-mail' className='bg-secondery outline-none text-font border-hidden w-full text-lg'/>
                                            </div>
                                        ) 
                                    }}/>
                                    <Controller control={control} name='password' render={({field})=>{
                                        return(
                                            <div className='flex px-2 py-1 border-[1px] rounded-md border-primary bg-secondery text-font'>
                                                <div className='w-[24px] mr-[10px] text-primary flex justify-center items-center'>
                                                    <KeyOutlined className='rotate-180'/>
                                                </div>
                                                <input type='password' {...field} placeholder='Senha' className='bg-secondery outline-none text-font border-hidden w-full text-lg'/>
                                            </div>
                                        ) 
                                    }}/>
                                    <Controller control={control} name='confirm_password' render={({field})=>{
                                        return(
                                            <div className='flex px-2 py-1 border-[1px] rounded-md border-primary bg-secondery text-font'>
                                                <div className='w-[24px] mr-[10px] text-primary flex justify-center items-center'>
                                                    <KeyOutlined className='rotate-180'/>
                                                </div>
                                                <input type='password' {...field} placeholder='Confirmar senha' className='bg-secondery outline-none text-font border-hidden w-full text-lg'/>
                                            </div>
                                        ) 
                                    }}/>
                                    <div className='flex flex-col w-full justify-center items-center gap-3 mt-1'>
                                        <button onClick={()=>{setPhase(pv=>pv+1)}} type='button' className='w-4/5 bg-primary mt-2 border-hidden text-font py-2 rounded-md hover:bg-green-600 hover:text-font text-lg font-semibold'>Confirmar</button>
                                        <Link to='/login' className='text-base text-font opacity-80 text-center hover:opacity-100 hover:cursor-pointer'>Já possui conta? Faça login</Link>
                                    </div>
                            </div>
                        </>
                    }
                    {
                        phase === 2 &&
                        <>
                            <h1 className='font-bold text-xl mb-4'>Escolha suas plataformas favoritas</h1>             
                            <div>
                                <div className='gap-4 px-10 flex flex-col justify-center items-center rounded-lg'>
                                    <div className='flex flex-wrap gap-4 justify-center max-sm:gap-0'>
                                        {providersList.map((streaming, key)=>{
                                            return (
                                                <div id={streaming.id} key={key} style={{backgroundColor: '#212121'}} className={`${streaming.status ? 'border-primary' : 'border-gray-700'}  border-2 flex flex-col p-2 text-center gap-2 rounded-md w-[140px] h-[160px] justify-evenly items-center hover:cursor-pointer max-sm:scale-90`} onClick={()=>{handleProviderClick(streaming.id)}}>
                                                    <img src={streaming.icon} alt={`${streaming.name}`} className='w-8/12 rounded-3xl'/>
                                                    <span className='font-semibold text-font'>{streaming.name}</span>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div id='btns' className='flex font-semibold w-full justify-between gap-2 px-4 text-lg mt-2 max-sm:flex-col max-sm:my-6 max-sm:items-center'>
                                        <button className='py-2 px-4 rounded-sm border-[1px] border-primary w-[180px] max-sm:w-full max-sm:order-2' onClick={()=>{setPhase(pv=>pv-1)}}>Anterior</button>
                                        <button className='py-2 px-4 border-[1px] border-primary w-[180px] max-sm:w-full max-sm:order-1' onClick={()=>{setPhase(pv=>pv+1)}}>Avançar</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {
                        phase === 3 &&
                        <div className='flex flex-col justify-center text-center items-center w-full'>
                            <h1 className='font-bold text-xl mb-4'>Escolha seus filmes favoritos</h1>     
                                <div>
                                    {movies.length > 0 &&
                                        <div id='movie-section' className='flex flex-wrap justify-center gap-2 w-full overflow-auto h-[800px]'>
                                            {movies.map((movie, key)=>{
                                                return(
                                                    <div key={key} className='w-[160px]'>
                                                        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} className='w-[160px] h-[220px]'/>
                                                        <p className='text-sm  text-font font-semibold mt-1'>{movie.title}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>    
                                    }
                            
                                </div>

                            <div id='btns' className='flex font-semibold w-full justify-between px-4 gap-2 text-lg mt-2 max-sm:flex-col max-sm:my-6 max-sm:items-center'>
                                <button className='py-2 px-4 rounded-sm border-[1px] border-primary w-[180px] max-sm:w-4/5 max-sm:order-2' onClick={()=>{setPhase(pv=>pv-1)}}>Anterior</button>
                                <button type='submit' className='py-2 px-4 border-[1px] border-primary w-[180px] max-sm:w-4/5 max-sm:order-1'>Criar conta</button>
                            </div>
                        </div>
                    }
                    </form> 

                    <div id='phases' className='flex gap-2'>
                        <div className={`w-3 h-3 rounded-full ${phase > 0 ? 'bg-primary' : 'bg-slate-700'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${phase > 1 ? 'bg-primary' : 'bg-slate-700'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${phase > 2 ? 'bg-primary' : 'bg-slate-700'}`}></div>
                    </div>
                </div>
            </div>

            
            
        </>
    )
}


