import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import api from "../../api";

export default function Profile(){
    const { handleLogout, user } = useContext(UserContext);

    async function handleClick(){
        const token = localStorage.getItem('token');
        const {data} = await api.get('user/test');
        console.log(data);
    }

    return(
        <div>
            <h4>Bem-vindo a área inicial {JSON.stringify(user)}</h4>
            <button onClick={handleClick} className="bg-blue-300">Fazer requisição teste</button>
            <br></br>
            <button onClick={handleLogout} className="bg-red-500">Logout</button>
        </div>
    )
} 