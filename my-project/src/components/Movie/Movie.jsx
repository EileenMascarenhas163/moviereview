import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  return (
    <div className="bg-black text-yellow-500 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <Link
        to={`/movie/${movie._id}`}
        className="block text-center text-xl font-bold hover:text-yellow-300"
      >
        {movie.name}
      </Link>
      {movie.image_url && (
        <img
          src={movie.image_url}
          alt={movie.name}
          className="w-full mt-4 rounded-lg shadow-md"
        />
      )}
      {movie.description && (
        <p className="mt-4 text-yellow-300 text-sm">
          {movie.description}
        </p>
      )}
    </div>
  );
};

export default Movie;
