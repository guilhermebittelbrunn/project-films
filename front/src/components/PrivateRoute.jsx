import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function PriveteRouter({children}){
    const { user } = useContext(UserContext);
    
    return user ?  children : <Navigate to={'/'}/>
    
} 