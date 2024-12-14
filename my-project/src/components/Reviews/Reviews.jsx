import React from "react";
import Review from "../Review/Review";

const Reviews = ({ reviews }) => {
  if (!reviews || !Array.isArray(reviews)) {
    return <p className="text-white">No reviews available</p>;
  }

  return (
    <div className="p-6 bg-black min-h-screen">
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-white">No reviews</p>
      )}
    </div>
  );
};

export default Reviews;
