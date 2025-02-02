// app/your-page/page.js
"use client";

import React, { useEffect, useState } from "react";
import SummarySkeleton from "@/components/SummarySkeleton";
import SummaryPage from "@/components/SummaryPage";

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
