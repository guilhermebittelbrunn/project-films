import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {UserContext} from '../context/UserContext'
import { UserOutlined, GithubOutlined, LinkedinFilled, MailOutlined, MenuOutlined } from '@ant-design/icons'
import {Drawer} from 'antd'
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
        <div className="w-full flex flex-col justify-between h-screen max-w-7xl px-[1%] m-auto">
            <nav className="flex w-full justify-between text-lg py-2">
                <div className="flex gap-2 justify-center items-center">
                    <img src={ImageIcon} width={200} alt="logo" />
                    <h2>CineSync</h2>
                </div>
                <ul className="flex gap-4 justify-center items-center max-sm:hidden">
                    {user &&
                        <>
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
                        </>
                    }
                </ul>
                <MenuOutlined 
                    className="sm:hidden font-semibold text-2xl transition-opacity 
                    hover:text-primary hover:cursor-pointer mr-4"
                    onClick={()=>{setOpen(pv=>!pv)}}
                />
            </nav>

            <main className="flex w-full justify-center items-center">
                {
                    user ? 
                    <div className="w-full">
                        <header className="text-center w-full my-10 flex flex-col font-bold gap-3 justify-center items-center">
                            <h1 className="text-5xl max-sm:text-3xl">{title}</h1>
                            <h2 className="text-3xl max-sm:text-xl">{subtitle}</h2>
                        </header>
                        <div className="min-h-[600px]flex flex-col justify-center items-center"> 
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
                    <div>
                        <button className="font-semibold transition-all hover:cursor-pointer hover:text-primary">
                            <Link to='/login'>Entrar</Link>
                        </button>
                        <button className="font-semibold transition-all hover:cursor-pointer hover:text-primary">
                            <Link to='/register'>Registrar-se</Link>
                        </button>
                    </div>
                }
            </main>

            <footer className="w-full py-2 flex justify-between items-center font-semibold">
                <div className="text-sm">
                    <h3>©Desenvolvido por: Felipe K., Guilherme B., Pedro H.</h3>
                </div>
                <ul className="flex justify-center items-center gap-4 text-xl">
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

            <Drawer title="Logo" placement="right" open={open} onClose={()=>{setOpen(false)}}>
                <div className="flex flex-col h-[100%] justify-between">
                    <ul className="flex flex-col justify-evenly items-center w-full gap-4 py-20">
                    {menuOptions.map(option=>{
                        return(
                            <Link to={option.path} key={option.id} className="w-full text-center">
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
                    <div className="w-full relative">
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
