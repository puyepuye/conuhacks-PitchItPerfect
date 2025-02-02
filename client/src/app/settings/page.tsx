"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MyPdfViewer } from "@/components/ui/PdfViewer";

import "./settings.css"; // Import the updated styles
import Image from "next/image";

const PdfTextExtractor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null); // Stores extracted text
  const [projectName, setProjectName] = useState("");
  const [isExtracted, setIsExtracted] = useState(false);
  const [minutes, setMinutes] = useState("0");
const [seconds, setSeconds] = useState("0");

console.log(isExtracted);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleProjectNavigation = () => {
    if (!projectName || !minutes || !seconds) {
      alert("Please fill in all required fields!");
      return;
    }
    
    router.push(`/pitch?projectName=${encodeURIComponent(projectName)}&minutes=${encodeURIComponent(minutes)}&seconds=${encodeURIComponent(seconds)}`);
  };

  const uploadPdf = async () => { // NOT USED ANYMORE BUT KEPT FOR
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/upload-slides", {
      method: "POST",
      body: formData,
    });

    router.push("/pitch");
  };


  const exText = async () => {
    console.log("Extract text called");
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      // Step 1: Upload PDF
      const uploadResponse = await fetch("/api/upload-slides", {
        method: "POST",
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        console.error("Error uploading PDF");
        return;
      }
  
      console.log("PDF uploaded successfully");
  
      // Step 2: Extract text from the uploaded PDF
      const extractResponse = await fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      });
  
      if (!extractResponse.ok) {
        console.error("Error extracting text");
        return;
      }
  
      const { textContent } = await extractResponse.json(); // Get extracted text
      console.log("Extracted Text:", textContent);
  
      const textPreview = textContent.substring(0, 50) + "..."; // Get first 50 characters
      console.log("Preview:", textPreview);
      setIsExtracted(true);
      setExtractedText(textPreview);
    } catch (error) {
      console.error("Error during upload or extraction:", error);
    }
  };
  
   const generateOptions = () => {
    return Array.from({ length: 60 }, (_, i) => (
      <option key={i} value={i}>
        {i}
      </option>
    ));
  };

  return (
    <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "20vw",
            paddingRight:  "20vw"
          }}
        >

          <div className="logo-container">
            <Image src="/icons/pitchlogo.svg" alt="Pitch Logo" width={50} height={50} className="logo"/>
            <span className="logo-text">Pitch</span>
          </div>

          <div className="toggle-container">
            <div className="toggle">
              <button className="toggle-btn active">Practice</button>
              <button className="toggle-btn">Profile</button>
            </div>
          </div>

          {/* Main Settings Box */}
          <div
          style={{
            position: "relative", // Enables absolute positioning inside
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            borderRadius: "20px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.55) 100%)",
            gap: "0.8rem",
          }}
          >
            {/* Settings Title */}
            <h2 style={{ color: "#003899", fontSize: "1.8rem", fontWeight: "bold" }}>Settings</h2>

            {/* Project Name Section */}
            <div
              style={{
                background: "rgba(255,255,255,0.3)",
                borderRadius: "15px",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ color: "#003899", fontSize: "1rem", fontWeight: "600" }}>Project Name</label>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>
                  Name your project something creative and descriptive.
                </p>
              </div>
             
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{
                width: "60%",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "white",
                fontSize: "1rem",
                outline: "none",
                color: "black",
              }}
            />
            </div>

            {/* Time Limit Section (Minutes & Seconds Dropdowns) */}
            <div
              style={{
                background: "transparent",
                borderRadius: "15px",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ color: "#003899", fontSize: "1rem", fontWeight: "600" }}>Time Limit</label>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>
                  What is the time limit of your presentation?
                </p>
              </div>
              {/* Dropdowns for Minutes & Seconds */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <select
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "white",
                    fontSize: "1rem",
                    outline: "none",
                    color: "black",
                  }}
                >
                  {generateOptions()}
                </select>
                <span style={{ color: "#666", fontSize: "0.9rem", marginTop: "5px" }}>Minutes</span>

                <select
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "white",
                    fontSize: "1rem",
                    outline: "none",
                    color: "black",
                  }}
                >
                  {generateOptions()}
                </select>
                <span style={{ color: "#666", fontSize: "0.9rem", marginTop: "5px" }}>Seconds</span>

              </div>
            </div>

            {/* File Upload Section */}
        <h2 style={{ color: "#003899", fontSize: "1.8rem", fontWeight: "bold" }}>File Upload</h2>


            {/* Rubrics Section (Dropdown) */}
            <div
              style={{
                background: "rgba(255,255,255,0.3)",
                borderRadius: "15px",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ color: "#003899", fontSize: "1rem", fontWeight: "600" }}>Rubrics</label>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>
                  How do you want to be assessed? Use our public speaking rubrics.
                </p>
              </div>
              <select
                style={{
                  width: "40%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "white",
                  fontSize: "1rem",
                  outline: "none",
                  color: "black",
                }}
              >
                <option value="default">Select a rubric</option>
                <option value="public">Use Public Speaking Rubric</option>
              </select>
            </div>

             {/* Pitching Slides Section */}
             <div className="upload-slides">
             <div className="upload-container">
                <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
                <h2>Upload a PDF</h2>
                <Input type="file" accept="application/pdf" onChange={handleFileChange} />
                </div>
                <Button onClick={exText} disabled={!file} >
                  Save & Extract Words
                </Button>

                {/* Display extracted text preview */}
                {extractedText && (
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold">First few lines of PDF:</h3>
                    <p className="text-sm text-gray-700">{extractedText}</p>
                  </div>
                )}
              </div>
          </div>
          </div>
                  
     <button
        style={{
          top: "89vh",
          position: "fixed", // Sticks inside the settings box
          padding: "12px 24px",
          borderRadius: "8px",
          backgroundColor: "#005BBB",
          color: "white",
          fontSize: "1rem",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          transition: "background 0.3s",
          boxShadow: "0 4px 6px rgba(0, 123, 255, 0.3)",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#004899")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#005BBB")}
        onClick={handleProjectNavigation}  disabled={!isExtracted}
      >
        Save and Continue
      </button>
        </div>
  );
};


export default PdfTextExtractor;