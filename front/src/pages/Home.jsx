import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import {UserContext} from '../context/UserContext'
import { UserOutlined, GithubOutlined, LinkedinFilled, MailOutlined, MenuOutlined } from '@ant-design/icons'
import ImageIcon from '../assets/logo.png'
import MovieModal from "../components/MovieModal";

export default function Home({children, title, subtitle}){
    const {user, handleLogout} = useContext(UserContext);
    const [modalSettings, setModalSettings] = useState({id: null, status: false});


    return(
        <div className="w-full flex flex-col justify-between h-screen max-w-7xl px-[1%] m-auto">
            <nav className="flex w-full justify-between text-lg py-2">
                <div className="flex gap-2 justify-center items-center">
                    <img src={ImageIcon} width={200} alt="logo" />
                    {/* <h2>CineSync</h2> */}
                </div>
                <ul className="flex gap-4 justify-center items-center">
                    {user ?
                        <>
                            <Link to='/'>
                                <li className="font-semibold transition-all hover:cursor-pointer hover:text-primary">
                                    Home
                                </li>
                            </Link>

                            <li className="font-semibold transition-all hover:cursor-pointer hover:text-primary">Listas</li>
                            
                            <Link to='/search'>
                                <li className="font-semibold transition-all hover:cursor-pointer hover:text-primary">
                                    Buscar
                                </li>
                            </Link>

                            <Link to='/profile'>
                                <li>
                                    <UserOutlined className="font-semibold transition-all hover:cursor-pointer hover:text-primary"/>
                                </li>
                            </Link>
                        </>
                        :
                        <>
                            <li className="font-semibold transition-all hover:cursor-pointer hover:text-primary">
                                <Link to='/login'>Entrar</Link>
                            </li>
                            <li className="font-semibold transition-all hover:cursor-pointer hover:text-primary">
                                <Link to='/register'>Registrar-se</Link>
                            </li>
                        </>
                    }
                </ul>
                <MenuOutlined className="sm:hidden"/>
            </nav>

            <main className="flex w-full  justify-center items-center">
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
                    <h2>sem usuário</h2> 
                }
            </main>

            <footer className="w-full py-2 flex justify-between items-center font-semibold">
                <div>
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

            <MovieModal id={modalSettings.id} status={modalSettings.status} setIsModalOpen={setModalSettings}/>
        </div>
    )
} 
