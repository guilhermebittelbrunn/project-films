import {Routes, Route} from 'react-router-dom'
import PriveteRouter from './components/PrivateRouter'
import Login from './pages/Login'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import Teste from './pages/Teste'

export default function Router(){
    return(
        <Routes>
            <Route path='/teste' element={<PriveteRouter><Teste/></PriveteRouter>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Home/>}/>  
            <Route path='*' element={<PageNotFound/>}/>  
        </Routes>
    )
}