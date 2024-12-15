import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-600 via-gray-800 to-black text-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:scale-105">
      <Link
        to={`/movie/${movie._id}`}
        className="block text-center text-2xl font-semibold tracking-tight hover:text-yellow-400 transition-colors"
      >
        {movie.name}
      </Link>
      {movie.image_url && (
        <div className="mt-6 relative overflow-hidden rounded-lg border-4 border-yellow-500 shadow-md">
           <Link
        to={`/movie/${movie._id}`}
        className="block text-center text-2xl font-semibold tracking-tight hover:text-yellow-400 transition-colors"
      >
       <img
            src={movie.image_url}
            className="w-full h-60 object-cover transform transition-transform hover:scale-105"
          />
      </Link>
         
        </div>
      )}
      {movie.description && (
        <h1 className="mt-4 text-yellow-200 text-sm font-light opacity-80">
          {movie.description}
        </h1>
      )}
    </div>
  );
};

export default Movie;
