import React, { useState } from "react";
import Movie from "../Movie/Movie";

const Movies = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState("");  // State for search input
  const [selectedRating, setSelectedRating] = useState("all");

  // Filter function based on search term and selected rating
  const filteredMovies = movies.filter((movie) => {
    const nameMatch = movie.name.toLowerCase().includes(searchTerm.toLowerCase());
    const ratingMatch =
      selectedRating === "all" || movie.rating >= parseFloat(selectedRating);
    return nameMatch && ratingMatch;
  });

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="bg-black text-yellow-500 p-4 flex justify-between items-center">
        {/* Movie Name Search */}
        <div className="flex items-center">
          <label htmlFor="search" className="mr-2 text-lg">Search:</label>
          <input
            id="search"
            type="text"
            className="p-2 bg-black text-yellow-500 border border-yellow-500 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Search by movie name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Rating Filter */}
        <div className="flex items-center">
          <label htmlFor="rating" className="mr-2 text-lg">Rating:</label>
          <select
            id="rating"
            className="p-2 bg-black text-yellow-500 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            <option value="all">All</option>
            <option value="5">Above 5</option>
            <option value="6">Above 6</option>
            <option value="7">Above 7</option>
            <option value="8">Above 8</option>
            <option value="9">Above 9</option>
          </select>
        </div>
      </div>

      {/* Movie Cards Grid */}
      <div className="bg-black text-yellow-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5">
        {filteredMovies.map((movie) => (
          <Movie key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
