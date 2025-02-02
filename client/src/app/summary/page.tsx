// app/your-page/page.js
"use client";

// import React, { useEffect, useRef, useState } from "react";
// import "./summary.css"; // Import the updated styles
// import Image from "next/image";


import React, { useEffect, useState } from "react";
import SummarySkeleton from "@/components/SummarySkeleton";
import SummaryPage from "@/components/SummaryPage";
import { useSearchParams } from "next/navigation";

const apiUrl = "http://127.0.0.1:5000"; // API URL

// // Function to call the new analyze_all endpoint
// const analyzeAll = async (data) => {
//   try {
//     const response = await fetch(`${apiUrl}/api/analyze_all`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json", // Ensure the correct Content-Type
//       },
//       body: JSON.stringify(data), // Send the data as JSON
//     });

//     // Parse the response JSON
//     const result = await response.json();

//     // Check for errors in the response
//     if (response.ok) {
//       console.log("Analysis Results:", result);
//       return result; // Return the analysis results
//     }
//   } catch (error) {
//     console.error("Network error:", error);
//     return "Error while making the request.";
//   }
  
// };


const Summary = () => {
  const searchParams = useSearchParams();
  const data = {
    filler_feedback: searchParams.get("filler") || "",
    filler_data: parseInt(searchParams.get("fillerNum") || "0"), // Convert to integer
    sentiment_feedback: searchParams.get("sentiment") || "",
    modulation_analysis: searchParams.get("modulation") || "",
    articulation_analysis: searchParams.get("articulation") || "",
    persuasiveness_feedback: searchParams.get("persuasivness") || "",
    rubrik_feedback: searchParams.get("rubrik") || "",
  }
  return <SummaryPage data={data}/>

}
export default Summary;
