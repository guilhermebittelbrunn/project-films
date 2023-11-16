import {useState, useContext, createContext, useEffect} from 'react';
import {UserContext} from './UserContext';
import api from '../api';

export const MovieContext = createContext();


export default function MovieProvider({children}){
    const {user} = useContext(UserContext);
    const [selectedItems, setSelectedItems] = useState([]);
    const [options, setOptions] = useState([]);


    async function postMovieList(listName, id){
        const res = await api.post(`/lists/${user.id}`, {name:listName, idMovie: id});
        setSelectedItems(pv=>{
            return [...pv, res.data.name]
        });
    }
    async function removeMovieList(listName, id){
        const res = await api.delete(`/lists/${id}?name=${listName}`);
        setSelectedItems(selectedItems.filter(item=>item !== res.data.name));
    }

    useEffect(()=>{
        if(user){
            const listOptions = user.Lists.map(list=>list.name);
            setOptions(listOptions);
        }
    },[user]);

    return(
        <MovieContext.Provider value={{options, setOptions, selectedItems, setSelectedItems, postMovieList, removeMovieList}}>
            {children}
        </MovieContext.Provider>
    )
}