"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PdfTextExtractor: React.FC = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const extractText = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/extract-text", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setPages(data.pages);
    } else {
      console.error("Failed to extract text");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Upload a PDF to Extract Text</h2>
      <Input type="file" accept="application/pdf" onChange={handleFileChange} />
      <Button onClick={extractText} disabled={!file}>
        Extract Text
      </Button>
      {pages.length > 0 && (
        <div className="mt-4 p-2 bg-gray-100 rounded-md">
          <h3 className="font-semibold">Extracted Text:</h3>
          {pages.map((page, index) => (
            <div key={index} className="mt-2 p-2 border border-gray-300 rounded">
              <h4 className="font-semibold">Page {index + 1}</h4>
              <pre className="text-sm whitespace-pre-wrap">{page}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PdfTextExtractor;
