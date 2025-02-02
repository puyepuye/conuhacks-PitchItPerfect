// app/your-page/page.js
"use client";

// import React, { useEffect, useRef, useState } from "react";
// import "./summary.css"; // Import the updated styles
// import Image from "next/image";


import React, { useEffect, useState } from "react";
import SummarySkeleton from "@/components/SummarySkeleton";
import SummaryPage from "@/components/SummaryPage";
import React, { useState } from "react";

const apiUrl = "http://127.0.0.1:5000"; // API URL

// Function to call the new analyze_all endpoint
const analyzeAll = async (data) => {
  try {
    const response = await fetch(`${apiUrl}/api/analyze_all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure the correct Content-Type
      },
      body: JSON.stringify(data), // Send the data as JSON
    });

    // Parse the response JSON
    const result = await response.json();

    // Check for errors in the response
    if (response.ok) {
      console.log("Analysis Results:", result);
      return result; // Return the analysis results
    } else {
      console.error("Error:", result);
      return result.error; // Return error message from the API
    }
  } catch (error) {
    console.error("Network error:", error);
    return "Error while making the request.";
  }
};

// const MyComponent = () => {
//   const [fillerFeedback, setFillerFeedback] = useState("");
//   const [sentimentFeedback, setSentimentFeedback] = useState("");
//   const [modulationFeedback, setModulationFeedback] = useState("");
//   const [modulationWithArticulationFeedback, setModulationWithArticulationFeedback] = useState("");
//   const [persuasivenessFeedback, setPersuasivenessFeedback] = useState("");

//   const handleAnalyzeAll = async () => {
//     const data = {
//       text: "John is a highly driven and versatile professional with a passion for solving complex problems. With a background in technology and a keen eye for innovation, he has a knack for developing efficient solutions that simplify processes and boost productivity. Whether working independently or as part of a team, John is known for his adaptability, strong communication skills, and a collaborative approach. His goal is to continuously learn, grow, and bring value to any project or organization he’s a part of.",
//       context: "formal",
//       pitch_data: [100, 110, 105],
//       volume_data: [70, 75, 72],
//       words: ["hello", "world"],
//     };

//     const result = await analyzeAll(data);

//     // Update the state with the feedback from the response
//     if (result.filler_feedback) setFillerFeedback(result.filler_feedback);
//     if (result.sentiment_feedback) setSentimentFeedback(result.sentiment_feedback);
//     if (result.modulation_analysis) setModulationFeedback(result.modulation_analysis);
//     if (result.articulation_analysis) setModulationWithArticulationFeedback(result.articulation_analysis);
//     if (result.persuasiveness_feedback) setPersuasivenessFeedback(result.persuasiveness_feedback);
//   };

//   return (
//     <div>
//       <h2>Analyze Speech</h2>
//       <button onClick={handleAnalyzeAll}>Analyze All</button>

//       <h3>Analysis Results</h3>
//       <p><strong>Filler Feedback:</strong> {fillerFeedback}</p>
//       <p><strong>Sentiment Feedback:</strong> {sentimentFeedback}</p>
//       <p><strong>Modulation Feedback:</strong> {modulationFeedback}</p>
//       <p><strong>Articulation Feedback:</strong> {modulationWithArticulationFeedback}</p>
//       <p><strong>Persuasiveness Feedback:</strong> {persuasivenessFeedback}</p>

// };

const Summary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate a long API call
      const result = await new Promise((resolve) =>
        setTimeout(() => resolve("Fetched Data"), 3000)
      );
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <SummarySkeleton />;
  }

  return <SummaryPage data={data} />;
};

export default Summary;
