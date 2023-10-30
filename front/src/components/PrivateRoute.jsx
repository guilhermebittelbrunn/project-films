import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function PriveteRouter({children}){
    const { authenticated } = useContext(UserContext);
    
    return authenticated ?  children : <Navigate to={'/'}/>
    
} 