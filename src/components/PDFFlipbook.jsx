// src/components/PDFFlipbook.jsx
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.3.93/pdf.worker.min.mjs`;



const PDFFlipbook = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);

  return (
    <div className="w-full flex justify-center items-center py-6">
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p className="text-muted-foreground text-center">Loading PDF...</p>}
      >
        {numPages && (
          <HTMLFlipBook
            width={400}
            height={550}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={800}
            drawShadow={true}
            flippingTime={700}
            useMouseEvents={true}
            className="shadow-xl rounded-lg"
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div key={index} className="page bg-white p-4">
                <Page pageNumber={index + 1} width={400} />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
};

export default PDFFlipbook;
