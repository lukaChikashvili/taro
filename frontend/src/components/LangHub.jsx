import { Book, BookA, Brain, ScrollText } from 'lucide-react';
import { useGetAllBooksQuery, useGetSpecificLangQuery } from '../../redux/api/languageSlice';
import { Link, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import BookModal from './BookModal';
import { toggleModal } from '../../redux/features/auth/modalSlice';

const LangHub = () => {
  const { id: langId } = useParams();
  const { data: allLangs } = useGetSpecificLangQuery(langId);

  // get all books
  const { data: allBooks, isLoading, error } = useGetAllBooksQuery();

  // filter books
  const filteredBooks = allBooks?.filter((book) => book.language === langId);

  const { showModal } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const displayModal = () => {
    dispatch(toggleModal());
  };

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
          <Link to="/dictionary" className="flex items-center text-xl gap-4">
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
      <h2 className="text-2xl font-semibold mb-4 mt-12 text-slate-300">Books in Spanish</h2>

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
              <div key={book._id} className="w-56 h-40 bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">{book.title}</h3>
                <p className="text-sm text-gray-400">{book.author}</p>
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
