import PDFViewer from "pdf-viewer-reactjs";

const MyPdfViewer= ({ pdfUrl }) => (
  <PDFViewer
    document={{ url: pdfUrl }}
    canvasCss="custom-canvas"
    scale={1.5}
    showThumbnail
  />
);

export default MyPdfViewer;
