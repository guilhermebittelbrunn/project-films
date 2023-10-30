import {Routes, Route} from 'react-router-dom'
import PriveteRoute from './components/PrivateRoute'
import CustomRoute from './components/CustomRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import Teste from './pages/Teste'

export default function Router(){
    return(
        <Routes>
            <Route path='/teste' element={<PriveteRoute><Teste/></PriveteRoute>}/>
            <Route path='/login' element={<CustomRoute><Login/></CustomRoute>}/>
            <Route path='/register' element={<CustomRoute><Register/></CustomRoute>}/>
            <Route path='/' element={<Home/>}/>  
            <Route path='*' element={<PageNotFound/>}/>  
        </Routes>
    )
}