import { useState } from "react";

const slidesUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  return (
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
        <label style={{ color: "#003899", fontSize: "1rem", fontWeight: "600" }}>Pitching Slides</label>
        <p style={{ color: "#666", fontSize: "0.9rem" }}>
          Upload the slides you are going to be using for personalized feedback.
        </p>
      </div>

      {/* File Input */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
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
      />

      {/* Show selected file name */}
      {fileName && <p style={{ color: "#003899", fontSize: "0.9rem", fontWeight: "500" }}>{fileName}</p>}
    </div>
  );
};

export default slidesUploader;
