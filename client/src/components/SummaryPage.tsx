"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/app/summary/summary.css"; // Import the updated styles
import Image from "next/image";


// Define the interface for the data prop
interface SummaryPageProps {
    data: {
      filler_feedback: string;
      filler_data: int;
      sentiment_feedback: string;
      modulation_analysis: String;
      articulation_analysis: String;
      persuasiveness_analysis: String;
      rubric_feedback: String;
       // Replace 'attributeName' with the actual attribute you want to display
      // Add other attributes as needed
    };
  }
  
const SummaryPage: React.FC<SummaryPageProps> = ({data}) => {

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

        <div className="metrics-container">
          <div className="metric-item">Filler Word Count</div>
          <div className="metric-value">{data.filler_data}</div>
        </div>


        {/* Filler Feedback*/}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", height: "auto" }}>
        <div className="feedback-container">
        <h3 className="feedback-title">Filler Words Usage</h3>
          <div className="feedback-box">
            <p> {data.filler_feedback}</p>
          </div>
        </div>
        </div>

        {/* Sentiment Feedback*/}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <div className="feedback-container">
        <h3 className="feedback-title">Sentiment Feedback</h3>
          <div className="feedback-box">
            <p> {data.sentiment_feedback}</p>
          </div>
        </div>
        </div>

        {/* Modulation Ana*/}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <div className="feedback-container">
        <h3 className="feedback-title">Modulation/Change in Pitch</h3>
          <div className="feedback-box">
            <p> {data.modulation_analysis}</p>
          </div>
        </div>
        </div>

         {/* Articulation Ana*/}
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <div className="feedback-container">
        <h3 className="feedback-title">Articulation</h3>
          <div className="feedback-box">
            <p> {data.articulation_analysis}</p>
          </div>
        </div>
        </div>

        {/* Persuasivness Feedback*/}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <div className="feedback-container">
        <h3 className="feedback-title">Your Persuasivness</h3>
          <div className="feedback-box">
            <p> {data.persuasiveness_feedback}</p>
          </div>
        </div>
        </div>



      </div>
    </div>
  );
};

export default SummaryPage;
