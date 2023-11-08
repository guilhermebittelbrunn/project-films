import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {UserContext} from '../context/UserContext'
import { UserOutlined, GithubOutlined, LinkedinFilled, MailOutlined, MenuOutlined } from '@ant-design/icons'
import { Drawer, Carousel } from 'antd'
import ImageIcon from '../assets/logo.png'
import MovieModal from "../components/MovieModal";

const menuOptions = [
    {
        id: 1,
        path: '/',
        label: 'Home'
    },
    {
        id: 2,
        path: '/lists',
        label: 'Listas'
    },
    {
        id: 3,
        path: '/search',
        label: 'Buscar'
    },
    {
        id: 4,
        path: '/profile',
        label: <UserOutlined />
    },
]

export default function Home({children, title, subtitle}){
    const {user, handleLogout} = useContext(UserContext);
    const [modalSettings, setModalSettings] = useState({id: null, status: false});
    const [open, setOpen] = useState(false);


    return(
        <div className="w-full flex flex-col justify-between h-screen max-w-7xl px-[1%] m-auto ">
            <nav className="flex w-full justify-between text-lg py-2">
                <div className="flex gap-2 justify-center items-center">
                    <Link to='/'>
                        <img src={ImageIcon} width={200} alt="logo" />
                    </Link>
                    {/* <h2>CineSync</h2> */}
                </div>
                {user &&
                <>
                    <ul className="flex gap-4 justify-center items-center max-sm:hidden">
                                {
                                    menuOptions.map(option=>{
                                        return(
                                            <Link to={option.path} key={option.id}>
                                                <li className="font-semibold transition-all hover:cursor-pointer hover:text-primary">
                                                    {option.label}
                                                </li>
                                            </Link>
                                        )
                                    })
                                }
                    </ul>
                    <MenuOutlined 
                    className="sm:hidden font-semibold text-2xl transition-opacity 
                    hover:text-primary hover:cursor-pointer mr-4"
                    onClick={()=>{setOpen(pv=>!pv)}}
                    />
                </>
            }
            </nav>

            <main id="main-home" className="flex w-full justify-center items-center">
                {
                    user ? 
                    <div className="w-full">
                        <header className="text-center w-full my-10 flex flex-col font-bold gap-3 justify-center items-center">
                            <h1 className="text-5xl max-sm:text-3xl">{title}</h1>
                            <h2 className="text-3xl max-sm:text-xl">{subtitle}</h2>
                        </header>
                        <div className="min-h-[600px] flex flex-col justify-center items-center"> 
                            <div>
                                {React.Children.map(children, child => {
                                    // Verifica se o elemento filho é válido antes de cloná-lo
                                    if (React.isValidElement(child)) {
                                    // Clona o elemento filho e adiciona a propriedade 'title'
                                    return React.cloneElement(child, { modalSettings, setModalSettings });
                                    }
                                    return child;
                                })}
                             </div>
                        </div>
                    </div>
                    :
                    <div className="flex w-full px-4 gap-4 h-[80vh] py-4 max-sm:flex-col-reverse max-sm:gap-8 max-sm:h-[100%]">
                        <div id='left-side' className="w-5/12 flex flex-col gap-6 justify-center items-center pl-4 max-sm:w-full">
                            <div id="header" className="flex flex-col w-full gap-4">
                                <div className="text-font font-semibold text-3xl flex max-lg:text-2xl max-sm:justify-center">
                                    <p>
                                        Mais de
                                        <span className="text-primary px-2">19.000</span>
                                        Filmes
                                    </p>
                                </div>
                                <h4 className="text-gray-200 font-semibold text-xl max-lg:text-lg max-sm:text-center">Acesse agora e comece a controlar o seu entretenimento!</h4>
                            </div>

                            <div id="body" className="flex gap-2 mt-4 w-full max-md:flex-col max-md:items-center">
                                <Link to='/login' className="max-md:w-full flex max-sm:justify-center">
                                    <button className="outline-none font-semibold bg-secondery rounded-full border w-[160px] max-md:w-2/3 py-1 px-2 border-font text-font transition-all hover:cursor-pointer hover:opacity-75">
                                        Entrar
                                    </button>
                                </Link>

                                <Link to='/register' className="max-md:w-full flex max-sm:justify-center">
                                    <button className="outline-none font-semibold bg-secondery rounded-full border w-[160px] max-md:w-2/3 py-1 px-2 border-primary text-primary transition-all hover:cursor-pointer hover:opacity-75">
                                        Registrar-se
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div id="right-side" className=" w-7/12 px-4 flex gap-1 justify-center items-center max-sm:w-full">
                            <div className="w-1/4 rounded-xl border-primary">
                                <Carousel autoplay pauseOnHover={false} dots={false} focusOnSelect={false} >
                                    <div>
                                        <img className="h-[400px] rounded-xl max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-xl max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-xl max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-xl max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-xl max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                </Carousel>
                            </div>
                            <div className="w-5/12 rounded-xl border-primary">
                                <Carousel autoplay pauseOnHover={false} dots={false} focusOnSelect={false}>
                                    <div>
                                        <img className="h-[500px] rounded-xl max-lg:h-[460px] max-md:h-[420px] max-sm:h-[340px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[500px] rounded-xl max-lg:h-[460px] max-md:h-[420px] max-sm:h-[340px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[500px] rounded-xl max-lg:h-[460px] max-md:h-[420px] max-sm:h-[340px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[500px] rounded-xl max-lg:h-[460px] max-md:h-[420px] max-sm:h-[340px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[500px] rounded-xl max-lg:h-[460px] max-md:h-[420px] max-sm:h-[340px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                </Carousel>
                            </div>
                            <div className="w-1/4 rounded-xl border-primary">
                                <Carousel autoplay pauseOnHover={false} dots={false} focusOnSelect={false}>
                                    <div>
                                        <img className="h-[400px] rounded-lg max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-lg max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-lg max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-lg max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-lg max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}/>
                                    </div>
                                </Carousel>
                            </div>
                        
                    
                        </div>
                    </div>
                }
            </main>

            <footer className="w-full py-2 px-4 flex justify-between items-center font-semibold">
                <div className="text-sm">
                    <h3>©Desenvolvido por: Felipe K., Guilherme B., Pedro H.</h3>
                </div>
                <ul className="flex justify-center items-center gap-4 text-xl max-sm:text-base ">
                    <li 
                        className="border-[2px] border-white rounded-full px-[4px] 
                        py-[4px] flex justify-center items-center transition-all 
                        hover:text-primary hover:cursor-pointer hover:border-primary
                    ">
                        <GithubOutlined />
                    </li>
                    <li 
                        className="border-[2px] border-white rounded-full px-[4px] 
                        py-[4px] flex justify-center items-center transition-all 
                        hover:text-primary hover:cursor-pointer hover:border-primary
                    ">
                        <LinkedinFilled />
                    </li>
                    <li 
                        className="border-[2px] border-white rounded-full px-[4px] 
                        py-[4px] flex justify-center items-center transition-all 
                        hover:text-primary hover:cursor-pointer hover:border-primary"
                    >
                        <MailOutlined />
                    </li>
                </ul>
            </footer>

            <Drawer title="Logo" placement="right" open={open} onClose={()=>{setOpen(false)}} width={'70%'} closeIcon={false}>
                <div className="flex flex-col h-[100%] justify-between py-4">
                    <ul className="flex flex-col justify-evenly w-full gap-4 items-center py-20">
                    {menuOptions.map(option=>{
                        return(
                            <Link to={option.path} key={option.id} className="w-full mx-4 text-center" onClick={()=>{setOpen(false)}}>
                                <li 
                                    className="font-semibold transition-all text-font 
                                    py-4 hover:cursor-pointer hover:text-primary w-full 
                                    text-lg border-b border-font"
                                >
                                    {option.label}
                                </li>
                            </Link>
                        )
                    })}
                    </ul>
                    <div className="w-full">
                        <button 
                            className="font-semibold transition-all hover:cursor-pointer 
                            py-2 text-red-500 border border-red-500
                            hover:border-red-700 hover:text-red-700 w-full"
                            onClick={handleLogout}
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </Drawer>

            <MovieModal id={modalSettings.id} status={modalSettings.status} setIsModalOpen={setModalSettings}/>
        </div>
    )
} 

