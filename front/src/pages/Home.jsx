import { Link } from "react-router-dom";

export default function Home(){

    return(
        <div>
            <h3>Home Page</h3>
            <Link className="text-blue-500" to={'/login'}>Fazer login</Link>
            <br/>
            <Link className="text-blue-500" to={'/register'}>Criar conta</Link>
        </div>
    )
} 