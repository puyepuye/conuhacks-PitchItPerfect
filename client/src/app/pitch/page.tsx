"use client";

import { useEffect, useState } from "react";

export default function PitchPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/pitch")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the API");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the API returns { "message": "Sample" }
        setMessage(data.message);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
