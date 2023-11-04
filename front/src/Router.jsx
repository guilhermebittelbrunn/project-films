import {Routes, Route} from 'react-router-dom'
import PriveteRoute from './components/PrivateRoute'
import CustomRoute from './components/CustomRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import Teste from './pages/Teste'
import Main from './pages/sub-pages/Main'
import Profile from './pages/sub-pages/Profile'
import Search from './pages/sub-pages/Search'

export default function Router(){
    return(
        <Routes>
            <Route path='/login' element={<CustomRoute><Login/></CustomRoute>}/>
            <Route path='/register' element={<CustomRoute><Register/></CustomRoute>}/>
            <Route path='/' element={<Home title='Home' subtitle='Explore filmes diversos'><Main/></Home>}/>  
            <Route path='/search' element={<PriveteRoute><Home title='Buscar' subtitle='Busque pelos seus filmes favoritos'><Search/></Home></PriveteRoute>}/>  
            <Route path='/teste' element={<Home title='Home' subtitle='Explore filmes diversos'><Teste/></Home>}/>  
            <Route path='/slider' element={<Profile/>}/>  
            <Route path='*' element={<PageNotFound/>}/>  
        </Routes>
    )
}