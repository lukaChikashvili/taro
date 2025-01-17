import React, { useEffect } from 'react'
import { useGetSpecificBookQuery } from '../../redux/api/languageSlice'
import { useParams } from 'react-router';
import { pdfjs } from 'react-pdf';
import PdfComp from './PdfComp';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useCreateWordMutation } from '../../redux/api/dictSlice';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const BookDetail = () => {


  



    const { id } = useParams();

    const { data: specificBook } = useGetSpecificBookQuery(id);

    const [createWord] = useCreateWordMutation();

    useEffect(() => {
        if (specificBook) {
          console.log(specificBook);
        }
      }, [specificBook]);
      

      const handleAddWord = async(word) => {
        try {
          if (!specificBook?.language) {
            console.error('Language information is missing!');
            return;
          }
    
          const res = await createWord({
            word: word,
            meaning: "meaning", 
            gender: "gender", 
            language: specificBook.language, 
          }).unwrap();
    
          console.log('Word created:', res);
        } catch (error) {
          console.error('Error creating word:', error);
        }
      }

  return (
    <div className='w-full p-[3rem] min-h-screen'>
        <h1 className='text-4xl text-white'>{specificBook?.title} By {specificBook?.author}</h1>

        <PdfComp url = {specificBook?.pdfUrl} onSaveHighlight={handleAddWord} />
    </div>
  )
}

export default BookDetail
