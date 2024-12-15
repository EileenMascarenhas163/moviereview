import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  const { name, image_url, description, rating } = movie;

  return (
    <div className="bg-gradient-to-r from-yellow-600 via-gray-800 to-black text-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:scale-105">
      <Link
        to={`/movie/${movie._id}`}
        className="block text-center text-2xl font-semibold tracking-tight hover:text-yellow-400 transition-colors"
      >
        {name}
      </Link>
      
      {/* Movie Image */}
      {image_url && (
        <div className="mt-6 relative overflow-hidden rounded-lg border-4 border-yellow-500 shadow-md">
          <Link to={`/movie/${movie._id}`} className="block">
            <img
              src={image_url}
              className="w-full h-60 object-cover transform transition-transform hover:scale-105"
            />
          </Link>
        </div>
      )}

      {/* Numeric Rating */}
      {rating && (
        <div className="mt-4 text-center">
          <div className="text-xl font-semibold text-yellow-400">
            Rating: {rating} / 10
          </div>
        </div>
      )}

      {/* Movie Description */}
      {description && (
        <h1 className="mt-4 text-yellow-200 text-sm font-light opacity-80">
          {description}
        </h1>
      )}
    </div>
  );
};

export default Movie;
