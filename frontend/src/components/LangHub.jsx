import { Book, BookA, Brain, ScrollText, Trash2 } from 'lucide-react';
import { useDeleteBookMutation, useGetAllBooksQuery, useGetSpecificLangQuery } from '../../redux/api/languageSlice';
import { Link, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import BookModal from './BookModal';
import { toggleModal } from '../../redux/features/auth/modalSlice';
import { useEffect } from 'react';
import Loader from './Loader';

const LangHub = () => {
  const { id: langId } = useParams();
  const { data: allLangs } = useGetSpecificLangQuery(langId);

  // get all books
  const { data: allBooks, refetch, isLoading, error } = useGetAllBooksQuery();

  // filter books
  const filteredBooks = allBooks?.filter((book) => book.language === langId);

  const { showModal } = useSelector((state) => state.modal);

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const displayModal = () => {
    dispatch(toggleModal());
  };

  const [deleteBook] = useDeleteBookMutation();

  useEffect(() => {
    refetch();
  }, [filteredBooks])


  const deleteSpecificBook = async (id) => {
    let answer = window.confirm("Are you sure you want to delete?");
    if(!answer) return;

    await deleteBook(id).unwrap();
    refetch();

  }

  if(isLoading) {
    return <Loader />
  }

  return (
    <div className="text-white w-full px-[7rem] mt-8">
      <div className="flex justify-between items-center gap-12">
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-4xl font-semibold border-2 border-white p-4 rounded-md">
            {allLangs?.name} Language {allLangs?.level}
          </h1>
        </div>

        <div className="mr-12 flex items-center gap-12 text-slate-300">
          <Link className="flex items-center text-xl gap-4">
            <Book />Books
          </Link>
          <Link to={`/dictionary/${allLangs?._id}`} className="flex items-center text-xl gap-4">
            <BookA />Dictionary
          </Link>
          <Link className="flex items-center text-xl gap-4">
            <ScrollText />FlashCards
          </Link>
          <Link className="flex items-center text-xl gap-4">
            <Brain />Practice
          </Link>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4 mt-12 text-slate-300">Books in {allLangs?.name}</h2>

      <div className="mt-8 flex items-center w-full gap-12">
        
        <div
          onClick={displayModal}
          className="w-56 h-40 bg-orange-400 text-white text-4xl font-bold flex items-center justify-center rounded-lg shadow-lg cursor-pointer transform transition duration-300 ease-in-out hover:bg-orange-600 hover:shadow-2xl"
        >
          +
        </div>

     
        <div className="flex flex-col items-center justify-center">
         
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks?.map((book) => (
              <div key={book._id} onClick={() => navigate(`/allbooks/${book._id}`)} className="w-56 h-40 bg-gray-800 p-4 flex flex-col gap-4 text-center  duration-500 ease rounded-lg shadow-md hover:opacity-55 cursor-pointer hover:-mt-2s">
                <h3 className="text-xl font-bold">{book.title}</h3>
                <p className="text-sm text-gray-400">{book.author}</p>
                <Trash2 size = {20} className='m-auto  ' onClick={(e) => {
          e.stopPropagation(); 
          deleteSpecificBook(book._id);
        }}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && <BookModal />}
    </div>
  );
};

export default LangHub;
