import { Link } from "react-router-dom";

export default function PageNotFound(){
    return(
        <>
            <h2>404 - Página não encontrada</h2>
            <Link to={'/'} className="text-blue-500 underline">Ir para página inicial</Link>
        </>
    )
}