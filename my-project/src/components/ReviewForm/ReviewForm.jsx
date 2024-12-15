import React, { useState } from "react";
import { useSelector } from "react-redux";

const ReviewForm = ({ movieId, onReviewSubmit }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        user: userInfo.name,
        reviewText: reviewText,
        rating: Number(rating),
      };

     

      // Use fetch to POST data to the API
      const response = await fetch(
        `http://localhost:5000/api/reviews/review/${movieId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to post review");
      }

      const data = await response.json();

      // Clear form fields
      setReviewText("");
      setRating("");

      // Trigger callback with the new review
      onReviewSubmit(data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating review", error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-black py-10">
      <div className="w-full max-w-md p-6 bg-yellow-500 rounded-lg shadow-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="number"
              className="w-full p-3 rounded-md text-black placeholder-black bg-yellow-100"
              placeholder="Rating (1-10)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="10"
              required
            />
          </div>

          <div>
            <input
              type="text"
              className="w-full p-3 rounded-md text-black placeholder-black bg-yellow-100"
              placeholder="Write Your Review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 text-white font-bold bg-black hover:bg-yellow-700 rounded-md"
            >
              POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
