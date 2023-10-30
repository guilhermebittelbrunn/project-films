import { useState, useEffect, createContext } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api";

export const UserContext = createContext();

export default function UserProvider({children}){
    const [user,setUser] = useState();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


    async function handleLogin(data){
        const {email, password} = data;
        if(!email || !password) return message.warning('Preencha todos os campos')
        try{
            const res = await api.post('user/login', data);
            const { status } = res.request;
            if(status === 200){
                const token = res.headers['authorization-token'];
                setTokenAndUserDate(res.data, token);
                return navigate('/teste');
            } 
            throw res.data
        }catch(err){
            console.log(err);
            message.error('E-mail ou senha incorretos')
        }
    }

    function handleLogout(){
        localStorage.clear('token');
        setAuthenticated(false);
        setUser();
        navigate('/');
    }

    function setTokenAndUserDate(user, token){
        localStorage.setItem('token', token);
        api.defaults.headers['authorization-token'] = token;
        setAuthenticated(true);
        setUser(user);
    }


    useEffect(()=>{
        (async()=>{
            const token = localStorage.getItem('token');
            if(token){
                api.defaults.headers['authorization-token'] = token;
                const {id} = JSON.parse(atob(token.split('.')[1]));
                const {data} = await api.get(`user/${id}`);
                setUser(data);
                setAuthenticated(true);
            }
            setLoading(false);
        })()
    },[])

    
    return(
        <UserContext.Provider value={{user, setUser, authenticated, setAuthenticated, loading, handleLogout, handleLogin}}>
            {loading ? <Spin /> : children}
        </UserContext.Provider>
    )
}