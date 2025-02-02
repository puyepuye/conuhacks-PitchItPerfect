"use client";

import React, { useEffect, useRef, useState } from "react";
import "./summary.css"; // Import the updated styles
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
    <div className="summary-container">
    <h1 className="summary-title">Performance Summary</h1>

    <div className="summary-box">

      <div className="logo-container">
          <Image src="/icons/pitchlogo.svg" alt="Pitch Logo" width={50} height={50} className="logo"/>
          <span className="logo-text">Pitch</span>
      </div>
      
      {/* Navigation Buttons */}
      <div className="toggle-container">
      <div className="toggle">
          <button className="toggle-btn active">Practice</button>
          <button className="toggle-btn">Profile</button>
      </div>
      </div>

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
        <div className="toneYay">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
        </div>

        <div className="metrics-container">
          <div className="metric-item">Filler Word Count</div>
          <div className="metric-value">52</div>

          <div className="metric-item">Time Taken</div>
          <div className="metric-value">52</div>
        </div>


        {/* ✅ Feedback Box & Stats */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <div className="feedback-container">
        <h3 className="feedback-title">Feedback</h3>
          <div className="feedback-box">
            <p> study by Zhou (2018) investigated gender differences between personality traits and
              different forms of procrastination. Zhou distinguished between passive procrastination and
              active procrastination. Passive procrastinators are considered lazy and postpone their tasks
              because of an inability to act in a timely and regulatory manner, while active procrastinators
              intentionally procrastinate so they can work with a strong motivation of time pressure. It was
              hypothesized that conscientiousness, extraversion, and emotional instability were associated
              with passive procrastination, while all Big Five personality traits were associated with active
              procrastination. Furthermore, it was hypothesized that the relationship between personality
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PitchUploader;
