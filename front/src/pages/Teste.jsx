import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export default function Teste(){
    const {user} = useContext(UserContext);

    return(
        <div>
            <h3>Home Page</h3>
            <h4>Bem-vindo a área inicial {user.name}</h4>
        </div>
    )
} 