import React from "react";
import Movie from "../Movie/Movie";

const Movies = ({ movies }) => {
  return (
    <div className="bg-black text-yellow-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5">
      {movies.map((movie) => (
        <Movie key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default Movies;
