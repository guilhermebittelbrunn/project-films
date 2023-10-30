import { Link } from "react-router-dom";
import { useContext } from "react";
import {UserContext} from '../context/UserContext'

export default function Home(){
    const {user, handleLogout} = useContext(UserContext);

    return(
        <div>
            <h3>Home Page</h3>
            <h4>Bem-vindo a área inicial {user?.name}</h4>
            {!user ? 
                <>
                    <Link className="text-blue-500" to={'/login'}>Fazer login</Link>
                    <br/>
                    <Link className="text-blue-500" to={'/register'}>Criar conta</Link>
                </>
                :
                <button onClick={handleLogout} className="bg-red-500">Logout</button>
            }
        </div>
    )
} 