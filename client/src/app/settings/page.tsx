"use client";

import React from "react";

const PitchUploader: React.FC = () => {
  // Generate options for 0-59 minutes & seconds
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
        background: "linear-gradient(-45deg, #48C5FD 0%, #2A9BF9 21%, #0F75F6 33%, #003899 65%, #01132F 100%)",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "10vw",
      }}
    >
      {/* Main Settings Box */}
      <div
        style={{
          width: "70vw",
          height: "auto",
          padding: "2rem",
          borderRadius: "20px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.55) 100%)",
          display: "flex",
          flexDirection: "column",
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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <select
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
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <select
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
              How do you want to be assessed? Upload your own or use our public speaking rubrics.
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
            <option value="custom">Upload Your Own</option>
          </select>
        </div>

        {/* Pitching Slides Section */}
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
              What slides are you going to be using? Optional upload to get personalized feedback.
            </p>
          </div>
          <input
            type="file"
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
        </div>
      </div>
    </div>
  );
};

export default PitchUploader;
