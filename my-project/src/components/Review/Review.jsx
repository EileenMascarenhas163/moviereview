import React from "react";

const Review = ({ review }) => {
  return (
    <div className="bg-black text-yellow-500 border border-yellow-500 p-4 rounded-lg shadow-lg">
      <div className="content">
        <ul className="">
          <li className="">
            <div className="description">
              <h3 className="text-lg font-bold">{review.user}</h3>
              <p className="mt-2 text-yellow-300">
                {review.reviewText}
                <br />
                <a className="text-yellow-400 flex items-center mt-2">
                  {review.rating}
                  <i className="fa fa-star ml-1" aria-hidden="true"></i>
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
