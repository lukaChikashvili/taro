import React from 'react'
import { Link, useParams } from 'react-router'
import { useGetSpecificLangQuery } from '../../redux/api/languageSlice';
import { Book, BookA, Brain, ScrollText } from 'lucide-react';

const LangHub = () => {

    const { id: langId } = useParams();

    const {data: allLangs} = useGetSpecificLangQuery(langId);


  return (
    <div className='text-white  w-full px-[7rem]  mt-8'>
        <div className='flex justify-between items-center gap-12 '>
        <div className='w-full flex flex-col gap-4'>
        <h1 className='text-4xl font-semibold border-2 border-white p-4 rounded-md' >{allLangs?.name} Language {allLangs?.level} </h1>
        
        </div>


        <div className='mr-12 flex items-center gap-12 text-slate-300'>
            <Link className='flex items-center text-xl gap-4'><Book />Books</Link>
            <Link to = "/dictionary" className='flex items-center text-xl gap-4'><BookA />Dictionary</Link>
            <Link className='flex items-center text-xl gap-4'><ScrollText />FlashCards</Link>
            <Link className='flex items-center text-xl gap-4'><Brain />Practice</Link>
        </div>
        </div>
        
       
    </div>
  )
}

export default LangHub
