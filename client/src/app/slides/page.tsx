"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MyPdfViewer } from "@/components/ui/PdfViewer";

const PdfTextExtractor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const uploadPdf = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/upload-slides", {
      method: "POST",
      body: formData,
    });

    // No need to store file name, just navigate to the viewer
    router.push("/pitch");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Upload a PDF</h2>
      <Input type="file" accept="application/pdf" onChange={handleFileChange} />
      <Button onClick={uploadPdf} disabled={!file}>
        Upload & View
      </Button>
    </div>
  );
};

export default PdfTextExtractor;
