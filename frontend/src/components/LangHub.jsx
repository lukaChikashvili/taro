import React, { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useCreateBookMutation, useGetSpecificLangQuery, useUploadPdfMutation } from '../../redux/api/languageSlice';
import { Book, BookA, Brain, CodeSquare, ScrollText } from 'lucide-react';

const LangHub = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imgurl, setImgurl] = useState(null);

  const [createbook] = useCreateBookMutation();
  const [uploadPdf] = useUploadPdfMutation();



    const { id: langId } = useParams();

    const {data: allLangs} = useGetSpecificLangQuery(langId);

    const uploadFileHandler = async (e) => {
      const formData = new FormData();
      formData.append('pdf', e.target.files[0]);

      try {
        
         const res = await uploadPdf(formData).unwrap();
         setImgurl(res.file);
       
          
      } catch (error) {
         console.log(error);
      }
   }


   const handleSubmit = async () => {
    try {
    
      const bookData = new FormData();
      bookData.append('pdfUrl', imgurl);
      bookData.append('title', title);
      bookData.append('author', author);
      bookData.append('language', allLangs?._id);


      console.log('Submitting book:', bookData);
  
  
      const res = await createbook(bookData).unwrap();
  
  
  
     
      if (res.error) {
        console.log('Error:', res.error);
      }
    } catch (error) {
      console.error('Error occurred while creating book:', error);
    }
  };

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


   <input type='text' className='text-black' onChange={(e) => setTitle(e.target.value)} />
   <input type='text' className='text-black' onChange={(e) => setAuthor(e.target.value)} />
  


   <input type='file' className='text-black'  name = "image"  accept="application/pdf" onChange={uploadFileHandler}  />

   <button onClick={handleSubmit}>submit</button>
        
       
    </div>
  )
}

export default LangHub
