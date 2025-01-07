import React, { useEffect } from 'react'
import { useGetSpecificBookQuery } from '../../redux/api/languageSlice'
import { useParams } from 'react-router';
import { pdfjs } from 'react-pdf';
import PdfComp from './PdfComp';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const BookDetail = () => {

    const { id } = useParams();

    const { data: specificBook } = useGetSpecificBookQuery(id);

    useEffect(() => {
        if (specificBook) {
          console.log(specificBook);
        }
      }, [specificBook]);

  return (
    <div className='w-full p-[3rem] min-h-screen'>
        <h1 className='text-4xl text-white'>{specificBook?.title} By {specificBook?.author}</h1>

        <PdfComp url = {specificBook?.pdfUrl} />
    </div>
  )
}

export default BookDetail
