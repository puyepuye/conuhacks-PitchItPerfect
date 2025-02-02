"use client";

import React, { useEffect, useRef, useState } from "react";
import "./settings.css"; // Import the updated styles
import Image from "next/image";

const PitchUploader: React.FC = () => {
  const volumeCanvasRef = useRef<HTMLCanvasElement>(null);
  const gazeCanvasRef = useRef<HTMLCanvasElement>(null);

  // State for Volume and Gaze Data
  const [volumeData] = useState([
    [20, 0], [35, 1], [25, 2], [50, 3], [38, 4],
    [30, 5], [45, 6], [28, 7], [40, 8], [22, 9],
  ]);

  const [gazeData] = useState([
    [-25, 20], [10, 30], [-15, -10], [20, -25], [5, 5],
  ]);

  // Draw Volume Control Graph
  useEffect(() => {
    const canvas = volumeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const maxTime = volumeData.length - 1;
    const maxVolume = Math.max(...volumeData.map(([v]) => v));
    const minVolume = Math.min(...volumeData.map(([v]) => v));
    const scaleX = (width - 2 * padding) / maxTime;
    const scaleY = (height - 2 * padding) / (maxVolume - minVolume);

    ctx.clearRect(0, 0, width, height);

    // Draw Axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw Line Graph
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    volumeData.forEach(([volume, time], index) => {
      const x = padding + time * scaleX;
      const y = height - padding - (volume - minVolume) * scaleY;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [volumeData]); // ✅ Only depends on `volumeData`

  // Draw Gaze Control Box
  useEffect(() => {
    const canvas = gazeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 10;
    const halfSize = (width - 2 * padding) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);

    // Draw Outer Square
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(-halfSize, -halfSize, halfSize * 2, halfSize * 2);

    // Draw Inner Square
    const innerSize = halfSize / 2;
    ctx.strokeRect(-innerSize, -innerSize, innerSize * 2, innerSize * 2);

    // Draw Axis
    ctx.beginPath();
    ctx.moveTo(-halfSize, 0);
    ctx.lineTo(halfSize, 0);
    ctx.moveTo(0, -halfSize);
    ctx.lineTo(0, halfSize);
    ctx.stroke();

    // Plot Sample Points
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    gazeData.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, -y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, [gazeData]); // ✅ Only depends on `gazeData`

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
        padding: "0 20vw",
      }}
    >
      {/* 🏠 Main Box */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          borderRadius: "20px",
          background: "linear-gradient(270deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 100%)",
          gap: "1rem",
          width: "80%",
          maxWidth: "900px",
        }}
      >
        {/* 📌 Volume & Gaze Control */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Volume Control Graph */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ color: "#FFFFFF", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
              Volume Control
            </h3>
            <canvas ref={volumeCanvasRef} width={350} height={150} style={{ backgroundColor: "transparent" }} />
          </div>

          {/* Gaze Control */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ color: "#FFFFFF", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
              Gaze Control
            </h3>
            <canvas ref={gazeCanvasRef} width={200} height={200} style={{ backgroundColor: "transparent" }} />
          </div>
        </div>

        {/* ✅ Feedback & Overall Tone */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "#FFFFFF", fontSize: "1.8rem", fontWeight: "bold", margin: 0 }}>
            Feedback
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              border: "2px solid white",
              borderRadius: "10px",
              padding: "8px 16px",
            }}
          >
            <span style={{ color: "white", fontSize: "1rem", fontWeight: "500" }}>Overall Tone:</span>
            <span style={{ color: "white", fontSize: "1rem", fontWeight: "bold", marginLeft: "10px" }}>
              Happy
            </span>
          </div>
        </div>

        {/* ✅ Feedback Box & Stats */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <div className="scroll-box">
            <p>Apple Banana Cat Duck Elephant France Gorilla Horse...</p>
          </div>
          <div>
            <p>Filler Word Count: <b>52</b></p>
            <p>Time Taken: <b>52</b></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchUploader;
