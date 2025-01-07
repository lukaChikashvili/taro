import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useCreateBookMutation, useGetSpecificLangQuery, useUploadPdfMutation } from '../../redux/api/languageSlice';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../redux/features/auth/modalSlice';

const BookModal = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imgurl, setImgurl] = useState(null);

  let dispatch = useDispatch();

  const [createbook] = useCreateBookMutation();
  const [uploadPdf] = useUploadPdfMutation();

  const { id: langId } = useParams();
  const { data: allLangs } = useGetSpecificLangQuery(langId);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('pdf', e.target.files[0]);

    try {
      const res = await uploadPdf(formData).unwrap();
      setImgurl(res.file);
      onImgurlChange(res.file);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const bookData = new FormData();
      bookData.append('pdfUrl', imgurl);
      bookData.append('title', title);
      bookData.append('author', author);
      bookData.append('language', allLangs?._id);

      console.log('Submitting book:', bookData);

      const res = await createbook(bookData).unwrap();

      dispatch(hideModal());

      if (res.error) {
        console.log('Error:', res.error);
      }
    } catch (error) {
      console.error('Error occurred while creating book:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white p-8 rounded-lg w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Add a New Book for {allLangs?.name}</h1>

        <form className="space-y-6">
        
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm text-gray-400">Book Title:</label>
            <input
              type="text"
              id="title"
              className="mt-2 p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

         
          <div className="flex flex-col">
            <label htmlFor="author" className="text-sm text-gray-400">Author:</label>
            <input
              type="text"
              id="author"
              className="mt-2 p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          
          <div className="flex flex-col">
            <label htmlFor="pdf" className="text-sm text-gray-400">Upload PDF:</label>
            <input
              type="file"
              id="pdf"
              className="mt-2 p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="application/pdf"
              onChange={uploadFileHandler}
            />
          </div>

          
          <div className="flex justify-center">
            <button
              type="button"
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSubmit}
            >
              Submit Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
