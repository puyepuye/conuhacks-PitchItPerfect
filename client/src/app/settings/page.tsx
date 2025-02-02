"use client";

import React from "react";
import "./settings.css"; // Import the updated styles
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SelectPage() {
  const router = useRouter();

  const handleProjectNavigation = () => {
    router.push("/pitch"); 
  };

  return <PitchUploader handleProjectNavigation={handleProjectNavigation} />;
}

  const PitchUploader: React.FC<{ handleProjectNavigation: () => void }> = ({
    handleProjectNavigation,
  }) => {
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
    {/* Save and Continue Button - Now Sticks to Bottom-Right */}
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
        onClick={handleProjectNavigation}
      >
        Save and Continue
      </button>
        </div>
  );
};
