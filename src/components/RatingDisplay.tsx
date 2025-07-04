import React, { useEffect, useState } from "react";

const API_URL = "https://devgenius-backend.onrender.com/api/ratings";

const RatingDisplay: React.FC = () => {
  const [average, setAverage] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchAverageRating = async () => {
    try {
      const response = await fetch(`${API_URL}/average`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setAverage(data.average);
    } catch {
      setError("Unable to fetch ratings. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAverageRating();
  }, []);

  const submitRating = async (rating: number) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });
      if (!response.ok) throw new Error("Failed to submit rating");
      setSuccess(true);
      fetchAverageRating();
    } catch {
      setError("Failed to submit rating. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (error)
    return (
      <div className="bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg text-center animate-bounce">
        <span className="text-xl font-bold">Error:</span> {error}
      </div>
    );

  if (average === null)
    return (
      <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-center animate-pulse">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mr-3"></div>
        <span className="text-lg">Loading average rating...</span>
      </div>
    );

  return (
    <div className="relative bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-white px-8 py-6 rounded-lg shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-red-300 to-pink-300 opacity-20 rounded-lg blur-xl"></div>
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">User Rating:</span>
          <span className="text-4xl font-extrabold text-yellow-300">
            {average.toFixed(1)}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="36"
            height="36"
            className="text-yellow-300 animate-spin-slow"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
        <div className="bg-gray-900 bg-opacity-50 px-4 py-2 rounded-lg text-sm font-medium italic text-white">
          Based on real user feedback
        </div>
        <div className="flex items-center space-x-1 pt-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => submitRating(rating)}
              disabled={submitting}
              className="hover:scale-110 transition-transform"
              aria-label={`Rate ${rating} star${
                rating > 1 ? "s" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                className="text-yellow-300"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          ))}
        </div>
        {success && (
          <div className="text-green-200 text-sm">
            Thank you for your rating!
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingDisplay;
