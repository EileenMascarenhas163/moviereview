import React, { useEffect, useState } from "react";
import Review from "../Review/Review"; // Import the Review component

const Reviews = ({ reviews }) => {
  const [fullReviews, setFullReviews] = useState([]); // Store full review data

  useEffect(() => {
    const fetchReviews = async () => {
      // Here you will fetch the full reviews by their IDs
      try {
        const fetchedReviews = await Promise.all(
          reviews.map(async (reviewId) => {
            const response = await fetch(`http://localhost:5000/api/reviews/review/${reviewId}`); // Adjust the API endpoint as needed
            return response.json();
          })
        );
        setFullReviews(fetchedReviews); // Set full reviews once fetched
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (reviews.length) {
      fetchReviews();
    }
  }, [reviews]);
  console.log(fullReviews);
  return (
    <div className="reviews-container">
      {fullReviews.map((review) => (
        
        <Review key={review._id} review={review} />
      ))}
    </div>
  );
};

export default Reviews;
