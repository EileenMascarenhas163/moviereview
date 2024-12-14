import React from "react";
import "./Review.css";

const Review = ({ review }) => {
  return (
    <div className="review-box">
      <div className="content">
        <ul className="team">
          <li className="member">
            <div className="description">
              <h3>{review.user}</h3>
              <p>
                {review.reviewText}
                <br />
                <a>
                  {review.rating}
                  <i className="fa fa-star" aria-hidden="true"></i>
                </a>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Review;
