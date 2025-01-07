import { Book, BookA, Brain, CodeSquare, ScrollText } from 'lucide-react';
import { useGetSpecificLangQuery } from '../../redux/api/languageSlice';
import {Link,  useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import BookModal from './BookModal';
import { toggleModal } from '../../redux/features/auth/modalSlice';


const LangHub = () => {
  

  const { id: langId } = useParams();
  const {data: allLangs} = useGetSpecificLangQuery(langId);

  const { showModal } = useSelector((state) => state.modal);

  const dispatch = useDispatch();
 
  const displayModal = () => {
    dispatch(toggleModal());
  }
  
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


        <div onClick={displayModal} className=" mt-8 w-56 h-40 bg-orange-400 text-white text-4xl font-bold flex items-center justify-center rounded-lg shadow-lg cursor-pointer transform transition duration-300 ease-in-out hover:bg-orange-600 hover:shadow-2xl">
    +
    </div>
        
       {showModal && <BookModal />}

       
    </div>
  )
}

export default LangHub
