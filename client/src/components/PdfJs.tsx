"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";
import type { PDFDocumentProxy, RenderParameters } from "pdfjs-dist/types/src/display/api";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


interface PdfJsProps {
  src: string; // Path to the PDF file
}

const PdfJs: React.FC<PdfJsProps> = ({ src }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);

  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      try {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext: RenderParameters = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error("Error rendering page:", error);
      }
    },
    [pdfDoc]
  );

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const loadingTask = pdfjs.getDocument(src);
        const loadedPdf = await loadingTask.promise;
        setPdfDoc(loadedPdf);
        setNumPages(loadedPdf.numPages);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadDocument();
  }, [src]);

  useEffect(() => {
    renderPage(currentPage);
  }, [pdfDoc, currentPage, renderPage]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage <= 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numPages))}
          disabled={currentPage >= numPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <canvas ref={canvasRef} className="border shadow-md" />
      <p className="mt-2 text-sm">
        Page {currentPage} of {numPages}
      </p>
    </div>
  );
};

export default PdfJs;
