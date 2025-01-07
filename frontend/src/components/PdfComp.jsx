import React, { useState, useCallback, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';

function PdfComp({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [highlights, setHighlights] = useState([]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
   console.log(highlights);
  }, [highlights])
 
 
  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  
  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  
  const onTextLayerClick = useCallback((event, pageNumber) => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      const boundingRect = event.target.getBoundingClientRect();

      
      const scale = 1.3; 
      const pageContainerRect = event.target.closest('.pdf-document-container').getBoundingClientRect();

      const highlight = {
        text: selectedText,
        position: {
          top: (boundingRect.top - pageContainerRect.top) * scale,
          left: (boundingRect.left - pageContainerRect.left) * scale,
          width: boundingRect.width * scale,
          height: boundingRect.height * scale,
        },
        pageNumber,
      };

      setHighlights((prevHighlights) => [...prevHighlights, highlight]);
    }
  }, []);

  return (
    <div className="pdf-container w-full h-full flex flex-col justify-center items-center py-8" style={{ position: 'relative' }}>
      <div className="pdf-document-container w-full max-w-3xl" style={{ position: 'relative' }}>
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            scale={1.3} 
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={false}
            onClick={(event) => onTextLayerClick(event, pageNumber)}
          />
        </Document>

         {highlights.map((value, i) => (
           <div key={i}>
             <span className='absolute bg-yellow-500 font-bold text-black' 
             style={{top: value.position.top - 60, left: value.position.left - 40}}>{value.text}</span>
            </div>
         ))}
      </div>

      <div className="pdf-navigation flex items-center justify-between w-full mt-4 px-4">
        <button
          onClick={prevPage}
          className="prev-button px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
          disabled={pageNumber === 1}
        >
          Previous
        </button>

        <span className="page-info text-white">
          Page {pageNumber} of {numPages}
        </span>

        <button
          onClick={nextPage}
          className="next-button px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
          disabled={pageNumber === numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PdfComp;
