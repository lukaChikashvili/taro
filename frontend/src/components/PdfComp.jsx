import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';

function PdfComp({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  
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

  return (
    <div className="pdf-container w-full h-full flex flex-col justify-center items-center py-8">
      <div className="pdf-document-container w-full max-w-3xl">
       
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page scale={1.3} pageNumber={pageNumber} renderTextLayer = {true} renderAnnotationLayer = {false} />
        </Document>
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
