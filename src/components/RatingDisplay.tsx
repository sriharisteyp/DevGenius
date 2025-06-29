import React, { useEffect, useState } from "react";

const RatingDisplay: React.FC = () => {
  const [average, setAverage] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await fetch("https://devgenius-backend.onrender.com/api/ratings/average");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setAverage(data.average);
      } catch {
        setError(true);
      }
    };

    fetchAverageRating();
  }, []);

  if (error)
    return (
      <div className="bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg text-center animate-bounce">
        <span className="text-xl font-bold">Error:</span> Unable to fetch ratings. Please try again later.
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
      <div className="relative z-10 flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">User Rating:</span>
          <span className="text-4xl font-extrabold text-yellow-300">{average.toFixed(1)}</span>
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
      </div>
    </div>
  );
};

export default RatingDisplay;
