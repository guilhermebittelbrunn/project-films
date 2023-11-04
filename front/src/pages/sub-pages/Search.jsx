import {useForm, Controller} from 'react-hook-form'
import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { Select } from 'antd';

export default function SearchSection(){
    const {handleSubmit, control} = useForm();
    const [title, setTItle] = useState('');
    const {data, error, loading} = useFetch('/movie?limit=200')

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>{
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    }

    function handleChange(e){
        setTItle(e.target.value);
    }


    return(
        <>
            <form className='flex w-full justify-center items-center my-2 gap-4'>
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    size='middle'
                    className='w-[240px]'
                    dropdownStyle={{backgroundColor: 'black', color: 'red'}}
                    options={[
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },
                    {
                        value: 'tom',
                        label: 'Tom',
                    },
                    ]}
                 />
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    size='middle'
                    className='w-[240px]'
                    dropdownStyle={{backgroundColor: 'black', color: 'red'}}
                    options={[
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },
                    {
                        value: 'tom',
                        label: 'Tom',
                    },
                    ]}
                 />

                 <div className='flex px-2 py-1 border-[1px] rounded-md border-primary bg-secondery text-font w-[300px]'>
                    <input 
                        type='email' value={title} onChange={handleChange} placeholder='Título' 
                        className='bg-secondery outline-none text-font border-hidden w-full text-lg'
                    />
                </div>
            </form>
            <div>
                {loading ? 
                <div className="w-full flex justify-center items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-spin"></div>
                </div>
                :
                <div>
                    {data.length > 0 &&
                        <div id='movie-section' className='flex flex-wrap justify-center gap-2 w-full overflow-auto h-[600px]'>
                            {data.map((movie, key)=>{
                                return(
                                    <div key={key} className={`w-[155px] max-sm:w-[100px] border-2 ${movie.status ? 'border-primary' : 'border-gray-700'}`} onClick={()=>{handleMovieClick(movie.id)}}>
                                        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} className='w-[160px] h-[220px] bg-posternull max-sm:w-[100px] max-sm:h-[130px]' style={{backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>
                                        <p className='text-sm text-font font-semibold mt-1 max-sm:text-xs'>{movie.title}</p>
                                    </div>
                                )
                            })}
                        </div>    
                    }
            
                </div>
                }
            </div>       
        </>
    )
}