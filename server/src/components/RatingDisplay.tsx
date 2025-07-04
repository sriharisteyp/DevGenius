import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface RatingState {
  average: number | null;
  userRating: number | null;
  loading: boolean;
  error: string | null;
}

const RatingDisplay: React.FC = () => {
  const [state, setState] = useState<RatingState>({
    average: null,
    userRating: null,
    loading: true,
    error: null
  });
  const { user } = useAuth();

  const fetchRatings = async () => {
    try {
      const [averageRes, userRatingRes] = await Promise.all([
        fetch("https://node-dev-p852.onrender.com/api/ratings/average"),
        user ? fetch("https://node-dev-p852.onrender.com/api/ratings/user", {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }) : Promise.resolve(null)
      ]);

      if (!averageRes.ok) throw new Error("Failed to fetch average rating");
      const averageData = await averageRes.json();
      
      let userRating = null;
      if (userRatingRes) {
        const userData = await userRatingRes.json();
        userRating = userData.rating?.rating || null;
      }

      setState(prev => ({
        ...prev,
        average: averageData.average,
        userRating,
        loading: false,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: "Failed to fetch ratings"
      }));
    }
  };

  const submitRating = async (rating: number) => {
    if (!user) {
      setState(prev => ({ ...prev, error: "Please log in to rate" }));
      return;
    }

    try {
      const response = await fetch("https://node-dev-p852.onrender.com/api/ratings", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ rating })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit rating");
      }

      // Refresh ratings after submission
      fetchRatings();
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || "Failed to submit rating"
      }));
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [user]);

  if (state.loading)
    return (
      <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-center animate-pulse">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mr-3"></div>
        <span className="text-lg">Loading ratings...</span>
      </div>
    );

  return (
    <div className="relative bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-white px-8 py-6 rounded-lg shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-red-300 to-pink-300 opacity-20 rounded-lg blur-xl"></div>
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">User Rating:</span>
            <span className="text-4xl font-extrabold text-yellow-300">
              {state.average !== null ? state.average.toFixed(1) : "N/A"}
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
        </div>

        {state.error && (
          <div className="bg-red-600 bg-opacity-75 text-white px-4 py-2 rounded-lg text-sm">
            {state.error}
          </div>
        )}

        {user && !state.userRating && (
          <div className="flex items-center space-x-2 pt-2">
            <span className="text-sm font-medium">Rate us:</span>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => submitRating(rating)}
                className="hover:scale-110 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 hover:fill-yellow-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              </button>
            ))}
          </div>
        )}

        {user && state.userRating && (
          <div className="text-sm font-medium pt-2">
            Your rating: {state.userRating} ⭐
          </div>
        )}

        {!user && (
          <div className="text-sm font-medium pt-2">
            Please log in to submit your rating
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingDisplay;