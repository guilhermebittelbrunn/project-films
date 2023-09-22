import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Link } from "react-router-dom";

export default function Home(){
    const {user} = useContext(UserContext);

    return(
        <div>
            <h3>Home Page</h3>
            <Link className="text-blue-500" to={'/login'}>Fazer login</Link>
        </div>
    )
} 